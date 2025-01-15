import { useDispatch, useSelector } from "react-redux";
// import {userDropDown} from '../components/dropdown';
import {Link} from 'react-router-dom';
import { useState } from "react";
import { HeaderDropDown } from "../components/dropdown";
import CartPage from "../pages/cartpage";



const Header = () => {

  const loginReducer = useSelector((state) =>state.loginReducer)
  const {user} = loginReducer;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const quantityInCart = useSelector((state) => state.cartReducer.cartItems.reduce((total, product) => total + product.qty, 0))
  
  const cartitems = useSelector((state) => state.cartReducer.cartItems)
  
  const logOutHandler = () => {
    dispatch(logoutAction());
  };


  
    return (
      <>
        <nav className="bg-white border-b-blue-800 border-b-2">
          
          <div className=" max-w-2xl lg:max-w-7xl flex flex-wrap items-center justify-between mx-auto pt-3">
           
            {/* LOGO  */}
            <Link to = "/" 
              className="flex mb-3 items-center justify-around rtl:space-x-reverse"
            >
              {/* <img
                src="../src/assets/logo.png"
                className="h-8"
                alt="Luxury & Cheap Logo"
              /> */}
              <span className="font-extrabold text-blue-900 p-1">Luxury & Cheap</span>
              <span className="self-center h-9 text-2xl font-semibold whitespace-nowrap text-blue-800">
                |
              </span>
            </Link>

            <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
            <Link to='/' 
              className="text-blue-800 hover:underline font-medium rounded-lg text-md px-4 mb-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            > 
               Home
            </Link>
             
              {!user ? (
                  <Link to='/register'
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get started
                </Link>
              ): (
                <>
                  <HeaderDropDown logOutHandler = {logOutHandler} />
                  
                  {/* CART BUTTON */}
                  <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                  onClick={() => setOpen(true)}
                >

                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="size-6"
                    >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                      />
                  </svg>
                  <span >  {quantityInCart}</span>

                  <span className="sr-only">Open main menu</span>

                  <CartPage open={open} setOpen={setOpen}/>
                  
                </button>
                </>
              )}

              {/* MENU BAR BUTTON*/}
               {/* <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                >

                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                  
                </button> */}
              
            </div>
           
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >

              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {/* <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Services
                  </a>
                </li> */}
                <li>
                  {/* <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </a> */}
                </li>
              </ul>

            </div>
          </div>

          {/* {HORIZONTAL LINE BENEATH THE HEADER} */}
          {/* <div className="bg-blue-800 w-full h-0.5"></div> */}

        </nav>
      </>
    );
}

export default Header;