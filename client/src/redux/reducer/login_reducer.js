import {
    LOGIN_REQ,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_LOGIN_ERROR
} from '../constants/login_constant.js';

export const loginReducer = (state={}, action) => {
    switch (action.type) {
        case LOGIN_REQ:
            return {loading: true};
        case LOGIN_SUCCESS:
            return {loading: false, user: action.payload};
        case LOGIN_FAILED:
            return {loading: false, error: action.payload};
        case CLEAR_LOGIN_ERROR:
            return {...state, error: null};
        case LOGOUT:
            return {};
        default:
            return state
    }
}