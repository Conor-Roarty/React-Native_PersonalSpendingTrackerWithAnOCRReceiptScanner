import React, { Component, useState } from 'react'
import {
  Alert,
  RefreshControl,
  Button,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  YellowBox,
} from 'react-native';

import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
//GLOBAL = require('../../react-native/Libraries/NewAppScreen/Header');
import moment from "moment";
import Pie from 'react-native-pie';
import * as FireBase from "firebase";
import SubHeader from '../SubHeader';
import AnalyticsTrips from './AnalyticsTrips'
import AnalyticsPersonal from './AnalyticsPersonal'

export default class Analytics extends Component {

     constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(['Deprecation warning:','Warning: componentWillReceiveProps']);
        this.bool = this.props.SubHeader;
        this.state = {
            Trips: global.TripSwitch,
            loading: true,
            refreshing: false
      }
      this.updateSwitch = this.updateSwitch.bind(this);
     }

     updateSwitch() {
        this.setState({ Trips: global.TripSwitch });
     }
     componentDidUpdate(){
     }
     componentDidMount() {
        this.makeRemoteRequest();
     }
     makeRemoteRequest = () => {
        this.updateSwitch();
        this.setState({refreshing: false});
     }
     handleRefresh = () => {
        this.setState(
        {
            refreshing: true
        },
        () => {
            this.makeRemoteRequest();
        });
     };
         renderRefresh = () => {
           if (!this.state.loading) return null;

           return (
             <View
               style={{
                 paddingVertical: 20,
                 borderTopWidth: .75,
                 borderColor: "#CED0CE"
               }}
             >
               <ActivityIndicator animating size="large" />
             </View>
           );
         };

   render() {
      return (
          <ScrollView
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />}
          >
          {this.state.Trips ? <AnalyticsTrips />:<AnalyticsPersonal />}
        </ScrollView>
      )
   }
}
Analytics.navigationOptions = {
  title: 'Analytics',
  header: null,
};