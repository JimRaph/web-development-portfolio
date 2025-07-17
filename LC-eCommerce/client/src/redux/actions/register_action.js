import {
    REGISTER_REQ,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
} from '../constants/register_constant.js';
import axios from 'axios';
import {base_url} from '../constants/url.js'

export const registerAction = (name, email, password) =>async(dispatch) => {
   try{

    dispatch({type: REGISTER_REQ})
    const {data} = await axios.post(`${base_url}/api/user/register`, {name, email, password})

    dispatch({type: REGISTER_SUCCESS, payload: data});
    // console.log({data})
    // console.log('woo')

   }catch(err){
    // console.log(err.message)
    // console.log(err.response.data.message)
    dispatch({type: REGISTER_FAILED, payload: err.response.data.error})
    // console.log(err.response.data.error)
   }
}