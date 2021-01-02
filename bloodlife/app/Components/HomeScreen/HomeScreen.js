import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Alert,
  Card
} from 'react-native';
import back from '../../images/back.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';




class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      user_name: '',
      token: '',
      profile_pic: '',
    };
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('user');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log(userToken + " at home component");

    // this.props.navigation.navigate(userToken ? 'Help' : 'Home');
  };
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      Alert.alert(JSON.stringify(result));
      this.setState({ user_name: 'Welcome' + ' ' + result.name });
      this.setState({ token: 'User Token: ' + ' ' + result.id });
      this.setState({ profile_pic: result.picture.data.url });
      console.log(this.state);
      
    }
  };
  onLogout = () => {
    //Clear the state after logout
    this.setState({ user_name: null, token: null, profile_pic: null });
    this.setState({ isLoggedIn: false });
  };
  
  shareLinkWithDialog = async () => {
    const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);
    if (canShow) {
      try {
        const {isCancelled, postId} = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );
        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground source={back} style={styles.imageContainer}>
            <View style={styles.up}>
              <Text></Text>

            </View>
            <View style={styles.down}>


              <TouchableOpacity
                style={styles.loginButton} loginTittle


                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}
              >
                <Text style={styles.signUpTitle}>Login</Text>
              </TouchableOpacity>
           


              <TouchableOpacity
                style={styles.singUpbtn} signUpTitle


                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}
              >
                <Text style={styles.signUpTitle}>Sign Up</Text>
              </TouchableOpacity>
              <LoginButton
                readPermissions={['public_profile']}
                onLoginFinished={(error, result) => {
                  if (error) {
                    alert(error);
                    alert('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    alert('login is cancelled.');
                  } else {
                    console.log("is logged");
                    AsyncStorage.setItem("user", "Logged In");
                    this.setState({ isLoggedIn: true });

                    AccessToken.getCurrentAccessToken().then(data => {
                      console.log(data + "At homescreen");
                      this.props.navigation.navigate("Help")
                      Alert.alert(data.accessToken.toString());

                      const processRequest = new GraphRequest(
                        '/me?fields=name,picture.type(large)',
                        null,
                        this.get_Response_Info
                      );
                      // Start the graph request.
                      new GraphRequestManager().addRequest(processRequest).start();
                    });
                  }
                }}
                onLogoutFinished={this.onLogout}
                style={styles.singUpbtn} signUpTitle
              />
              { this.state.isLoggedIn && this.props.navigation.navigate("Help")
              
            }
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    height: 700,
    width: '100%'
  },
  up: {
    marginTop: '68%',
    alignItems: 'center'
  },
  down: {
    marginTop: '30%',
    alignItems: 'center'
  },

  title: {
    color: 'red',
    textAlign: 'center',
    fontSize: 30
  },
  textInput: {
    width: '82%',
    color: '#fff',
    // height: 42,
    fontSize: 20,
    padding: 5,
    paddingLeft: 15,
    marginTop: '3%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 35,
    backgroundColor: null
  },
  loginButton: {
    width: '70%',
    height: '15%',
    borderRadius: 25,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '3%',
    backgroundColor: 'red',
  },
  loginTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  singUpbtn: {
    width: '70%',
    height: '15%',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: "3%",

  },
  signUpTitle: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',

  },
  loginBtn: {
    width: '70%',
    height: '16%',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: "3%",
    marginVertical: '3%'
  },
  loginTittle: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  goSignup: {
    color: '#fff',
    fontSize: 17,
    marginTop: '2%',
    textAlign: 'center'
  }
});



export default HomeScreen;
