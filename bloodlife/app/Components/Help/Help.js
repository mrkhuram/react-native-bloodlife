import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Picker,
  Dimensions,
  Alert,
  Linking, Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import { TextField } from 'react-native-material-textfield';
// import MapView from 'react-native-maps';
import call from 'react-native-phone-call';
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import GetLocation from 'react-native-get-location'


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

class HelpScreen extends Component {
  static navigationOptions = {
    header: null
  };
  data = [{
    value: '1',
  }, {
    value: '3',
  }, {
    value: '5',
  }, {
    value: '7',
  }, , {
    value: '9',
  }];

  state = {
    latitude: 37.421998333333335,
    longitude: -122.08400000000002,
    latitudeDelta: 0.0122,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.0122,
    bloodGroup: 'A+',
    visible: false
  };
  constructor() {
    super();
    this.state = {
      nearUsers: [],
      bloodGroup: 'A+',
      latitude: 31.411930,
      longitude: 73.108047,
      latitudeDelta: 0.0322,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
      // findcurrentLocation: {
      //   latitude: 37.7900352,
      //   longitude: -122.4013726,
      //   latitudeDelta: 0.0122,
      //   longitudeDelta:
      //     (Dimensions.get('window').width / Dimensions.get('window').height) *
      //     0.0122
      // }
    };
  }

  componentwillMount() { }

  nearLocations = () => {

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);

        this.setState({
          latitude: location.latitude,
          longitude: location.longitude
        });


        // 'https://blood-life.herokuapp.com/getnearestlocations',

        let body = {
          distance: this.state.distance,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          blood_group: this.state.bloodGroup
        }

        axios.post('http://10.0.2.2:9090/getnearestlocations', body)
          .then(response => {
            // console.log(response.data);
            console.log("at 132 in help BEFORE RENDER");

            this.setState({
              nearUsers: response.data

            });
          })
          .catch(e => {
            console.log('same lat lng error' + e);
            return false;
          });

