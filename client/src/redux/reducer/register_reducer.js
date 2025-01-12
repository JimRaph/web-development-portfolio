import {
    REGISTER_REQ,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    CLEAR_REGISTER_ERROR
} from '../constants/register_constant';

export const registerReducer = (state={}, action) => {
    switch (action.type) {
        case REGISTER_REQ:
            return {loading: true};

        case REGISTER_SUCCESS:
            return {loading: false, user:action.payload};

        case REGISTER_FAILED:
            return {loading: false, error: action.payload};
        case CLEAR_REGISTER_ERROR:
            return {...state, error: null};    
        default:
            return state
    }
}