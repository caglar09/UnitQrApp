import React, { Component, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Text, ScrollView, TextInput, Image, Button, AsyncStorage, ToastAndroid, BackHandler } from 'react-native'
import { Container, Header, Body, Content, Left, Right, Title, Fab, View, Card, CardItem, Grid, Col, Row, Badge, Toast } from 'native-base'
import Popover from 'react-native-popover-view'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { singinActions } from '../../redux/action'
import { connect } from 'react-redux';

import { Alert as AlertComponent } from '../Alert/Index';
import { ToastC } from '../Component/ToastC'


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            email: '',
            password: '',
            isLogouted: false
        }
        var logouted = this.props.navigation.getParam('isLogout');
        if (logouted) {
            this.setState({ ...this.state, isLogouted: logouted })
        }
        AsyncStorage.getItem('token', (err, result) => {
            if (result !== null && result !== undefined) {
                this.props.navigation.push('Home');
            }
        });

    }
    UNSAFE_componentWillMount() {

    }

    componentDidMount() {

        const onBackPress = () => {
            if (this.state.isLogouted) {
                console.log("asdasda")
                return false;
            }
            return true;
        }

        BackHandler.addEventListener('hardwareBackPress',onBackPress);
    }

    
    handleSetText = (input, type) => {
        switch (type) {
            case 'email':
                this.setState({ ...this.state, email: input })
                break;

            case 'password':
                this.setState({ ...this.state, password: input })
                break;
        }
    }

    login = () => {
        this.props.login(this.state.email, this.state.password).then((value) => {
            if (value) {
                this.props.navigation.push('Home')
            }
        })
    }
    render() {
        return (

            <View style={[styles.centerContent]}>
                <View style={[styles.formHeader]}>
                    <Image source={require('../../assets/lena.png')} style={{ width: 100, height: 100, marginBottom: 50 }} />
                </View>
                <View style={[styles.inputRow]}>
                    <TextInput style={[styles.input]} placeholder="E-posta adresiniz" textContentType='emailAddress' ref={ref => this.email = ref} onChangeText={(e) => { this.handleSetText(e, 'email') }}></TextInput>

                </View>
                <View style={[styles.inputRow]}>
                    <TextInput style={[styles.input]} placeholder="Şifreniz" secureTextEntry={true} textContentType='password' ref={ref => this.password = ref} onChangeText={(e) => { this.handleSetText(e, 'password') }}></TextInput>
                </View>
                <View style={[styles.inputRow]}>
                    <TouchableOpacity style={[styles.signInBtn]} onPress={() => this.login()}>
                        <Text style={[styles.wihiteText]}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        padding: 20
    },
    formHeader: {
        width: '100%',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    formHeaderText: {
        fontSize: 24,

    },
    inputRow: {
        width: '100%',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#e4e4e4',
        width: '100%',
        paddingHorizontal: 15
    },
    signInBtn: {
        width: '100%',
        backgroundColor: '#3B4BB3',
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    wihiteText: {
        color: '#fff'
    }
});

const mapStateProps = (state) => {
    const { user } = state;
    return { user };
}

const mapDispatchFunc = dispatch => ({
    login: (email, password) => dispatch(singinActions.login(email, password)),
    logout: () => dispatch(singinActions.logout())
})

export default connect(mapStateProps, mapDispatchFunc)(SignIn);