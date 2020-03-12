import * as s from '../../app.json';
import { } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
export default class UserService {

    static login(email, password) {
        return new Promise((resolve, reject) => {
            if (email == '' || password == '') {
                reject('Email şifre boş olamaz!');
            }

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
                    resolve(data)
                } else {
                    reject(data.message ? data.message : "Hatalı kullanıcı adı şifre")
                }

            }).catch((error) => {
                reject(error)
            })
        })
    }

    static async getLoggedUser() {
        return await AsyncStorage.getItem('user').then((value) => {
            if (value)
                return true;
            else
                return false
        }).catch((err) => {
            return false
        })
    }
}