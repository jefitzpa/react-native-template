import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import HomeScreen from './HomeScreen.js'

import { MonoText } from '../components/StyledText';

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      postmessage: "",
      poll_option_1: "",
      poll_option_2: "",
      post_text: "",
      poll_category: "mobile",
      vote_first: 0,
      vote_second: 0,
      likes: 0,
      redir: false,
      session: null
    };
    SecureStore.getItemAsync('session').then(sessionToken => {
      this.setState({
        session: sessionToken
      })
    });
    SecureStore.getItemAsync('userID').then(ID => {
      this.setState({
        userID: ID
      })
    });
  }

  onSubmit = () => {
    fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/posts", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.state.session
      },
      body: JSON.stringify({
        authorID: this.state.userID,
        content: "choice1:" + this.state.poll_option_1 + ",choice2:" + this.state.poll_option_2 + ",votes1:, votes2:, comments:0, user:" + this.state.userID,
        thumbnailURL: "",
        type: JSON.stringify({"tag": this.state.poll_category, "images": []})
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status,
            redir: true,
            poll_option_1: "",
            poll_option_2: "",
          });

        },
        error => {
          console.log(error)
          alert("error!");
        }
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.createpost}>
          <Text style={styles.textTitle}>Create Poll</Text>
          <View style={styles.inputContainer}>
            <Text>Option 1</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ poll_option_1: text })}
              textContentType="name"
              value={this.state.poll_option_1}
            />
            <Text>Option 2</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ poll_option_2: text })}
              textContentType="name"
              value={this.state.poll_option_2}
            />
            <TouchableOpacity
            onPress={() => this.onSubmit()}
            style={styles.loginSubmit}>
            <Text style={styles.loginSubmit}>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 30
  },
  createpost: {
    backgroundColor: 'white',
  },
  textTitle: {
    color: "black",
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    height: 45,
    backgroundColor: "lightgray",
    marginBottom: 10,
    paddingLeft: 6
  },
  inputContainer: {
    borderColor: "white",
    borderWidth: 6
  },
  loginSubmit: {
    fontSize: 40, color: '#000000', textAlign: "center",
  },
});
