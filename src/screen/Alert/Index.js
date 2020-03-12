import React, { Component } from "react";
import { View, ToastAndroid,StyleSheet } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { Toast as NToast} from 'native-base';
import { connect } from "react-redux";
import { ToastC } from "../Component/ToastC";


class Alert extends Component {
    constructor(props)
    {
        super(props);
        this.toast=React.createRef();
        this.state={
            position:'bottom'
        }
    }

    render() {
        return (
                // <ToastC visible={this.props.alert.message ? true : false} message={this.props.alert.message}></ToastC>
            <View style={{ position: 'absolute', zIndex: 100, width: '100%' }}>
                {Object.values(this.props.alert.message).length > 0 ? 
                <View>
                    {/* <Toast ref="toast" position={this.state.position}/>
                    {this.refs.toast?.show(this.props.alert.message)} */
                    
                    NToast.show({text:this.props.alert.message,type:this.props.alert.type})}
                </View>: null}
            </View>
        );
    }
}

const styles=StyleSheet.create({
    toast:{
        backgroundColor:'#1c1c1a',
        width:'100%',
        borderRadius:0,
        top:-60,
        minHeight:60
    }
})
const mapStateProps = state => {
    const { alert } = state;
    return { alert };
}
export default connect(mapStateProps)(Alert);