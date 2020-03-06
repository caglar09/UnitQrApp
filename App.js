import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Root, Container, Content } from 'native-base'
import { createAppContainer, createStackNavigator, NavigationContainer } from 'react-navigation'

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import store from './src/redux/store'


import Home from './src/screen/Home/Index';
import QrCodeReader from './src/screen/Qr/Index';
import Audit from './src/screen/Audit/Index';
import SignIn from './src/screen/SignIn/Index';
import Alert from './src/screen/Alert/Index'
import UserService from './src/service/user.service';

const AppStackContainer = createStackNavigator({
  SignIn: {
    screen: SignIn
  },
  Home: {
    screen: Home,
    navigationOptions: {
      lazy: false
    }
  },
  QrCode: {
    screen: QrCodeReader
  },
  Audit: {
    screen: Audit
  }
}, {
  headerMode: 'none',
  
});

UserService.getLoggedUser().then((va)=>{
  
})
const AppContainer = createAppContainer(AppStackContainer);

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {


    return (
      <Provider store={store}>
        <Container>
          <Alert />
          <View style={{ flex: 1 }}>
            <AppContainer/>
          </View >
        </Container>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({

});

export default App;
