
import React, { Component, useState } from 'react';
import { RefreshControl, ImageBackground, TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import type {Node} from 'react';
import '../Helpers/Global.js';
import PurchaseScreen from './Purchases/PurchaseScreen';
import {test} from '../index.js';

export default class SubHeader extends Component {
GLOBAL = require('../Helpers/Global');
constructor(props) {
    super(props);
    this.state = {
        Trips: global.TripSwitch,
        refreshing: false,
        type: global.title
    }
  }

  onPress1 = () => {

    if(global.TripSwitch){
        global.TripSwitch = false;
        global.title = "\t\tAll Purchases";
        //PurchaseScreen.props.Trips.setState({Trips: false});
        //PurchaseScreen.props.setState({Trips: false});
        //PurchaseScreen.forceUpdate();
//this.forceUpdate();
    }
    else{
        global.TripSwitch = true;
        global.title = "\t\t\t\t\tTrips Only";
        //PurchaseScreen.props.Trips.setState({Trips: true});
        //PurchaseScreen.props.setState({Trips: true});
        //PurchaseScreen.forceUpdate();
        //this.forceUpdate();
    }
    this.setState({Trips: global.TripSwitch});
    this.setState({type: global.title});
   // this._onRefresh();
  }

  render() {
    return (
   <ImageBackground
             accessibilityRole={'image'}
             //source={require('./logo.png')}
             style={(this.state.Trips === false ? styles.backgroundPurchase : styles.backgroundTrips)}
             imageStyle={styles.logo}>
         <View style={{flex: 1, flexDirection: 'row'}}>
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
                 switchOn={this.state.Trips}
                 onPress={this.onPress1}
                 circleColorOn='white'
                 circleColorOff='grey'
                 duration={500}
           />
           </View>
         </View>
        </ImageBackground>

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
