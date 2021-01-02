import { SIGN_UP } from '../types.js';
import { Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

_retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

import axios from 'axios';

export function signUp(newUser, ctx) {
  console.log("newUser*****" + newUser);

  // Alert.alert(90);
  axios.post('http://10.0.2.2:9090/auth/user/signup', newUser)
    .then(response => {

      ToastAndroid.show('Signedup successfully!!', ToastAndroid.SHORT);

      // Alert.alert(JSON.stringify(newUser));

      AsyncStorage.setItem("token", JSON.stringify(newUser));

      //  Alert.alert(JSON.stringify(_retrieveData("abc")));

      setTimeout(() => {

        ctx.props.navigation.navigate('Login');

      }, 2000)

      console.log("response" + response);
      return response.data;
    })
    .catch(e => {
      // Alert.alert(e.message)
      // Alert.alert(JSON.stringify(newUser));
      console.log('Auth Faild Try Again' + e);

      ToastAndroid.show(e.message, ToastAndroid.SHORT);
      return false;
    });


  return {
    type: SIGN_UP,
    payload: null
  };
}

export function login(newUser, ctx) {
  console.log("login user data is *****" + newUser);

  // Alert.alert(90);

  axios.post('http://10.0.2.2:9090/auth/login', newUser)

    .then(response => {

      ToastAndroid.show('Login successfully!!', ToastAndroid.SHORT);

      // Alert.alert(JSON.stringify(newUser));
      console.log(response.data);

      AsyncStorage.setItem("user", JSON.stringify(response.data));

      //  Alert.alert(JSON.stringify(_retrieveData("abc")));

      setTimeout(() => {

        ctx.props.navigation.navigate('Help');

      }, 2000)

      console.log("response" + response);
      return response.data;
    })
    .catch(e => {
      // Alert.alert(e.message)
      // Alert.alert(JSON.stringify(newUser));
      console.log('Auth Faild Try Again' + e);

      ToastAndroid.show(e.message, ToastAndroid.SHORT);
      return false;
    });


  return {
    type: SIGN_UP,
    payload: null
  };
}


