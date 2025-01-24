"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LayOut from "../layouts/layout";
import CartItemList from "../components/cartlist";
import { useDispatch, useSelector } from "react-redux";

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import Checkout from "../components/paypal";
import { base_url } from "../redux/constants/url";
import { ORDER_RESET } from "../redux/constants/order_constant";
// import { CLEAR } from "../redux/constants/cart_constant";
import { orderPaymentDone, orderPostDb } from "../redux/actions/order_action";
import { clearCart } from "../redux/actions/cart_action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveShippingAddress, loadShippingAddress } from "../redux/actions/cart_action";


// Main Component
export default function OrderPage() {

  const loginReducer = useSelector((state) =>state.loginReducer)
  const {user} = loginReducer;

  const carts = useSelector((state) => state.cartReducer);
  const { cartItems, shippingAddress } = carts;




  const cartItem = cartItems.filter((Item) =>      
    Item.user === user._id   
  )
 

  // Calculate Subtotal
  const subtotal = cartItem.reduce(
    (total, product) => total + product.price * product.qty,
    0
  );

  const shippingFee = 10.0;
  const tax = subtotal * 0.05; // Example tax at 5%
  const total = subtotal + shippingFee + tax; 

//SHIPPING ADDRESS 
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [postalCode, setPostalCode] = useState(null)
  const [country, setCountry] = useState(null)

  const dispatch = useDispatch()

  const saveShippingAddressHandler = () =>{
    dispatch(saveShippingAddress({
      address, city, postalCode, country, userId:user._id
    }))
    
  }

  //PAYPAL INTEGRATION
  const [clientId, setClientId] = useState()
  const [paymentResult, setPaymentResult] = useState({})

  const orderReducer = useSelector((state) => state.orderReducer)
  // const cartReducer = useSelector((state) => state.cartReducer)
  // console.log(orderReducer)
  const {order, success} = orderReducer
  // const {saved} = cartReducer

  const Navigate = useNavigate()


  const getClientIdHandler = async () =>{
    const {data} = await axios.get(`${base_url}/api/paypal/`);
    setClientId(data)
  }

  useEffect(()=>{
    dispatch(loadShippingAddress(user._id))
  }, [])

  useEffect(() => {
    
    getClientIdHandler()

    // console.log(clientId)
    if(success){
      // console.log('he')
    
      dispatch({type: ORDER_RESET})
      //UPDATE DB WITH PAYMENT RESULT
      // console.log('heell')
      dispatch(orderPaymentDone(order._id, paymentResult))
      // console.log('hello world')
      Navigate(`/order-confirmation/${order._id}`, {})
    }
  }, [paymentResult, order])


  const initialOptions = {
    "client-id": clientId || "",
    currency: "USD",
    intent: "capture",
  };

  // useEffect(()=>{
  //   dispatch({type: CLEAR})
  // })
  const shippingAddressTrue = (Object.keys(shippingAddress).length !== 0)


  const paymentSuccessHandler = async (paymentResult) => {
    try{

      // console.log('this is successful')
      setPaymentResult(paymentResult)
      // console.log(paymentResult)
      dispatch(orderPostDb({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        totalPrice: total,
        taxPrice: tax,
        shippingPrice: shippingFee,
        price: subtotal,
        paymentMethod: "paypal"
      }))
      dispatch(clearCart())  
    }catch(err){
      // console.log(err)
    }
  }

  // console.log(orderReducer)

  if(!clientId){
    return <div>Loading...</div>
  }

  return (
    <LayOut>
      <div className=" max-w-screen-xl mx-auto h-fit flex flex-col lg:flex-row justify-center items-start bg-white p-8 gap-8">
        {/* Products Section */}
        <div className="w-full  bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        
          {!cartItem.length > 0 && <div className=' top-[40%] left-[10%]'>
                          <p className='text-sm'>Nothing here - why don't you add items to your cart?</p>
                        </div>
          }
            <CartItemList cartItem={cartItem}/>

        </div>

        {/* Order Summary & shipping address*/}
        <div className="flex-col relative flex justify-between w-full p-6 rounded-lg shadow-sm">
       
            <div className="flex-col">  
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-gray-700">
                    <p>Shipping Fee</p>
                    <p>${shippingFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-gray-700">
                    <p>Tax (5%)</p>
                    <p>${tax.toFixed(2)}</p>
                </div>
                <div className="border-t pt-4 flex justify-between text-gray-900 font-bold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                </div>

            {/* Payment Section */}
            {/* <div className="mt-6">
                <button className="w-full flex items-center justify-center bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md">
                Pay with PayPal
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                * Secure payment via PayPal.
                </p>
            </div> */}

            <PayPalScriptProvider options={initialOptions}>
              <Checkout 
              paymentSuccessHandler={paymentSuccessHandler}
              shippingAddressTrue={shippingAddressTrue}
              />
            </PayPalScriptProvider>
              <p className="text-xs text-gray-500 mt-2 text-center">
                  * Secure payment via PayPal.
              </p>
            </div>
 

            {/* <div className = "bottom-0 flex-col"> 
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-gray-700">
                    <p>Shipping Fee</p>
                    <p>${shippingFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-gray-700">
                    <p>Tax (5%)</p>
                    <p>${tax.toFixed(2)}</p>
                </div>
                <div className="border-t pt-4 flex justify-between text-gray-900 font-bold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                </div>
            </div> */}
            
            <div className="flex-col space-y-2 mt-32">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Shipping Address
                </h2>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 border-l-black"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Postalcode
                  </label>
                  <input
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <button
                onClick={saveShippingAddressHandler}
                 className="w-full flex items-center justify-center bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md"
                 >
                  Save Shipping Address
                </button>
            </div>

        </div>

      </div>
    </LayOut>
  );
}
