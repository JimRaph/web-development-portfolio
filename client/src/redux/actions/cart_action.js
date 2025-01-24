import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cart_constant';

import { base_url } from '../constants/url';
import axios from 'axios';

// Add item to cart
export const addToCart = (id, qty, userId) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${base_url}/api/products/${id}`);
       
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                user: userId,
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });
        
        // Save cart to localStorage for the current user
        const cartItems = getState().cartReducer.cartItems;
        
        if (userId) {
            
            localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
        }
    } catch (e) {
        // console.error(e);
        // console.log(e.message)
    }
};

// Remove item from cart
export const removeFromCart = (id, userId) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: {id, userId},
    });
    // Update localStorage for the current user
    // const cartItems = getState().cartReducer.cartItems;
    // if (userId) {
    //     localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    // }
};

// Save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
    });
    // console.log(`saveShippingAddress `, data.userId)
    localStorage.setItem(`shippingAddress_${data.userId}`, JSON.stringify(data));
    alert(`Address successfully saved`)
};

// Load shipping address from localStorage
export const loadShippingAddress = (userId) => (dispatch, getState) => {
    if(localStorage.getItem(`shippingAddress_${userId}`)){
        const savedShippingAddress = JSON.parse(localStorage.getItem(`shippingAddress_${userId}`))
        // console.log(savedShippingAddress);
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: savedShippingAddress,  
        });
        
        }
        else{
            const shippingAddress = getState().cartReducer.shippingAddress;
            let shippingAddressUser
            if(shippingAddress.userId === userId) {
              shippingAddressUser = shippingAddress
              dispatch({
                type: CART_SAVE_SHIPPING_ADDRESS,
                payload: shippingAddressUser,  
              })
            }
            else{
                dispatch({
                    type: CART_SAVE_SHIPPING_ADDRESS,
                    payload: {},  
                  })
            }
            
        }
};


// Save payment method
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// Clear cart
export const clearCart = (userId) => (dispatch) => {
    dispatch({ type: CLEAR_CART, payload: userId});
    // Clear the cart from localStorage for the current user
    if (userId) {
        localStorage.removeItem(`cartItems_${userId}`);
    }
};

// Load cart from localStorage
// export const loadCart = (userId) => (dispatch) => {
//     const savedCart = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || {};
//     console.log('savd', savedCart)
//     if (savedCart && savedCart.length > 0){
//         savedCart.map((cartItem) =>{
//             console.log('sav ',cartItem)
//             dispatch({
//                 type: ADD_ITEM_TO_CART,
//                 payload: cartItem,
//             });
//         })
//     }
    
    
// };
