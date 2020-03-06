import { ToastAndroid } from 'react-native'
export const ToastC = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            props.duration ? props.duration : ToastAndroid.LONG,
            props.position ? props.position : ToastAndroid.BOTTOM,
            25,
            50,
        );
        return null;
    }
    return null;
};