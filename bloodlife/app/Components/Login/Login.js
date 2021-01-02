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
import { login } from '../../redux/actions/userAction'; 
import { bindActionCreators } from 'redux';

import { TextField } from 'react-native-material-textfield';
import { styles } from './styles';

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      phone: '',
      password: '',
      // bloodGroup: 'A+',
      // phoneNo: '',
      // currentLocation: {
      //   latitude: 37.7900352,
      //   longitude: -122.4013726,
      //   latitudeDelta: 0.0122,
      //   longitudeDelta:
      //     (Dimensions.get('window').width / Dimensions.get('window').height) *
      //     0.0122
      // }
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
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
        Alert.alert('Location traced successfully!');
      },
      err => {
        console.log(err);
        alert('Fetching the Position failed, please pick one manually!');
      }
    );
  };

  onSubmit() {
    const {
      // name,
      phone,
      password,
      // bloodGroup,
      // currentLocation,
      // phoneNo
    } = this.state;
    //console.log(name,phone,password,bloodGroup,currentLocation.latitude,currentLocation.longitude);
    const newUser = {
      // name,
      phone,
      password,
      // bloodGroup,
      // currentLocation,
      // phoneNo
    };
    console.log(newUser);
    
    this.props.login(newUser, this)  
  }

  render() {


    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground style={styles.imageContainer}>
            <View style={styles.childContainer}>
              <Text style={styles.heading}> Log In </Text>
              <View style={{ width: '90%' }}>
                

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
                    
                  </View>
                </View>
               
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={this.onSubmit}
                >
                  <Text style={styles.signUpTitle}>Log in</Text>
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
  // console.log(state)
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch); 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
