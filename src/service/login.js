import * as s from '../../app.json';
import { Alert, AsyncStorage, ToastAndroid } from 'react-native';

export  function Login(email, password) {

    if (email == '' || password == '') {
        Alert.alert('Dikkat !', 'Email şifre boş olamaz');
        return false;
    }

    return new Promise((resolve, reject) => {
        fetch(s.api_url + 'account/authenticate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((val) => val.json()).then((data) => {
            if (data.success) {
                AsyncStorage.setItem('token', JSON.stringify(data.result.token));
                AsyncStorage.setItem('user', JSON.stringify(data.result.account));
                resolve(true)
            } else {
                Alert.alert("Giriş Başarısız", data.message ? data.message : "Hatalı kullanıcı adı şifre")
                reject(false)
            }

        })
    })
}


export function Logout() {
    // let promises = [];
    // promises.push()
    return new Promise((resolve, reject) => {
        let promises = [];
        promises.push(AsyncStorage.removeItem('token'));
        promises.push(AsyncStorage.removeItem('user'))

        Promise.all(promises).then((val) => {
            resolve(val);
        }).catch((err) => {
            reject(err)
        })
    })

    // promises.push(AsyncStorage.setItem('user', null))

    // Promise.all(promises).then((res) => {
    //     console.log(res)
    //      resolve(true);
    // }).catch(() => {
    //      reject(false);
    // })
    // return new Promise((resolve, reject) => {
    //     return Promise.all(promises).then(() => {
    //         return resolve(true);
    //     }).catch(() => {
    //         return reject(false);
    //     })
    // })
}

