import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { productListReducer, productReducer } from './reducer/product_reducer';
import { loginReducer } from './reducer/login_reducer.js';
import { registerReducer } from './reducer/register_reducer.js';
import { cartReducer } from './reducer/cart_reducer';
import { orderDetailReducer, orderListReducer, orderPaymentReducer, orderReducer } from './reducer/order_reducer.js';

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const rootReducer = combineReducers({
    productListReducer, productReducer, 
    registerReducer, loginReducer,
    cartReducer, orderReducer, orderDetailReducer, orderPaymentReducer, orderListReducer
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, 
    applyMiddleware(thunk));

export const persistor = persistStore(store);