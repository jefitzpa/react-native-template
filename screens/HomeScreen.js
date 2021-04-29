import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
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

    this.loadPosts = this.loadPosts.bind(this);
    this.createPost = this.createPost.bind(this);
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

  loadPosts() {
  let url = "https://webdev.cse.buffalo.edu/hci/elmas/api/api/posts";

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
          console.log(result)
        }
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
        console.log(error)
      }
    );
}

createPost(posts) {
  for (var post in posts){
  console.log(post)
  let content = post.content;
  let likes = 0;
  let comments = post.commentCount;

  if (content.length < 2) {
    content[0] = "Undefined"
    content[1] = "Undefined"
  }

 return (
   <View style={styles.card}>
     <Image style={styles.cardprof} source={require("../profile-picture-holder.png")}></Image>
     <View style={styles.cardtext}>
       <Text style={styles.cardTitle}>{content}</Text>
     </View>
     </View>
 )
}
}

  render() {
    this.loadPosts();
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <Image style={styles.cardprof} source={require("../profile-picture-holder.png")}></Image>
            <View style={styles.cardtext}>
              <Text style={styles.cardTitle}>Graphics Card</Text>
              <Text style={styles.cardDescription}>Is the NVIDIA 3090 worth the wait</Text>
            </View>
            </View>
            {
              this.createPost(this.state.posts)
            }
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
