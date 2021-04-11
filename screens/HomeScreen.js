import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor() {
    super()

    console.log("HI! I need some state here so I can show lots of posts!")
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Image style={styles.cardprof} source={require("../profile-picture-holder.png")}></Image>
          <View style={styles.cardtext}>
            <Text style={styles.cardTitle}>New Pet</Text>
            <Text style={styles.cardDescription}>Should we get a cat or a dog</Text>
          </View>
          </View>
          <View style={styles.card}>
            <Image style={styles.cardprof} source={require("../profile-picture-holder.png")}></Image>
            <View style={styles.cardtext}>
              <Text style={styles.cardTitle}>Graphics Card</Text>
              <Text style={styles.cardDescription}>Is the NVIDIA 3090 worth the wait</Text>
            </View>
            </View>
            <View style={styles.card}>
              <Image style={styles.cardprof} source={require("../profile-picture-holder.png")}></Image>
              <View style={styles.cardtext}>
                <Text style={styles.cardTitle}>New Car</Text>
                <Text style={styles.cardDescription}>Should I get a ford or a Chevy</Text>
              </View>
              </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 20,
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
   fontSize: 12
 },
 cardprof: {
   height: "100%",
   width: "12%",
   marginRight: 10
 }
});
