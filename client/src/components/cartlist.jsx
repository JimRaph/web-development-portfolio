
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromcart } from '../redux/actions/cart_action'

const CartItemList = ({cartItem}) =>{

    const dispatch = useDispatch()

    const removeItem = (id) =>{
        dispatch(removeFromcart(id))
    }

    const addItemToCart = (id, qty) =>{
        dispatch(addToCart(id, qty))
    }

    return (
        <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItem.map((product) => (
                          <li key={product.product} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={product.image} className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty 
                                <select
                                    className="rounded border appearance-none border-gray-300 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-1 pr-1"
                                   onChange={(e)=>addItemToCart(product.product, Number(e.target.value))}
                                   value={product.qty}
                                 >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>

                                </p>
                                

                                <div className="flex">
                                  <button type="button"
                                  onClick={()=>removeItem(product.product)} 
                                  className="font-medium text-blue-800 hover:text-blue-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
    )
}

export default CartItemList;