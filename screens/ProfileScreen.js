import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      session: null,
      userID: null,
      error: null,
      isLoaded: false,
      posts: [],
      username: 'User',
      email: '',
      following: 0,
      followers: 0,
      profpic: "../profile-picture-holder.png",
    };
    this.getInfo = this.getInfo.bind(this);

    SecureStore.getItemAsync('session').then(sessionToken => {
      this.setState({
        session: sessionToken
      })
    });
    SecureStore.getItemAsync('userID').then(ID => {
      this.setState({
        userID: ID
      })
      this.getInfo()
    });
  }

  clearState = (e) => {
    this.setState({
      session: ""
    })
  }


    getInfo() {
    fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/users/" + this.state.userID, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.state.session
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            console.log(result.role);
            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.username || "",
              email: result.email || "",
              profpic: 'https://webdev.cse.buffalo.edu' + result.role || "../profile-picture-holder.png",
            });
          }
        },
        error => {
          alert("error!");
        }
      );
  }

  render() {
    if (this.state.profpic == "../profile-picture-holder.png"){

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.pic} source={require("../profile-picture-holder.png")}></Image>
          <Text>Hello, {this.state.email}</Text>
          <Text style={styles.postTitle}>Polls</Text>
        </View>
      </View>
    );
  }else{
    return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{
          uri: this.state.profpic,
          method: 'POST',
          headers: {
            Pragma: 'no-cache',
          },
          body: 'Your Body goes here',
        }} style={styles.pic}>
        </Image>
        <Text style={styles.text}>Hello, {this.state.email}</Text>
        <Text style={styles.postTitle}>Polls</Text>
        <View></View>
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  text: {
    color: "black",
    marginTop: '3%',
  },
  profile: {
    backgroundColor: 'white',
    width: '90%',
    alignItems: 'center'
  },
  pic: {
    marginTop: '3%',
    height: '45%',
    width: '45%',
    borderRadius: 400/2
  },
  postTitle: {
    color: 'black',
    marginTop: "10%",
    marginRight: "80%",
    fontWeight: 'bold'
  }
});
