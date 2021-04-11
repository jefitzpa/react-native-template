import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default class SettingsScreen extends React.Component {
  constructor() {
    super()

    console.log("HI! I need some state here so I can show lots of posts!")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Coming Soon</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    color: "white"
  }
});
