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

export default class AnalyticsPersonal extends Component {

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
        weeklyBudget: 0.00,
        monthlyBudget: 0.00,
        currentTrip: false,
        tripBudget: 0.00,
        tripTotalSpent: 0.00,
        tripPercent: 0,
        weekPercent: 0,
        monthPercent: 0,
        percentOverBudget: 0,
        percentUnderBudget: 0,
        percentOnBudget: 0,
        totalTrips: 0,
        adviceMsgTrips: "No Advice On Trips Yet!",
        Trips: global.TripSwitch,
        yearlyData: {
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug','Sept','Oct','Nov','Dec'],
                      datasets: [
                        {
                          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          strokeWidth: 2, // optional width, good to be spaced for our condensed app
                        },
                      ],
                   },
        Jan: 0.00, Feb: 0.00, Mar: 0.00, Apr: 0.00, May: 0.00, June: 0.00, July: 0.00, Aug: 0.00, Sept: 0.00, Oct: 0.00, Nov: 0.00, Dec: 0.00,
        weeklyData: {
                    labels: ['Fully Paid', 'Partial Paid', 'Not Paid', 'Leisure', 'Other'],
                    datasets: [
                      {
                        data: [40, 30, 20, 10, 5],
                        strokeWidth: 2, // optional width, good to be spaced for our condensed app
                      },
                    ],
                 },
        Mon: 0.00, Tues: 0.00, Wed: 0.00, Thurs: 0.00, Fri: 0.00, Sat: 0.00, Sun: 0.00,
        TodaysTotal: 0.00,
        WeeksTotal: 0.00,
        MonthsTotal: 0.00,
        YearsTotal: 0.00,
      }

      trip = SubHeader.props;
     }
     btnAddNewPurchase = () => {
        this.props.navigation.navigate('PurchaseEntryScreen');
     }
     refreshPage() {
       this.setState({refresh: true});

       this.setState({refresh: false});
     }
    componentDidMount() {
        this.pieCharts();
        this.getBudgets();
    }
    getBudgets = () => {
        var weeklyB = 0.00;
        var monthlyB = 0.00;
        var tripB = 0.00;
        var ref = FireBase.database().ref(this.state.userID + '/UserDetails');
        ref.once('value').then(snapshot => {
            snapshot.forEach((child) => {
                if(child.key.toString() === "WeeklyBudget"){
                    weeklyB = Number(child.val())
                }
                if(child.key.toString() === "MonthlyBudget"){
                    monthlyB = Number(child.val())
                }
            });
        }).then(() => {
           this.setState({ weeklyBudget: weeklyB})
           this.setState({ monthlyBudget: monthlyB})
           var weekP = (Number(this.state.WeeksTotal)/Number(this.state.weeklyBudget))*100
           this.setState({ weekPercent: weekP})
           var monthP = (this.state.MonthsTotal / this.state.monthlyBudget)*100
           this.setState({ monthPercent: monthP})
        });

        var current = false;
        var limit = 0.00;
        var spent = 0.00;
        var tripRef = FireBase.database().ref(this.state.userID + '/Trips');
            tripRef.once('value').then(snapshot => {
                snapshot.forEach((child) => {
                    var sHolder = child.val().StartDate.split('-')
                    var Start =sHolder[1] + "/" + sHolder[0] + "/" +sHolder[2]
                    sDate = moment(Start);
                    var eHolder = child.val().EndDate.split('-')
                    var End =eHolder[1] + "/" + eHolder[0] + "/" +eHolder[2]
                    eDate = moment(End);
                    if((sDate.diff(this.state.today, 'days') <= 0) && (eDate.diff(this.state.today, 'days') >= 0)){
                        current = true
                        limit = child.val().Limit
                        spent = child.val().TotalSpent //come back to this, needs handled in adding trip purchase
                    }
                });
            }).then(() => {
                if(current){
                     this.setState({ currentTrip: current})
                     this.setState({ tripBudget: limit})
                     this.setState({ tripTotalSpent: spent})
                     if(Number(this.state.spent) != 0){
                         var TripP = (Number(this.state.tripTotalSpent)/Number(this.state.tripBudget))*100
                         this.setState({ tripPercent: TripP})
                     } else {this.setState({ tripPercent: 0})}
                }
                if((Number(this.state.percentOverBudget) > Number(this.state.percentUnderBudget)) &&
                   (Number(this.state.percentOverBudget) > Number(this.state.percentOnBudget))){
                    this.setState({adviceMsgTrips: "\tSeems Like You Spend A Lot On Food.\n\tMaybe Try Some Cheaper Establishments or Cook At Home More"});
                }else if((Number(this.state.percentUnderBudget) > Number(this.state.percentOnBudget)) &&
                       (Number(this.state.percentUnderBudget) > Number(this.state.percentOverBudget))){
                    this.setState({adviceMsgTrips: "\tSeems Like You Usually Stay Under Budget.\n\tKeep It Up!!"});
                }else if((Number(this.state.percentOnBudget) > Number(this.state.percentUnderBudget)) &&
                         (Number(this.state.percentOnBudget) > Number(this.state.percentOverBudget))){
                    this.setState({adviceMsgTrips: "\tSeems Like You Stay On Budget!\n\tA Great Planner! Be Careful Not To Slip Into The Over Budget Section."});
                }
            })
    };
    pieCharts = () => {
        var ref = FireBase.database().ref(this.state.userID+ '/Trips');
        ref.once('value').then(snapshot => {
                   var over = 0;
                   var under = 0;
                   var onTarget = 0;
                   snapshot.forEach((child) => {
                       var sHolder = child.val().StartDate.split('-')
                       var Start =sHolder[1] + "/" + sHolder[0] + "/" +sHolder[2]
                       sDate = moment(Start);
                       var eHolder = child.val().EndDate.split('-')
                       var End =eHolder[1] + "/" + eHolder[0] + "/" +eHolder[2]
                       eDate = moment(End);

                     if(child.val().Cancelled != true){//exclude cancelled trips as if they have entries they should be excluded
                         if(!((sDate.diff(this.state.today, 'days') > 0) && (eDate.diff(this.state.today, 'days') > 0))){//exclude upcoming trips as they should have no entries

                            if((child.val().TotalSpent + 0.00) <= Number(child.val().Limit - 20.00)){
                                under = under + 1;
                            }
                            if((child.val().TotalSpent + 0.00) >= Number(child.val().Limit + 20.00)){
                                over = over + 1;
                            }
                            if(((child.val().TotalSpent + 0.00) < Number(child.val().Limit + 20.00)) && ((child.val().TotalSpent + 0.00) > Number(child.val().Limit - 20.00))){
                                onTarget = onTarget + 1;
                            }
                         }
                     }
              });
             if(onTarget != 0 && onTarget != null && onTarget != "" && onTarget != undefined && onTarget != "undefined"){
                this.setState({ onBudget: onTarget})
             }
             if(under != 0 && under != null && under != "" && under != undefined && under != "undefined"){
                this.setState({ underBudget: under})
             }
             if(over != 0 && over != null && over != "" && over != undefined && over != "undefined"){
                this.setState({ overBudget: over})
             }

              var totalTrips = (this.state.onBudget + this.state.underBudget + this.state.overBudget)
              this.setState({ totalTrips: totalTrips})

              var pOnTarget = (this.state.onBudget/totalTrips)*100
              var pUnder = (this.state.underBudget/totalTrips)*100
              var pOver = (this.state.overBudget/totalTrips)*100

              this.setState({ percentOnBudget: pOnTarget})
              this.setState({ percentUnderBudget: pUnder})
              this.setState({ percentOverBudget: pOver})
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
                <Text style={styles.spendingTextGrey}>{"\tThis can show you where you spent your money and how to improve on spending when travelling"}</Text>
                <View style={{flex: 0.25, flexDirection: 'row'}}><Text style={styles.gaugeText}>{""}</Text></View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 3, flexDirection: 'column'}}>
                        <Text style={styles.gaugeText}>{"\tTimes Over-Budget"}</Text>
                        <Text style={styles.gaugeTextSmall}>{"\tYellow = Roughly On"}</Text>
                        <Text style={styles.gaugeTextSmall}>{"\tRed = Over"}</Text>
                        <Text style={styles.gaugeTextSmall}>{"\tBlue = Under"}</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'column'}}>
                      <Pie radius={50} innerRadius={30}
                          series={[this.state.percentOnBudget, this.state.percentUnderBudget, this.state.percentOverBudget ]}
                          colors={['#ffd700', '#4ca3dd', '#f00']}
                          backgroundColor="#ddd"
                      />
                  </View>
                  <View style={{flex: 3, flexDirection: 'column', alignItems: 'center'}}>
                      <Text style={styles.gaugeTextMedium}>{this.state.percentOverBudget.toString().substring(0, 5) + "% Trips\n\tOver-Budget\n"}</Text>
                      <Text style={styles.gaugeTextMedium}>{this.state.percentUnderBudget.toString().substring(0, 5) + "% Trips\n\tUnder-Budget"}</Text>
                  </View>
              </View>
              <View style={{flex: 0.25, flexDirection: 'row'}}>
                    <Text style={styles.spendingTitleGrey}>{"" + this.state.adviceMsgTrips + ""}</Text>
              </View>
              <View>
                    <Text style={styles.graphTitleText} >
                      {"\tSpending Per Trip Type"}
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
