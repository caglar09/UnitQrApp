import { user_constant } from "../constant";

const initial_state = {
    isloading: false,
    user: {},
};


export const user_reducer = (state = initial_state, action) => {
    // console.log(action)
    switch (action.type) {
        case user_constant.LOGIN_REQUEST:
            return { ...state, isloading: true, user: action.user }
        case user_constant.LOGIN_REQUEST_FAILURE:
            return { ...state, isloading: false, error: action.error }
        case user_constant.LOGIN_REQUEST_SUCCESS:
            return { ...state, isloading: false, user: action.user }
        default:
            return { ...state }
    }
}