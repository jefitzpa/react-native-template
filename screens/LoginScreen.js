import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import * as SecureStore from 'expo-secure-store';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    // Initialize our login state
    this.state = {
      email: '',
      password: ''
    }
  }
  // On our button press, attempt to login
  // this could use some error handling!
  onSubmit = () => {
    const { email, password } = this.state;

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
  }
  render() {
    const { email, password } = this.state

    // this could use some error handling!
    // the user will never know if the login failed.
    return (
      <View style={styles.container}>
        <View style={styles.formcontainer}>
        <Text style={styles.loginText}>Sign In</Text>
        <Text>  Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          value={email}
          textContentType="emailAddress"
        />
        <Text>  Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
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
    );
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
    height: 60,
    backgroundColor: "lightgray",
    borderWidth: 6,
    marginBottom: 20,
    borderColor: "white"
  },
  loginSubmit: {
    fontSize: 40, color: '#000000', textAlign: "center",
  },
  RegisterAsk: {
    fontSize: 20, color: '#000000', textAlign: "center"
  }
});
