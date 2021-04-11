import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

import * as SecureStore from 'expo-secure-store';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)

    // Initialize our login state
    this.state = {
      email: '',
      password: ''
    }
  }
  onSubmit = () => {
    const { email, password } = this.state;

    fetch("https://webdev.cse.buffalo.edu/hci/elmas/api/api/auth/signup", {
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
      console.log(`Registering`);

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
