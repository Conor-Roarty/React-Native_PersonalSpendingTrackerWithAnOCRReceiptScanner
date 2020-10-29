import React, { Component, useState } from 'react'
import {
  Alert,
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

export default class AnalyticsTrips extends Component {

     constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(['Deprecation warning:','Warning: componentWillReceiveProps']);
        this.bool = this.props.SubHeader;
        this.state = {
            email: FireBase.auth().currentUser.email.split("@"),
            userID:  FireBase.auth().currentUser.uid.toString(),
            today: moment().toDate('MM/DD/YYYY'),
            overBudget: 0,
            underBudget: 0,
            onBudget: 0,
            test: false,
            refresh: false,
            categoryData: ['Food', 'Fuel', 'Social', 'Bill', 'Other', 'Custom'],
            Food: 0.00,
            Fuel: 0.00,
            Social: 0.00,
            Bills: 0.00,
            Other: 0.00,
            Custom: 0.00,
            adviceMsg: "No Advice To Give Yet",

            Trips: global.TripSwitch,
            weeklyData: {
                labels: ['Dinner', 'Lunch', 'Breakfast', 'Sweets', 'Fuel', 'Groceries', 'Social', 'Electrical', 'Bills', 'Other...'],
                datasets: [
                  {
                    data: [40, 30, 20, 10, 5, 20, 25, 22, 10, 50],
                    strokeWidth: 2, // optional width, good to be spaced for our condensed app
                  },
                ],
             },
        }
     }
     btnAddNewPurchase = () => {
        this.props.navigation.navigate('PurchaseEntryScreen');
     }
     refreshPage() {
       this.setState({refresh: true});

       this.setState({refresh: false});
     }
    componentDidMount() {
        this.getCategories();
    }
    getCategories = () => {
          var ref = FireBase.database().ref(this.state.userID + '/Purchase');
          ref.once('value').then(snapshot => {
                     snapshot.forEach((child) => {
                        // this.state.categoryData.forEach((entry) => {
                         if(child.val().Category.toString() === 'Dinner'){
                            var din = Number(child.val().Total);
                            if(din != 'undefined' && din != null){
                                din = din + Number(this.state.Food);
                                this.setState({ Food: din});
                            }
                         }else if(child.val().Category.toString() === 'Lunch'){
                            var lun = Number(child.val().Total);
                            if(lun != 'undefined' && lun != null){
                                lun = lun + Number(this.state.Food);
                                this.setState({ Food: lun});
                            }
                         }else if(child.val().Category.toString() === 'Breakfast'){
                            var b = Number(child.val().Total);
                            if(b != 'undefined' && b != null){
                                b = b + Number(this.state.Food);
                                this.setState({ Food: b});
                            }
                        }else if(child.val().Category.toString() === 'Sweets'){
                            var s = Number(child.val().Total);
                            if(s != 'undefined' && s != null){
                                s = s + Number(this.state.Food);
                                this.setState({ Food: s});
                            }
                        }else if(child.val().Category.toString() === 'Fuel'){
                            var f = Number(child.val().Total);
                            if(f != 'undefined' && f != null){
                                f = f + Number(this.state.Fuel);
                                this.setState({ Fuel: f})
                            }
                        }else if(child.val().Category.toString() === 'Groceries'){
                            var groc = Number(child.val().Total);
                            if(groc != 'undefined' && groc != null){
                                groc = groc + Number(this.state.Food);
                                this.setState({ Food: groc});
                            }
                        }else if(child.val().Category.toString() === 'Social'){
                            var social = Number(child.val().Total);
                            if(social != 'undefined' && social != null){
                                social = social + Number(this.state.Social);
                                this.setState({ Social: social});
                            }
                        }else if(child.val().Category.toString() === 'Retail'){
                            var re = Number(child.val().Total);
                            if(re != 'undefined' && re != null){
                                re = re + Number(this.state.Social);
                                this.setState({ Social: re});
                            }
                        }else if(child.val().Category.toString() === 'Electrical'){
                            var lun = Number(child.val().Total);
                            if(lun != 'undefined' && lun != null){
                                lun = lun + Number(this.state.Bills);
                                this.setState({ Bills: lun});
                            }
                        }else if(child.val().Category.toString() === 'Bills'){
                            var lun = Number(child.val().Total);
                             if(lun != 'undefined' && lun != null){
                                lun = lun + Number(this.state.Bills);
                                this.setState({ Bills: lun});
                            }
                        }else if(child.val().Category.toString() === 'Other...'){
                            var lun = Number(child.val().Total);
                            if(lun != 'undefined' && lun != null){
                                lun = lun + Number(this.state.Other);
                                this.setState({ Other: lun});
                            }
                        }else{
                            var lun = Number(child.val().Total);
                            if(lun != 'undefined' && lun != null){
                              lun = lun + Number(this.state.Custom);
                              this.setState({ Custom: lun});
                            }
                        }
                  })
                  var line = {
                    labels: ['Food', 'Fuel', 'Social', 'Bill', 'Other', 'Custom'],
                    datasets: [{
                        data: [Number(this.state.Food),Number(this.state.Fuel),Number(this.state.Social),Number(this.state.Bills),Number(this.state.Other),Number(this.state.Custom)],
                        strokeWidth: 2, // optional
                    }],
                  };
                  this.setState({ weeklyData: line})
                  if((Number(this.state.Food) > Number(this.state.Fuel)) && (Number(this.state.Food) > Number(this.state.Social)) && (Number(this.state.Food) > Number(this.state.Bills)) && (Number(this.state.Food) > Number(this.state.Other)) && (Number(this.state.Food) > Number(this.state.Custom))){
                      this.setState({adviceMsg: "\tSeems Like You Spend A Lot On Food.\n\tMaybe Try Some Cheaper Establishments or Cook At Home More"});
                  }else if((Number(this.state.Fuel) > Number(this.state.Food)) && (Number(this.state.Fuel) > Number(this.state.Social)) && (Number(this.state.Fuel) > Number(this.state.Bills)) && (Number(this.state.Fuel) > Number(this.state.Other)) && (Number(this.state.Fuel) > Number(this.state.Custom))){
                      this.setState({adviceMsg: "\tSeems Like You Spend A Lot On Fuel.\n\tIf You Travel For Work Try Working From Home Or Log This As A Travel Expense If You Are Reimbursed\n\tOtherwise, Have You Heard Of Red Diesel, I Know A Guy"});
                  }else if((Number(this.state.Social) > Number(this.state.Fuel)) && (Number(this.state.Social) > Number(this.state.Food)) && (Number(this.state.Social) > Number(this.state.Bills)) && (Number(this.state.Social) > Number(this.state.Other)) && (Number(this.state.Social) > Number(this.state.Custom))){
                      this.setState({adviceMsg: "\tSeems Like You Spend A Lot Socially.\n\tMaybe Try Staying In A Night or Switch To Cheaper Activities or Drinks."});
                  }else if((Number(this.state.Bills) > Number(this.state.Food)) && (Number(this.state.Bills) > Number(this.state.Social)) && (Number(this.state.Bills) > Number(this.state.Food)) && (Number(this.state.Bills) > Number(this.state.Other)) && (Number(this.state.Bills) > Number(this.state.Custom))){
                       this.setState({adviceMsg: "\tSeems Like You Spend A Lot On Bills.\n\tMaybe Try Some Cheaper Alternatives i.e. Different TV Provider.\n\tIf These Bills Are Unavoidable, i.e. Mortgage, just deduct it from you total budget and don't log it here so you can get better analytical feedback"});
                  }else if((Number(this.state.Other) > Number(this.state.Fuel)) && (Number(this.state.Other) > Number(this.state.Food)) && (Number(this.state.Other) > Number(this.state.Bills)) && (Number(this.state.Other) > Number(this.state.Food)) && (Number(this.state.Other) > Number(this.state.Custom))){
                      this.setState({adviceMsg: "\tSeems Like You Spend A Lot On Unknown Items.\n\tYou Can Categories To This App In Settings if you need"});
                  }else if((Number(this.state.Custom) > Number(this.state.Fuel)) && (Number(this.state.Custom) > Number(this.state.Food)) && (Number(this.state.Custom) > Number(this.state.Bills)) && (Number(this.state.Custom) > Number(this.state.Food)) && (Number(this.state.Other) > Number(this.state.Custom))){
                      this.setState({adviceMsg: "\tSeems Like You Spend A Lot In Your Own Categories.\n\tGood For You Taking Control!\n\tTo Get Feedback Make Sure To Still Add To Other Categories As Well"});
                  }
          });
    };
   render() {
      return (
          <View>
          <ScrollView>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                  <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <SubHeader />
                  </ScrollView>
                </SafeAreaView>

                <Text style={styles.spendingTitleGrey}>{"\tWelcome To Our Analytics, "+ this.state.email[0] +""}</Text>
                <Text style={styles.spendingTextGrey}>{"\tThis can show you where you spent your money and how to improve on personal spending"}</Text>
                <View style={{flex: 0.25, flexDirection: 'row'}}><Text style={styles.gaugeText}>{""}</Text></View>
              <View>
                    <Text style={styles.graphTitleText} >
                      {"\tSpending Per Category"}
                    </Text>
                    <BarChart
                      data={this.state.weeklyData}
                      width={Dimensions.get('window').width - 10}  // adaptable to all devices
                      height={220}
                      yAxisLabel={'£'}
                      chartConfig={{
                        backgroundColor: 'black',
                        backgroundGradientFrom: '#87CEFA',
                        backgroundGradientTo: '#00008B',
                        decimalPlaces: 2, // optional, defaults to 2dp anyway but we want to be sure for our money
                        color: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        }
                      }}
                      style={{
                        marginVertical: 8,
                        alignItems: 'center',
                        borderRadius: 16,
                      }}
                    />
              </View>
          </ScrollView>
          <Text style={styles.spendingTitleGrey}>{"" + this.state.adviceMsg + ""}</Text>
        </View>
      )
   }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
   gauge: {
      position: 'absolute',
      width: 100,
      height: 160,
      alignItems: 'center',
      justifyContent: 'center',
    },
    graphTitleText: {
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: 22
    },
    gaugesText: {
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: 16,
      textAlign:'center'
    },
    gaugeText: {
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: 16,
      textAlign:'center',
      fontWeight: "bold"
    },
        gaugeTextMedium: {
              backgroundColor: 'transparent',
              color: '#000',
              fontSize: 16,
              textAlign:'center'
            },
    gaugeTextSmall: {
          backgroundColor: 'transparent',
          color: '#000',
          fontSize: 14,
          textAlign:'center'
        },
    welcomeText: {
      backgroundColor: '#F8F8F8',
      color: '#000',
      fontSize: 22,
    },
    spendingText: {
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: 18,
    },
    spendingTitleGrey: {
      backgroundColor: '#F8F8F8',
      color: '#000',
      fontSize: 20,
      borderColor: 'black',
      textAlign: 'center'
    },
    spendingTextGrey: {
      backgroundColor: '#F8F8F8',
      color: '#000',
      fontSize: 18,
      fontWeight: '900',
      borderColor: 'black',
      textAlign: 'center'

    },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  Legend: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    paddingLeft: 20,
    textAlign: 'left',
  },
    btn: { width: 100, height: 30, justifyContent:'center', backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: "bold" },
});
