import React, { Component } from 'react';
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/userAction';
import { bindActionCreators } from 'redux';
import empty from 'is-empty';
import { TextField } from 'react-native-material-textfield';
import { styles } from './styles';
import GetLocation from 'react-native-get-location'

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      blood_group: 'A+',
      phone: '',
      currentLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.0122
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        currentLocation: {
          ...prevState.currentLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      };
    });
  };

  getLocationHandler = () => {

    // Geolocation.getCurrentPosition(
    //   pos => {
    //     const coordsEvent = {
    //       nativeEvent: {
    //         coordinate: {
    //           latitude: pos.coords.latitude,
    //           longitude: pos.coords.longitude
    //         }
    //       }
    //     };
    //     console.log(coordsEvent);

    //     this.pickLocationHandler(coordsEvent);
    //     Alert.alert('Location traced successfully!');
    //   },
    //   err => {
    //     console.log(err);
    //     alert('Fetching the Position failed, please pick one manually!');
    //   }
    //   ,{
    //     enableHighAccuracy: false, timeout: 5000, maximumAge: 360000
    //   }
    // );
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);

        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: location.latitude,
              longitude: location.longitude
            }
          }
        };
        console.log(coordsEvent);

        this.pickLocationHandler(coordsEvent);
        Alert.alert('Location traced successfully!');

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
        alert('Fetching the Position failed, please pick one manually!');
      })
  };

  onSubmit() {
    const {
      name,
      email,
      password,
      blood_group,
      currentLocation,
      phone
    } = this.state;
    //console.log(name,email,password,blood_group,currentLocation.latitude,currentLocation.longitude);
    const newUser = {
      name,
      email,
      password,
      blood_group,
      coordinates: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      phone
    };

    console.log(newUser);
    if (empty(name) || empty(password) || empty(blood_group) || empty(phone)) {
      Alert.alert("Please fill all the fields.")
    } else {
      this.props.signUp(newUser, this)
    }
  }

  render() {


    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground style={styles.imageContainer}>
            <View style={styles.childContainer}>
              <Text style={styles.heading}> Sign Up </Text>
              <View style={{ width: '90%' }}>
                <TextField
                  style={styles.loginField}
                  label="Name"
                  fontSize={20}
                  textColor="black"
                  baseColor="black"
                  tintColor="red"
                  lineWidth={1}
                  labelPadding={1}
                  value={this.state.name}
                  // onBlur={(email)=> this.validate(email)}
                  onChangeText={name => this.setState({ name: name })}
                />

                
                <TextField
                  style={styles.loginField}
                  label="Phone No +92"
                  fontSize={20}
                  textColor="black"
                  baseColor="black"
                  tintColor="red"
                  lineWidth={1}
                  keyboardType={'numeric'}
                  labelPadding={1}
                  value={this.state.phone}

                  onChangeText={phone => this.setState({ phone: phone })}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    borderBottom: 2,
                    borderBottomColor: 'red'
                  }}
                >
                  <View style={{ width: '100%' }}>
                    <TextField
                      style={styles.loginField}
                      label="Enter Password"
                      fontSize={20}
                      tintColor="red"
                      textColor="black"
                      baseColor="black"
                      lineWidth={1}
                      labelPadding={1}
                      secureTextEntry={true}
                      value={this.state.password}
                      onChangeText={password =>
                        this.setState({ password: password })
                      }
                    />
                    <View
                      style={{
                        height: 50,
                        width: '100%',
                        borderWidth: 1,
                        marginTop: 15,
                        borderColor: 'gray'
                      }}
                    >
                      <TouchableOpacity>
                        <Picker
                          placeholder="Select the blood Group"
                          selectedValue={this.state.blood_group}
                          onValueChange={itemValue =>
                            this.setState({ blood_group: itemValue })
                          }
                          style="color:red"
                          itemStyle={{
                            backgroundColor: 'yellow',
                            color: 'red'
                          }}
                          itemTextStyle={{
                            fontSize: 18,
                            color: 'green'
                          }}
                          textStyle={{
                            color: 'blue'
                          }}
                        >
                          <Picker.Item label="A+" value="A+" />
                          <Picker.Item label="A-" value="A-" />
                          <Picker.Item label="B+" value="B+" />
                          <Picker.Item label="B-" value="B-" />
                          <Picker.Item label="AB+" value="AB+" />
                          <Picker.Item label="AB-" value="AB-" />
                          <Picker.Item label="O+" value="O+" />
                          <Picker.Item label="O-" value="O-" />
                        </Picker>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={this.getLocationHandler}
                >
                  <Text style={styles.loginTitle}>Locate Me</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={this.onSubmit}
                >
                  <Text style={styles.signUpTitle}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
