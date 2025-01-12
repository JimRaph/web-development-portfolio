import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cart_constant'

import { base_url } from '../constants/url'
import axios from 'axios'

export const addToCart = (id, qty) => async(dispatch, getState) =>{
    try{
        const {data} = await axios.get(`${base_url}/api/products/${id}`)
        dispatch({type: ADD_ITEM_TO_CART, 
            payload: {
                product: data._id,
                name:data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        const cartItems = getState().cartReducer.cartItems;
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }catch(e){
        console.log(e);
    }
}

export const removeFromcart = (id) =>(dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));

}

export const clearCart = () => (dispatch) => {
    dispatch({type: CLEAR_CART})
    localStorage.removeItem('cartItems')
}

