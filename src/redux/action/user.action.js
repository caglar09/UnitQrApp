import { user_constant, alert_constant } from "../constant"
import UserService from '../../service/user.service'
import {  } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
export const singinActions = {
    login: Login,
    logout: LogOut
};


function Login(email, password) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request(email));
            dispatch(alertLoading("Giriş yapılıyor. Lütfen Bekleyin"))
            UserService.login(email, password).then((value) => {
                if (value.success) {
                    let promises = [];
                    promises.push(AsyncStorage.setItem('token', JSON.stringify(value.result.token)));
                    promises.push(AsyncStorage.setItem('user', JSON.stringify(value.result.account)));
                    Promise.all(promises).then((val) => {
                        dispatch(success(value.result?.account));
                        // dispatch(alertSuccess("Giriş Başarılı."));
                        resolve(value.success)
                    }).catch((error) => {
                        dispatch(failure(error));
                        dispatch(alertFailure(error))
                        reject(false)
                    })
                } else {
                    reject(value.message)
                }
            }).catch((error) => {
                dispatch(failure(error))
                dispatch(alertFailure(error))
            })
        })
    }


    function request(user) { return { type: user_constant.LOGIN_REQUEST, user: user } }
    function success(user) { return { type: user_constant.LOGIN_REQUEST_SUCCESS, user: user } }
    function failure(error) { return { type: user_constant.LOGIN_REQUEST_FAILURE, error: error } }

    function alertSuccess(error) { return { type: alert_constant.ALERT_SUCCESS, error: error } }
    function alertFailure(error) { return { type: alert_constant.ALERT_FAILURE, error: error } }
    function alertLoading(error) { return { type: alert_constant.ALERT_ROOT_LOADING, error: error } }

}

function LogOut() {
    return dispatch => {
        dispatch(request());
        let promises = [];
        promises.push(AsyncStorage.removeItem('user'));
        promises.push(AsyncStorage.removeItem('token'));
        Promise.all(promises).then((value) => {
            dispatch(success());
        }).catch((error) => {
            dispatch(failure(error));
        })
    }

    function request() { return { type: user_constant.LOGOUT_REQUEST } }
    function success() { return { type: user_constant.LOGOUT_REQUEST_SUCCESS } }
    function failure(error) { return { type: user_constant.LOGOUT_REQUEST_FAILURE, error: error } }
}



// export const LoginActionSuccess = () => {
//     return (dispatch) => {
//         dispatch({
//             type: signin_constant.LOGIN_REQUEST_SUCCESS,
//             payload: null
//         })
//     }
// }

// export const LoginActionFailure = () => {
//     return (dispatch) => {
//         dispatch({
//             type: signin_constant.LOGIN_REQUEST_FAILURE,
//             payload: null
//         })
//     }
// }

// export const LoginActionLoading = () => {
//     return (dispatch) => {
//         dispatch({
//             type: signin_constant.LOGIN_REQUEST_LOADING,
//             payload: null
//         })
//     }
// }