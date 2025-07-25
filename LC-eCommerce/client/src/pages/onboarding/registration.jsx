
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../../redux/actions/register_action';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RotateLoader from 'react-spinners/RotateLoader';



const Registration = () => {
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector((state) => state.registerReducer)
    const navigate = useNavigate();
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

   const formHandler = (e) =>{
    e.preventDefault();
    dispatch(registerAction(name, email, password))
    navigate('/login')
   }

   useEffect(()=>{
    setTimeout(()=>{
        if(error){
            dispatch({type: 'CLEAR_REGISTER_ERROR'})
    }
    }, 4000)
     
    }, [error])

    return(
        <>
            {error ? (<div>Error occurred, please try again</div>) : (
                    <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center py-[12rem] sm:py-[8rem] px-6  mx-auto md:h-screen lg:py-0">
                    {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> */}
                        {/* <img className=" h-8 mr-2" src="../src/assets/logo.png" alt="logo" /> */}
                        <Link to = "/" 
              className="flex mb-3 items-center justify-around rtl:space-x-reverse"
            >
              {/* <img
                src="../src/assets/logo.png"
                className="h-8"
                alt="Luxury & Cheap Logo"
              /> */}
              <span className="font-extrabold text-blue-700 p-1">Luxury & Cheap</span>
              <span className="self-center h-9 text-2xl font-bold whitespace-nowrap text-blue-700">
                |
              </span>
            </Link>    
                    {/* </a> */}
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formHandler}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" value = {email} onChange={(e) =>setEmail(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                    <input type="text" name="username" id="username" value={name} onChange={(e)=>setName(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                {/* <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div> */}
                                {/* <div className="flex items-start">
                                     <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div> 
                                </div> */}
                                {error?
                                <p className='mb-2 mt-0 text-red-700'>{error}</p>:
                                <></>}
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>
                )
            }
            
        </>
    )

}

export default Registration