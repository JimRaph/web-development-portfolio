import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    CLEAR
} from '../constants/cart_constant';

export const cartReducer = (
    state = {
        cartItems: [],
        shippingAddress: {},
    },
    action
) => {

    switch (action.type) {

        case ADD_ITEM_TO_CART:
            const item = action.payload;
            // console.log('reducer ', item)
            const existingItem = state.cartItems.find((x) => x?.product === item.product);
            // console.log('red :', item)
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x?.product === existingItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }


        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x?.product !== action.payload.id && x?.user !== action.payload.userId),
            };


        case CLEAR_CART:
            const user = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => {
                   x.user !== user
                }),
            };

        case CLEAR:
            return{
                ...state,
                cartItems: [],
                shippingAddress: {},
                paymentMethod: {},
            }


        case CART_SAVE_SHIPPING_ADDRESS:
            const { userId, ...addressData } = action.payload;  // Extract userId and address data
            return {
                ...state,
                shippingAddress: action.payload
                
            };
            

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };


        default:
            return state;
    }
};

