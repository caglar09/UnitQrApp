import { alert_constant } from "../constant";

const initial_state = {

};
export const alert_Actions = {
    success:Success,
    failure:Failure,
    loading:Loading,
}

function Success(message) {
    return {
        type: alert_constant.ALERT_SUCCESS,
        error: message,
        errorType:'success'
    }
}

function Failure(message) {
    return {
        type: alert_constant.ALERT_FAILURE,
        error: message,
        errorType:'success'
    }
}

function Loading(message) {
    return {
        type: alert_constant.ALERT_ROOT_LOADING,
        error: message,
        errorType:'warning'
    }
}