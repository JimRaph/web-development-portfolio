import  { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayOut from "../layouts/layout";
import { orderDetail } from "../redux/actions/order_action";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { orderDetailAction } from "../Redux/Actions/Order";

const OrderConfirmation = () => {

  
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetail(id));
  }, [dispatch, id])
  
  const orderDetailReducer = useSelector((state)=>state.orderDetailReducer)
  const { order, loading } = orderDetailReducer;
  // Confetti state
  const [confettiActive, setConfettiActive] = useState(true);

  // Confetti timer to stop after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LayOut>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-white">
          {confettiActive && <Confetti />}
          <div className="p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Thank you for your order.
            </p>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h2 className="text-2xl text-left font-semibold text-gray-800 mb-2">
                Order Summary
              </h2>
              {order && (
                <div className="text-left">
                  <p className="border-b border-gray-200 pb-2 mb-2">

                    <b>Order ID - </b> {order._id}
                  </p>
                  <p className="border-b border-gray-200 pb-2 mb-2">  
                    <strong>Name</strong> - {order.user.name}{" "}
                  </p>
                  <p className="border-b border-gray-200 pb-2 mb-2">
                    <strong>Email</strong> - {order.user.email}
                  </p>
                  <p className="border-b border-gray-200 pb-2 mb-2">
                    <strong>Total Amount</strong> - ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="border-b border-gray-200 pb-2 mb-2" >
                    <strong>Order Date</strong> -{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="border-b border-gray-200 pb-2 mb-2">
                    <strong>Payment Method</strong> - {order.paymentMethod}
                  </p>
                  

                </div>
               )} 
            </div>
            <button
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => {
                window.location.href = "/"; // Redirect to homepage
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
       )} 
    </LayOut>
  );
};

export default OrderConfirmation;