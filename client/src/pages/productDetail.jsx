import LayOut from "../layouts/layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productAction } from "../redux/actions/product_action";
import { addToCart } from "../redux/actions/cart_action";

const ProductDetail = () => {

  const {id} = useParams();

  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer)
  const {loading, error, product} = productReducer;
  const [quantity, setQuantity] = useState(0)

  const [open, setOpen] = useState(true)
  
  useEffect(() => {
    dispatch(productAction(id))
  }, [dispatch, id])


  const addToCartHandler = () => {
    if(quantity > 0){
      const user = JSON.parse(localStorage.getItem('userinfo'))
      // console.log('pd ', id)
      dispatch(addToCart(id, quantity, user._id))
    } else{
      return alert('You cannot add to cart an item with quantity of 0')
    }

  }

  
  return (
    <LayOut>
      {loading? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) :
    (
      
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {product.name}
              </h1>

              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Description
                </a>
                {/* <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Reviews
                </a> */}
              </div>
              <p className="leading-relaxed mb-4">
              {product.description}
              </p>
              {/* <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Color</span>
                <span className="ml-auto text-gray-900">Blue</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">Medium</span>
              </div> */}
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Ratings</span>
                <span className="ml-auto text-gray-900">{product.rating}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Review</span>
                <span className="ml-auto text-gray-900">{product.numReviews}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Quantity</span>
                <span className="ml-auto text-gray-900">{product.countInStock}</span>
              </div>

              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    {/* <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div> */}

                    {product.countInStock > 0 ? (
                      <div className="flex ml-0 items-center">
                        <span className="mr-3">Quantity</span>
                        <div className="relative">
                          <select
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value, 10))
                            }
                            className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              )
                            )}
                          </select>
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
              
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                {product.countInStock > 0 ? (
                  <button onClick={addToCartHandler} className="flex ml-auto text-white bg-blue-800 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Add to cart
                </button>
                ) : (
                  <h2 className="flex ml-auto cursor-not-allowed text-white bg-blue-800 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Out of Stock
                </h2>
                )}
                
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
            />
          </div>
        </div>
      </section>

    )}
      
    </LayOut>
  );
};

export default ProductDetail;
