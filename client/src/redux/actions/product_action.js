import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQ,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/product_constants.js'

import axios from 'axios';
import  {base_url}  from '../constants/url.js';

export const productListAction = () => async(dispatch) => {
    try{
        // await axios.get(`${base_url}/api/seed/products`)
        dispatch({type: PRODUCT_LIST_REQ})
        const {data} = await axios.get(`${base_url}/api/products`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: PRODUCT_LIST_FAIL, 
            payload: err.response && err.response.data.message ? err.response.data.message : err.message})
    }
}

export const productAction = (id) => async (dispatch) =>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQ})
        const {data} = await axios.get(`${base_url}/api/products/${id}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: PRODUCT_DETAILS_FAIL, 
            payload: err.response && err.response.data.message ? err.response.data.message : err.message})
    }
}