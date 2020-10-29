import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as FireBase from "firebase";

export default class Loading extends React.Component {
componentDidMount() {
    FireBase.auth().onAuthStateChanged(user => {
      if(FireBase.auth().currentUser == null){
        this.props.navigation.navigate(user ? 'Login' : 'Register')
      } else {
        this.props.navigation.navigate('Main')
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})