import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { productListAction } from "../redux/actions/product_action"
import RotateLoader from "react-spinners/RotateLoader"

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer)
  const {loading, error, products=[]} = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);
  
    return (

         <div className="">
          {loading ? (
            <div  className="m-auto text-center my-20">
            <RotateLoader color="blue" loading={loading}
            />
            </div>) : error ? (<div className="m-auto text-center my-20">{error} - Check Your Internet Connection</div>)
          :  (

            <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" id="products">
            {products.map((product) =>(
              <div className="group relative" key={product._id}>
              <Link to ={`/detail/${product._id}`}>
              <img src={product.image} alt="Front of men&#039;s Basic Tee in black." className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.name}
                      
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Black</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
                </Link>
            </div>

            ))}
          
            


            
          </div>
        
        </div>
      </div>
      </>

          )}

      </div>
       
    )
}

export default Products