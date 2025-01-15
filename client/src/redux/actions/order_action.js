import {
    ORDER_REQ,
    ORDER_RESET,
    ORDER_SUCCESS,
    ORDER_FAIL,


    ORDER_DETAIL_REQ,
    ORDER_DETAIL_REQ_FAIL,
    ORDER_DETAIL_REQ_SUCCESS,


    ORDER_PAYMENT_REQ,
    ORDER_PAYMENT_REQ_FAIL,
    ORDER_PAYMENT_REQ_SUCCESS,


    ORDER_LIST_REQ,
    ORDER_LIST_REQ_FAIL,
    ORDER_LIST_REQ_SUCCESS
} from "../constants/order_constant"

import axios from "axios";

import { base_url } from "../constants/url";

// import { CLEAR_CART } from "../constants/cart_constant"
import { logoutAction } from "./login_action";

//order action
export const orderPostDb = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_REQ })
        const userInfo = getState().loginReducer.user;
        // console.log(userInfo)
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userInfo.token}`,

            }
        }
        const { data } = await axios.post(
            `${base_url}/api/orders`,   
            order,
            config
        );
        
        dispatch({ type: ORDER_SUCCESS, payload: data });
        
        // dispatch({ type: CART_ITEM_CLEAR, payload: data });
    } catch (error) {

        // console.log(error)
        dispatch({ type: ORDER_FAIL, payload: error.message });
    }
}

//order payment

export const orderPaymentDone = (orderId, paymentResult) => async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_PAYMENT_REQ });
            const userInfo = getState().loginReducer.user;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.put(
                `${base_url}/api/orders/${orderId}/payment`,
                paymentResult,
                config
            );

            dispatch({ type: ORDER_PAYMENT_REQ_SUCCESS, payload: data });
            dispatch(orderDetail(orderId))

        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            if (message === "Not authorized!") {
                dispatch(logoutAction());
            }
            dispatch({
                type: ORDER_PAYMENT_REQ_FAIL,
                payload: message,
            });
        }
    };


//detail req

export const orderDetail = (id) => async (dispatch, getState) => {
    try {
        // console.log(id)
        dispatch({ type: ORDER_DETAIL_REQ });
        const userInfo = getState().loginReducer.user;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${base_url}/api/orders/${id}`,

            config
        );
        dispatch({ type: ORDER_DETAIL_REQ_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized!") {
            dispatch(logoutAction());
        }
        dispatch({
            type: ORDER_DETAIL_REQ_FAIL,
            payload: message,
        });
    }
};


// order list action

export const orderList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQ });
        const userInfo = getState().loginReducer.user;

        const config = {
            headers: {

                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${base_url}/api/orders`,
            config
        );
        dispatch({ type: ORDER_LIST_REQ_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized!") {
            dispatch(logoutAction());
        }
        dispatch({
            type: ORDER_LIST_REQ_FAIL,
            payload: message,
        });
    }
};