import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import RegisterScreen from './RegisterScreen.js'

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    // Initialize our login state
    this.state = {
      username: '',
      email: '',
      password: '',
      pageType:'login'
    }
  }
  // On our button press, attempt to login
  // this could use some error handling!
  onSubmit = () => {
    const { email, password, username } = this.state;

    if (this.state.pageType == 'login'){
    fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/auth/login", {
      method: "POST",
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(`Logging in with session token: ${json.token}`);

      // enter login logic here
      SecureStore.setItemAsync('session', json.token).then(() => {
        this.props.route.params.onLoggedIn();
      });
    })
    .catch(exception => {
        console.log("Error occured", exception);
        // Do something when login fails
    })
  }else{
    fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/auth/signup", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password
    })
  })
    .then(response => response.json())
    .then(json => {
      console.log(`Logging in with session token: ${json.token}`);

      // enter login logic here
      SecureStore.setItemAsync('session', json.token).then(() => {
        this.props.route.params.onLoggedIn();
      });
    })
    .catch(exception => {
        console.log("Error occured", exception);
        // Do something when login fails
    })
  }
  }

  onRegister = () => {
    this.setState({pageType: 'register'})
  }
  onBack = () => {
    this.setState({pageType: 'login'})
  }

  render() {
    const { email, password, username } = this.state

    // this could use some error handling!
    // the user will never know if the login failed.
    if (this.state.pageType == 'login'){
    return (
      <View style={styles.container}>
        <View style={styles.formcontainer}>
        <Text style={styles.loginText}>Sign In</Text>
        <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          value={email}
          textContentType="emailAddress"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        </View>
        <TouchableOpacity
        onPress={() => this.onRegister()}
        style={styles.resisterAsk}>
        <Text style={styles.RegisterAsk}>New? Register Here</Text>
      </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.onSubmit()}
        style={styles.loginSubmit}>
        <Text style={styles.loginSubmit}>Submit</Text>
      </TouchableOpacity>
      </View>
      </View>
    );}else{
      return (
        <View style={styles.container}>
          <View style={styles.formcontainer}>
          <Text style={styles.loginText}>Register</Text>
          <View style={styles.inputContainer}>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ username: text })}
            value={username}
            textContentType="name"
          />
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ email: text })}
            value={email}
            textContentType="emailAddress"
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            textContentType="password"
            secureTextEntry={true}
          />
          <Text>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            textContentType="password"
            secureTextEntry={true}
          />
          </View>
          <TouchableOpacity
          onPress={() => this.onBack()}
          style={styles.RegisterAsk}>
          <Text style={styles.RegisterAsk}>Return to Login</Text>
        </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.onSubmit()}
          style={styles.loginSubmit}>
          <Text style={styles.loginSubmit}>Submit</Text>
        </TouchableOpacity>
        </View>
        </View>
      );
    }
  }
}

// Our stylesheet, referenced by using styles.container or styles.loginText (style.property)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 30
  },
  formcontainer:{
    backgroundColor: "white"
  },
  loginText: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
    color: "black"
  },
  input: {
    height: 45,
    backgroundColor: "lightgray",
    marginBottom: 10,
    paddingLeft: 6
  },
  loginSubmit: {
    fontSize: 40, color: '#000000', textAlign: "center",
  },
  RegisterAsk: {
    fontSize: 20, color: '#000000', textAlign: "center"
  },

  inputContainer: {
    borderColor: "white",
    borderWidth: 6
  }
});
