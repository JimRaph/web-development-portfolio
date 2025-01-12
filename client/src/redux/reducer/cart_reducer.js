import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cart_constant'

export const cartReducer = (state={
    cartItems: [],
    shippingAddress: {},
}, action) => {
    switch(action.type){
        case ADD_ITEM_TO_CART:
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x.product === item.product);
            if(existingItem){
                return{
                    ...state, cartItems: state.cartItems.map((x) =>{
                        return x.product === existingItem.product ? item: x
                    })
                }
            } else {
                return{
                    ...state, 
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }

        case CLEAR_CART:
            return{
                ...state,
                cartItems: []
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload,
                saved: true
                
            }

        case SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
            
        default:
            return state
    }
}