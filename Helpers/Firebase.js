import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ImagePicker } from 'expo';

import * as firebase from 'firebase';
import 'firebase/storage';

//
// Don't forget to initialize firebase!!!
//

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    textAlign: "center",
    maxWidth: 150
  }
});

class FirebaseStorageUploader extends Component {

  uriToBlob = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase = (blob) => {

    return new Promise((resolve, reject)=>{

      var storageRef = firebase.storage().ref();

      storageRef.child('uploads/photo.jpg').put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{

        blob.close();

        resolve(snapshot);

      }).catch((error)=>{

        reject(error);

      });

    });


  }


  handleOnPress = () => {

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images"
    }).then((result)=>{

      if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        return uriToBlob(uri);

      }

    }).then((blob)=>{

      return uploadToFirebase(blob);

    }).then((snapshot)=>{

      console.log("File uploaded");

    }).catch((error)=>{

      throw error;

    });

  }

  render () {

    var button = <View
      style={[styles.button]}
      onPress={this.handleOnPress}
    >
      <Text>Choose Photo</Text>
    </View>

    return (button);

  }

}

export default FirebaseStorageUploader;

RNFetchBlob.fetch('POST', 'https://content.dropboxapi.com/2/files/upload', {
    Authorization : "Bearer access-token...",
    'Dropbox-API-Arg': JSON.stringify({
      path : '/img-from-react-native.png',
      mode : 'add',
      autorename : true,
      mute : false
    }),
    'Content-Type' : 'application/octet-stream',
    // here's the body you're going to send, should be a BASE64 encoded string
    // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
    // The data will be converted to "byte array"(say, blob) before request sent.
  }, base64ImageString)
  .then((res) => {
    console.log(res.text())
  })
  .catch((err) => {
    // error handling ..
  })
  /*export const uriToBlob2 = (photo) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          // return the blob
          //Alert.alert("uriToBlob failed")
          Alert.alert(xhr.response)
          resolve(xhr.response);

        };

        xhr.onerror = function() {
          // something went wrong
          Alert.alert("uriToBlob failed")
          reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', photo, true);

        xhr.send(null);
      });
    }
    export const uploadToFirebase = (blob) => {
      return new Promise((resolve, reject)=>{
        var storageRef = FireBase.storage().ref();

        storageRef.child('u7rHv6EXfldDt1oQoC3lKmCLRZX2/photo.jpg').put(blob, {
          contentType: 'image/jpeg'
        }).then((snapshot)=>{
          blob.close();
          resolve(snapshot);
        }).catch((error)=>{
          reject(error);
        });
      });
    }*/