        //Alert.alert(this.state.findcurrentLocation.latitude.toString());
      },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    // Alert.alert(this.state.nearUsers.toString());
  };

  smsHandler = () => {
    const { nearUsers, latitude, longitude } = this.state;
    // alert(nearUsers.length);
    // alert(latitude.toString() + 'lng' + longitude.toString());
    AsyncStorage.getItem("token", (err, item) => {

      this.state.nearUsers ? this.state.nearUsers.map((user, index) => {


        let userData = JSON.parse(item);
        console.log(user);
        console.log("orr");

        if (!userData) {

          return Alert.alert("Please signup so that we can share your info with others");
        }

        // 'https://blood-life.herokuapp.com/send/sms',
        fetch('http//10.0.2.2:9090/send/sms',

          {
            method: 'POST',
            body: JSON.stringify({
              user: {
                name: user.name,
                phone: user.phone,
                blood_group: user.blood_group
              },
              userPhoneNo: '+' + user.phone
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => {
            Alert.alert(`SMS sent to ${user.name}`);
            return response.json();
          })
          .catch(e => {
            console.log('same lat lng error' + e);
            Alert.alert('Not send SMS');
            return false;
          });

      }) : Alert.alert("No Found");

    });
  };


  // ratingCompleted = rating => {
  //   console.log(`Rating is ${rating}`);

  //   this.setState({
  //     visible: false
  //   })

  // }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Home');
  };

  dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      if (this.state.nearUsers.length > 0) {

        phoneNumber = `tel:${this.state.nearUsers[0].phone}`;
      }
    }
    else {
      if (this.state.nearUsers.length > 0) {

        phoneNumber = `telprompt:${this.state.nearUsers[0].phone}`;
      }
    }

    Linking.openURL(phoneNumber);
  };


  render() {
    // console.log(this.state.nearUsers);
    // Alert.alert(this.state.nearUsers.length.toString());
    return (
      <ScrollView>
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.heading}> Find Blood </Text>
        </View>

        <View style={styles.container}>
          <View
            style={{
              height: 50,
              width: '90%',
              borderWidth: 1,
              marginTop: 15,
              borderColor: 'gray'
            }}
          >
            <TouchableOpacity>
              <Picker
                placeholder="Select the City"
                selectedValue={this.state.bloodGroup}
                onValueChange={itemValue =>
                  this.setState({ bloodGroup: itemValue })
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

          <View style={styles.containerC}>



            <View style={styles.item}>

              <TextField
                style={styles.loginField}
                label='Distance'
                fontSize={20}
                tintColor="red"
                textColor="black"
                baseColor="black"
                lineWidth={1}
                labelPadding={1}
                value={this.state.distance}
                onChangeText={(txt) => {
                  this.setState({
                    distance: txt
                  })
                }}
              />
            </View>
            <View style={styles.item}>

              <TouchableOpacity
                style={styles.findButton}
                onPress={this.nearLocations}
              >
                <Text style={styles.findTitle}>FIND</Text>
              </TouchableOpacity>

            </View>
          </View>


          {/* <MapView
            initialRegion={this.state}
            region={this.state}
            style={styles.map}
            ref={ref => (this.map = ref)}
          >
            {this.state.nearUsers.map((user, index) => {
              return (
                <MapView.Marker key={index} coordinate={user.currentLocation}/>
              )
            })}
// initialRegion={this.state}
          </MapView> */}

          <MapView
            initialRegion={this.state}
            region={this.state}
            style={styles.map}
            ref={ref => (this.map = ref)}

          >
            <Marker
              coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
              title={"You're here now 1."}
              description={"Marker Description Text"}
            />
            <Marker
              coordinate={{
                latitude: 31.381832,
                longitude: 73.093876,
              }}
              title={"You're here now 2."}
              description={"Marker Description Text"}
            />
            {this.state.nearUsers.map((user, index) => {


              return (
                <Marker
                  // onPress={() => {
                  //   const args = {
                  //     number: user.phone || '999', // String value with the number to call
                  //     prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
                  //   };
                  //   call(args).catch(console.error);
                  // }}
                  key={user._id}
                  coordinate={{ latitude: user.coordinates.latitude, longitude: user.coordinates.longitude }}
                  title={user.name}
                  description={"I wants to donate blood."}
                />
              );

            })}
          </MapView>


          <View style={styles.containerC}>
            <View style={styles.item}>
              <TouchableOpacity style={styles.smsButton} onPress={this.smsHandler}>
                <Text style={styles.smsTitle}>Send SMS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <TouchableOpacity style={styles.smsButton} onPress={() => {
                this.dialCall()
                // this.setState({ visible: true });
                // this.props.navigation.navigate('Rating');
              }}>
                <Text style={styles.smsTitle}>Call to</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonOuter}>
            <View style={styles.item}>
              <TouchableOpacity style={styles.smsButton} onPress={this._signOutAsync}>
                <Text style={styles.smsTitle}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}

export default HelpScreen;

const styles = StyleSheet.create({

  containerC: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  },
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  input: {
    width: '90%',
    fontSize: 20,
    padding: 10
  },
  TextInputStyleClass: {
    width: '90%',
    fontSize: 18,
    marginVertical: 20,
    borderWidth: 1,
    height: 100
  },
  heading: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  submitButton: {
    width: '60%',
    alignSelf: 'center',
    borderWidth: 1,
    marginLeft: 20,
    backgroundColor: 'purple',
    borderColor: 'purple',
    marginVertical: 20,
    color: '#fff',
    padding: 10
  },
  submitTitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  findButton: {
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'red',
    marginVertical: 20,
    color: '#fff',
    padding: 10,
    borderRadius: 5
  },
  findTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  smsButton: {
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'red',
    marginVertical: 20,
    color: '#fff',
    padding: 10,
    borderRadius: 5
  },
  smsTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
    // width: '50%'
  },
  logout: {
    padding: 10,
    fontSize: 18
  }
});
