import {
    LOGIN_REQ,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../constants/login_constant.js';
import axios from 'axios';
import {base_url} from '../constants/url.js'
export const loginAction = (email, password) =>async(dispatch) => {
   try{
    dispatch({type: LOGIN_REQ})
    const {data} = await axios.post(`${base_url}/api/user/login`, {email, password})
    
    dispatch({type: LOGIN_SUCCESS, payload: data});
    localStorage.setItem('userinfo', JSON.stringify(data))
    console.log('word')
   }catch(err){
    dispatch({type: LOGIN_FAILED, payload:err.message})
   }
}

export const logoutAction = () => async(dispatch) => {
    localStorage.removeItem('userinfo')
    dispatch({type: LOGOUT})
    document.location.href = '/login'
}