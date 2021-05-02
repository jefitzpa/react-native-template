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
  }

    componentDidMount() {
      SecureStore.getItemAsync('session').then(sessionToken => {
        this.setState({
          session: sessionToken
        })
        SecureStore.getItemAsync('userID').then(ID => {
          this.setState({
            userID: ID
          })
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
                  this.setState({
                    // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                    // try and make the form component uncontrolled, which plays havoc with react
                    username: result.username || "",
                    email: result.email || "",
                    profpic: 'https://webdev.cse.buffalo.edu' + result.role || "../profile-picture-holder.png",
                  });
                  let url = "https://webdev.cse.buffalo.edu/hci/elmas/api/api/posts?authorID=" + this.state.userID;

                  fetch(url, {
                    method: "get",
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+ this.state.session
                    },

                  })
                    .then(res => res.json())
                    .then(
                      result => {
                        if (result) {
                          this.setState({
                            isLoaded: true,
                            posts: result[0]
                          });
                        }
                      },
                      error => {
                        this.setState({
                          isLoaded: false,
                          error
                        });
                      }
                    );
                }
              },
              error => {
                alert("error!");
              }
            );
        });
      });
  }

  createPost(post){
      let content = post['content'].split(',');
      let choices = content[0].replace('choice1:', '') + " vs " + content[1].replace('choice2:', '');
      let data = String(post['id']) + " - " + String(post['id'] - Math.floor(Math.random() * 10));
      return (
        <View style={styles.card}>
          <Image style={styles.cardprof} source={require("../profile-picture-holder.png")}></Image>
          <View style={styles.cardtext}>
            <Text style={styles.cardTitle}>{choices}</Text>
            <Text style={styles.cardDescription}>{data}</Text>
            <Text style={styles.cardDescription}>{content[4]}</Text>
            </View>
        </View>
      );
  }
  render() {
    if (this.state.profpic == "../profile-picture-holder.png"){

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.pic} source={require("../profile-picture-holder.png")}></Image>
          <Text>Hello, {this.state.email}</Text>
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
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
   width: '100%',
   shadowColor: 'gray',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 2,
   elevation: 2,
   backgroundColor: 'white',
   padding: 10,
   marginBottom: 10,
   flexDirection: "row"
 },
 cardtext: {

 },
 cardTitle: {
   fontSize: 20,
   marginBottom: 10
 },
 cardDescription: {
   fontSize: 12,
 },
 cardprof: {
   height: "100%",
   width: "18%",
   marginRight: 10
 }
});
