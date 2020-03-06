import { alert_constant } from "../constant/alert.constant";

const initial_state = {
    isloading: false,
    message: {}
};


export const alert_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case alert_constant.ALERT_SUCCESS:
            return { ...state, isloading: false, message: action.error }
        case alert_constant.ALERT_FAILURE:
            return { ...state, isloading: false, message: action.error }
        case alert_constant.ALERT_ROOT_LOADING:
            return { ...state, isloading: true, message: action.error }
        default:
            return { ...state }
    }
}