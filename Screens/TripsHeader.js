
import React, { Component, useState } from 'react';
import { RefreshControl, ImageBackground, TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import type {Node} from 'react';
import '../Helpers/Global.js';
import {test} from '../index.js';

export default class SubHeader extends Component {
GLOBAL = require('../Helpers/Global');
constructor(props) {
    super(props);
    this.state = {
        Trips: global.TripSwitch,
        refreshing: false,
        type: "\t\t\t\t\tTrips Only"
    }
  }

  render() {
    return (
         <View style={styles.backgroundTrips}>
             <View style={{flex: 6, flexDirection: 'column'}}>
               <Text style={styles.titleText}>{this.state.type}</Text>
              </View>
           <View style={{flex: 1, flexDirection: 'column'}}>
           <SwitchToggle
               containerStyle={{
                    marginTop: 5,
                    width: 60,
                    height: 30,
                    borderRadius: 27.5,
                    borderColor: 'black',
                    padding: 5,
                 }}
                 backgroundColorOff='white'
                 backgroundColorOn='grey'
                 circleStyle={{
                   width: 20,
                   height: 20,
                   borderRadius: 27.5,
                   backgroundColor: 'red', // rgb(102,134,205)

                 }}
                 switchOn={true}
                 circleColorOn='white'
                 circleColorOff='grey'
                 duration={500}
           />
           </View>
         </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundPurchase: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 32,
    backgroundColor:'#c8e1ff',
  },
    backgroundTrips: {
      flex: 1,
      flexDirection: 'row',
      paddingBottom: 20,
      paddingTop: 20,
      paddingHorizontal: 32,
      backgroundColor:'#FFFACD',
    },
  logo: {
    opacity: 0.9,
    overflow: 'visible',
    resizeMode: 'cover',
    marginLeft: -128,
    marginBottom: -450,
  },
  titleText: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'left',
    color: 'black',
  },
  subtext: {
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'left',
      color: 'black',
    },
});
