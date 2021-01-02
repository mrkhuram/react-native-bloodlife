/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './app/redux/Reducers/index';
import HomeScreen from './app/Components/HomeScreen/HomeScreen';
import SignUp from './app/Components/Signup/Signup';
import Help from './app/Components/Help/Help';
import Login from './app/Components/Login/Login';
import AsyncStorage from '@react-native-community/async-storage';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);
const Stack = createStackNavigator();

let isSigned = AsyncStorage.getItem('user')
console.log(isSigned);
console.log("App js");

const App = () => {
  
  useEffect(() => {
    let isSigned = AsyncStorage.getItem('user')
    console.log(isSigned);
    console.log("App js line 56");
  }, [])


  return (

    <Provider store={createStoreWithMiddleware}>


      <NavigationContainer>
        <Stack.Navigator initialRouteName={AsyncStorage.getItem("user") ? "Help" : "Home"}>
          {isSigned ?
            <>
              <Stack.Screen name="Help" component={Help} options={{ header: () => { } }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => { } }} />
              <Stack.Screen name="Signup" component={SignUp} options={{ header: () => { } }} />
              <Stack.Screen name="Login" component={Login} options={{ header: () => { } }} />
            </>
            :
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => { } }} />
              <Stack.Screen name="Signup" component={SignUp} options={{ header: () => { } }} />
              <Stack.Screen name="Login" component={Login} options={{ header: () => { } }} />
            </>}
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>


  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
