import * as s from '../../app.json';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export function GetActiveAudit() {
    return AsyncStorage.getItem('token').then((result) => {
        if (result !== null && result !== undefined) {
            var token = JSON.parse(result);
            return fetch(s.api_url + 'unit/activeaudit', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },

            })
                .then((val) => val.json())
                .then((data) => {
                    return data
                })
        }
        else {
            return "error";
        }

    })

}
export function StartAudit(model) {
    return AsyncStorage.getItem('token').then((result) => {
        if (result !== null && result !== undefined) {
            var token = JSON.parse(result);
            return fetch(s.api_url + 'unit/startaudit', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(model)
            })
                .then((val) => val.json())
                .then((data) => {
                    return data
                })
        }
        else {
            return "error";
        }

    })
}

export function FinishAudit(model) {
    return AsyncStorage.getItem('token').then((result) => {
        if (result !== null && result !== undefined) {
            var token = JSON.parse(result);
            return fetch(s.api_url + 'unit/finishaudit', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(model)
            })
                .then((val) => val.json())
                .then((data) => {
                    return data
                })
        }
        else {
            return "error";
        }

    })
}