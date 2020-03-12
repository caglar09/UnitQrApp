import * as s from '../../app.json';

import AsyncStorage from '@react-native-community/async-storage';
export default class AuditService {

    static async GetActiveAudit() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token', (err, token) => {
                if (err)
                    reject(err);

                var _token = JSON.parse(token);
                fetch(s.api_url + 'unit/activeaudit', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + _token
                    },

                }).then((val) => val.json())
                    .then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err)
                    })
            })
        })
    }

    static async StartAudit(model) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token', (err, token) => {
                if (err)
                    reject(err);

                var _token = JSON.parse(token);
                fetch(s.api_url + 'unit/startaudit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + _token
                    },
                    body: JSON.stringify(model)
                }).then((val) => val.json())
                    .then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
            })
        })
    }

    static async FinishAudit(model) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token', (err, token) => {
                if (err)
                    reject(err);

                var _token = JSON.parse(token);
                fetch(s.api_url + 'unit/finishaudit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + _token
                    },
                    body: JSON.stringify(model)
                }).then((val) => val.json())
                    .then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
            })
        })
    }

    static async GetCategories() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token', (err, token) => {
                if (err)
                    reject(err);

                fetch(s.api_url + 'unit/config', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                }).then((val) => val.json())
                    .then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err)
                    })
            })
        })
    }
}