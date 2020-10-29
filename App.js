import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons";

import AppNavigator from './Navigation/AppNavigator';

import PurchaseScreen from './Screens/Purchases/PurchaseScreen'
import LogAPurchase from './Screens/Purchases/PurchaseEntry'
import Loading from './Screens/Login/Loading'
import Register from './Screens/Login/Register'
import Login from './Screens/Login/Login'
import Home from './Screens/Home/HomeScreen'
import TripsEntry from './Screens/Trips/TripsEntry';

import * as FireBase from "firebase";

export default class App extends React.Component {
    render() {
        const FireBaseConfig = {
              apiKey: "AIzaSyBoZrOAM9Mg5PQdZSm6otOkyhXWyZQwrZ4",
              authDomain: "expenseless1.firebaseapp.com",
              databaseURL: "https://expenseless1.firebaseio.com",
              projectId: "expenseless1",
              storageBucket: "expenseless1.appspot.com",
              messagingSenderId: "936004673841",
              appId: "1:936004673841:web:acfafa59ae20f8b7411010",
              measurementId: "G-PW31TZ26TE"
            };
            if (!FireBase.apps.length) {
                FireBase.initializeApp(FireBaseConfig);
            }
        return (
          <View style={styles.container}>
             {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
             <AppNavigator />
          </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});