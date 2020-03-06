import React, { Component } from "react";
import { View, ToastAndroid } from 'react-native';

import { Toast } from 'native-base';
import { connect } from "react-redux";
import { ToastC } from "../Component/ToastC";


class Alert extends Component {

    render() {
        console.log(this.props)
        console.log()
        return (
            <View style={{ position: 'absolute', zIndex: 100, width: '100%' }}>
                {Object.values(this.props.alert.message).length > 0 ? <ToastC visible={this.props.alert.message ? true : false} message={this.props.alert.message}></ToastC> : null}
            </View>
        );
    }
}
const mapStateProps = state => {
    const { alert } = state;
    return { alert };
}
export default connect(mapStateProps)(Alert);