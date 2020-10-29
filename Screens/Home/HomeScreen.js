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

export default class HomeScreen extends Component {

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
                    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                      {
                        data: [0, 0, 0, 0, 0, 0, 0],
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
     // Header.Trips = this;
   }
     btnAddNewPurchase = () => {
        this.props.navigation.navigate('PurchaseEntryScreen');
     }
     refreshPage() {
       this.setState({refresh: true});

       this.setState({refresh: false});
     }
    componentDidMount() {
        this.spentToday();
        this.weeklyChart();
        this.barCharts();
        this.pieCharts();
        this.getBudgets();
    }
    spentToday = () => {
        var dailyTotal = 0.00;
        var ref = FireBase.database().ref(this.state.userID + '/Purchase');
        ref.once('value').then(snapshot => {
            snapshot.forEach((child) => {
               var pHolder = child.val().PurchaseDate.split('-')
               var PurchaseDate =pHolder[1] + "/" + pHolder[0] + "/" +pHolder[2]
               pDate = moment(PurchaseDate);
               if(pDate.diff(this.state.today, 'days') == 0){
                  var runningTotal = Number(child.val().Total) + dailyTotal;
                  dailyTotal = runningTotal;
                  dailyTotal = (Math.round(dailyTotal * 100) / 100).toFixed(2);
               }
            });
        }).then(() => {
           this.setState({ TodaysTotal: dailyTotal})
        })//.catch(error())
    };
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
            })
    };
    pieCharts = () => {// ONLY GETTING THE TRIPS NOW
                      // CHECK IT NOW HANDLES NEW CUSTOMERS AND ADD FOR NEW BUDGET FIELDS
        var ref = FireBase.database().ref(this.state.userID+ '/Trips');

        ref.once('value').then(snapshot => {
        //if(snapshot.hasChild('Trips')){
            //var ref2 = FireBase.database().ref(this.state.userID + '/Trips');
            //ref2.once('value').then(snapshot => {
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
                // });
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
         // }
      });
    };
    barCharts = () => {
    var monthlyData = [];
    var ref = FireBase.database().ref(this.state.userID + '/Purchase');
        ref.once('value').then(snapshot => {
           snapshot.forEach((child) => {
               var pHolder = child.val().PurchaseDate.split('-')
               var PurchaseDate =pHolder[1] + "/" + pHolder[0] + "/" +pHolder[2]
               pDate = moment(PurchaseDate);

               if(pHolder[1] == "01"){
                   var Jan = Number(child.val().Total) + this.state.Jan;
                   this.setState({Jan: Jan});

               }
               else if(pHolder[1] == "02"){
                   var Feb = Number(child.val().Total) + this.state.Feb;
                   this.setState({Feb: Feb});
               }
               else if(pHolder[1] == "03"){
                  var Mar = Number(child.val().Total) + this.state.Mar;
                  this.setState({Mar: Mar});
               }
               else if(pHolder[1] == "04"){
                  var Apr = Number(child.val().Total) + this.state.Apr;
                  this.setState({Apr: Apr});
               }
               else if(pHolder[1] == "05"){
                   var May = Number(child.val().Total) + this.state.May;
                   this.setState({May: May});
               }
               else if(pHolder[1] == "06"){
                   var June = Number(child.val().Total) + this.state.June;
                   this.setState({June: June});
               }
               else if(pHolder[1] == "07"){
                   var July = Number(child.val().Total) + this.state.July;
                   this.setState({July: July});
               }
               else if(pHolder[1] == "08"){
                 var Aug = Number(child.val().Total) + this.state.Aug;
                 this.setState({Aug: Aug});
              }
              else if(pHolder[1] == "09"){
                  var Sept = Number(child.val().Total) + this.state.Sept;
                  this.setState({Sept: Sept});
              }
              else if(parseInt(pHolder[1]) == 10){
                 var Oct = Number(child.val().Total) + this.state.Oct;
                 this.setState({Oct: Oct});
              }
              else if(parseInt(pHolder[1]) == 11){
                 var Nov = Number(child.val().Total) + this.state.Nov;
                 this.setState({Nov: Nov});
              }
              else if(parseInt(pHolder[1]) == 12){
                  var Dec = Number(child.val().Total) + this.state.Dec;
                  this.setState({Dec: Dec});
              }

           });
        }).then(() => {
            var thisMonth = (moment(this.state.today)).format('MMMM').toString();
            if(thisMonth === "January"){
              this.setState({ MonthsTotal: this.state.Jan})
            }else if(thisMonth === "February"){
              this.setState({ MonthsTotal: this.state.Feb})
            }else if(thisMonth === "March"){
              this.setState({ MonthsTotal: this.state.Mar})
            }else if(thisMonth === "April"){
              this.setState({ MonthsTotal: this.state.Apr})
            }else if(thisMonth === "May"){
              this.setState({ MonthsTotal: this.state.May})
            }else if(thisMonth === "June"){
              this.setState({ MonthsTotal: this.state.June})
            }else if(thisMonth === "July"){
              this.setState({ MonthsTotal: this.state.July})
            }else if(thisMonth === "August"){
              this.setState({ MonthsTotal: this.state.Aug})
            }else if(thisMonth === "September"){
              this.setState({ MonthsTotal: this.state.Sept})
            }else if(thisMonth === "October"){
              this.setState({ MonthsTotal: this.state.Oct})
            }else if(thisMonth === "November"){
              this.setState({ MonthsTotal: this.state.Nov})
            }else if(thisMonth === "December"){
              this.setState({ MonthsTotal: this.state.Dec})
            }
            var yearlyTotal = this.state.Jan + Number(this.state.Feb)+ this.state.Mar+ this.state.Apr + this.state.May + this.state.June + this.state.July+ this.state.Aug+ this.state.Sept+ this.state.Oct+ this.state.Nov+ this.state.Dec
            yearlyTotal = (Math.round(yearlyTotal * 100) / 100).toFixed(2);
            this.setState({YearsTotal: yearlyTotal});
            var line = {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug','Sept','Oct','Nov','Dec'],
              datasets: [{
                  data: [this.state.Jan, Number(this.state.Feb), this.state.Mar, this.state.Apr, this.state.May, this.state.June, this.state.July, this.state.Aug, this.state.Sept, this.state.Oct, this.state.Nov, this.state.Dec],
                  strokeWidth: 2, // optional
              },],
            };
            this.setState({ yearlyData: line})
        })//.catch(error())

   };
    weeklyChart = () => {
       var monthlyData = [];
       var dayOfWeek = (moment(this.state.today)).format('dddd').toString();
       var dayOfWeekOrder = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
       var weekLine;
       switch(dayOfWeek){
            case 'Monday':
               dayOfWeekOrder = ['Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun', 'Mon'];
               break;

             case 'Tuesday':
               dayOfWeekOrder = ['Wed', 'Thurs', 'Fri', 'Sat', 'Sun', 'Mon', 'Tues'];
               break;

             case 'Wednesday':
               dayOfWeekOrder = ['Thurs', 'Fri', 'Sat', 'Sun', 'Mon', 'Tues', 'Wed'];
               break;

             case 'Thursday':
               dayOfWeekOrder = ['Fri', 'Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs'];
               break;

             case 'Friday':
               dayOfWeekOrder = ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
               break;

             case 'Saturday':
               dayOfWeekOrder = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
               break;

             case 'Sunday':
               dayOfWeekOrder = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
               break;

             default:
               dayOfWeekOrder = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
         }

       var ref = FireBase.database().ref(this.state.userID + '/Purchase');
          ref.once('value').then(snapshot => {
             snapshot.forEach((child) => {
               var pHolder = child.val().PurchaseDate.split('-')
               var PurchaseDate =pHolder[1] + "/" + pHolder[0] + "/" +pHolder[2]
               pDate = moment(PurchaseDate);
               switch(dayOfWeek){
                    case 'Monday':
                       if(pDate.diff(this.state.today, 'days') == 0){
                           var Mon = Number(child.val().Total) + this.state.Mon;
                           this.setState({Mon: Mon});
                       } else if (pDate.diff(this.state.today, 'days') == -1){
                           var Tues = Number(child.val().Total) + this.state.Tues;
                           this.setState({Tues: Tues});
                       } else if (pDate.diff(this.state.today, 'days') == -2){
                           var Wed = Number(child.val().Total) + this.state.Wed;
                           this.setState({Wed: Wed});
                       } else if (pDate.diff(this.state.today, 'days') == -3){
                          var Thurs = Number(child.val().Total) + this.state.Thurs;
                          this.setState({Thurs: Thurs});
                       } else if (pDate.diff(this.state.today, 'days') == -4){
                           var Fri = Number(child.val().Total) + this.state.Fri;
                           this.setState({Fri: Fri});
                       }else if (pDate.diff(this.state.today, 'days') == -5){
                           var Sat = Number(child.val().Total) + this.state.Sat;
                           this.setState({Sat: Sat});
                       }else if (pDate.diff(this.state.today, 'days') == -6){
                          var Sun = Number(child.val().Total) + this.state.Sun;
                          this.setState({Sun: Sun});
                      }
                      var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun
                      weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                      this.setState({WeeksTotal: weeklyTotal});
                      weekLine = {
                          labels: dayOfWeekOrder,
                          datasets: [{
                              data: [this.state.Tues,this.state.Wed, this.state.Thurs,this.state.Fri,this.state.Sat,this.state.Sun,this.state.Mon],
                              strokeWidth: 2, // optional
                          },],
                        };
                      break;

                     case 'Tuesday':

                      if (pDate.diff(this.state.today, 'days') == 0){
                          var Tues = Number(child.val().Total) + this.state.Tues;
                          this.setState({Tues: Tues});
                      } else if (pDate.diff(this.state.today, 'days') == -1){
                          var Wed = Number(child.val().Total) + this.state.Wed;
                          this.setState({Wed: Wed});
                      } else if (pDate.diff(this.state.today, 'days') == -2){
                         var Thurs = Number(child.val().Total) + this.state.Thurs;
                         this.setState({Thurs: Thurs});
                      } else if (pDate.diff(this.state.today, 'days') == -3){
                          var Fri = Number(child.val().Total) + this.state.Fri;
                          this.setState({Fri: Fri});
                      }else if (pDate.diff(this.state.today, 'days') == -4){
                          var Sat = Number(child.val().Total) + this.state.Sat;
                          this.setState({Sat: Sat});
                      }else if (pDate.diff(this.state.today, 'days') == -4){
                         var Sun = Number(child.val().Total) + this.state.Sun;
                         this.setState({Sun: Sun});
                     }else if(pDate.diff(this.state.today, 'days') == -6){
                          var Mon = Number(child.val().Total) + this.state.Mon;
                          this.setState({Mon: Mon});
                      }
                    var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun;
                    weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                    this.setState({WeeksTotal: weeklyTotal});
                      weekLine = {
                          labels: dayOfWeekOrder,
                          datasets: [{
                              data: [this.state.Wed, this.state.Thurs,this.state.Fri,this.state.Sat,this.state.Sun,this.state.Mon,this.state.Tues],
                              strokeWidth: 2, // optional
                          },],
                        };
                     break;

                     case 'Wednesday':
                       if(pDate.diff(this.state.today, 'days') == 0){
                              var Mon = Number(child.val().Total) + this.state.Mon;
                              this.setState({Mon: Mon});
                          } else if (pDate.diff(this.state.today, 'days') == -1){
                              var Tues = Number(child.val().Total) + this.state.Tues;
                              this.setState({Tues: Tues});
                          } else if (pDate.diff(this.state.today, 'days') == -2){
                              var Wed = Number(child.val().Total) + this.state.Wed;
                              this.setState({Wed: Wed});
                          } else if (pDate.diff(this.state.today, 'days') == -3){
                             var Thurs = Number(child.val().Total) + this.state.Thurs;
                             this.setState({Thurs: Thurs});
                          } else if (pDate.diff(this.state.today, 'days') == -4){
                              var Fri = Number(child.val().Total) + this.state.Fri;
                              this.setState({Fri: Fri});
                          }else if (pDate.diff(this.state.today, 'days') == -5){
                              var Sat = Number(child.val().Total) + this.state.Sat;
                              this.setState({Sat: Sat});
                          }else if (pDate.diff(this.state.today, 'days') == -6){
                             var Sun = Number(child.val().Total) + this.state.Sun;
                             this.setState({Sun: Sun});
                         }
                         var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun;
                         weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                         this.setState({WeeksTotal: weeklyTotal});
                          weekLine = {
                            labels: dayOfWeekOrder,
                            datasets: [{
                                data: [this.state.Thurs,this.state.Fri,this.state.Sat,this.state.Sun,this.state.Mon,this.state.Tues,this.state.Wed],
                                strokeWidth: 2, // optional
                            },],
                          };
                         break;

                     case 'Thursday':
                       if(pDate.diff(this.state.today, 'days') == 0){
                              var Mon = Number(child.val().Total) + this.state.Mon;
                              this.setState({Mon: Mon});
                          } else if (pDate.diff(this.state.today, 'days') == -1){
                              var Tues = Number(child.val().Total) + this.state.Tues;
                              this.setState({Tues: Tues});
                          } else if (pDate.diff(this.state.today, 'days') == -2){
                              var Wed = Number(child.val().Total) + this.state.Wed;
                              this.setState({Wed: Wed});
                          } else if (pDate.diff(this.state.today, 'days') == -3){
                             var Thurs = Number(child.val().Total) + this.state.Thurs;
                             this.setState({Thurs: Thurs});
                          } else if (pDate.diff(this.state.today, 'days') == -4){
                              var Fri = Number(child.val().Total) + this.state.Fri;
                              this.setState({Fri: Fri});
                          }else if (pDate.diff(this.state.today, 'days') == -5){
                              var Sat = Number(child.val().Total) + this.state.Sat;
                              this.setState({Sat: Sat});
                          }else if (pDate.diff(this.state.today, 'days') == -6){
                             var Sun = Number(child.val().Total) + this.state.Sun;
                             this.setState({Sun: Sun});
                         }
                         var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun;
                         weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                         this.setState({WeeksTotal: weeklyTotal});
                         weekLine = {
                             labels: dayOfWeekOrder,
                             datasets: [{
                                 data: [this.state.Fri,this.state.Sat,this.state.Sun,this.state.Mon,this.state.Tues,this.state.Wed,this.state.Thurs],
                                 strokeWidth: 2, // optional
                             },],
                           };
                         break;

                     case 'Friday':
                       if(pDate.diff(this.state.today, 'days') == 0){
                          var Mon = Number(child.val().Total) + this.state.Mon;
                          this.setState({Mon: Mon});
                      } else if (pDate.diff(this.state.today, 'days') == -1){
                          var Tues = Number(child.val().Total) + this.state.Tues;
                          this.setState({Tues: Tues});
                      } else if (pDate.diff(this.state.today, 'days') == -2){
                          var Wed = Number(child.val().Total) + this.state.Wed;
                          this.setState({Wed: Wed});
                      } else if (pDate.diff(this.state.today, 'days') == -3){
                         var Thurs = Number(child.val().Total) + this.state.Thurs;
                         this.setState({Thurs: Thurs});
                      } else if (pDate.diff(this.state.today, 'days') == -4){
                          var Fri = Number(child.val().Total) + this.state.Fri;
                          this.setState({Fri: Fri});
                      }else if (pDate.diff(this.state.today, 'days') == -5){
                          var Sat = Number(child.val().Total) + this.state.Sat;
                          this.setState({Sat: Sat});
                      }else if (pDate.diff(this.state.today, 'days') == -6){
                         var Sun = Number(child.val().Total) + this.state.Sun;
                         this.setState({Sun: Sun});
                     }
                     var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun;
                     weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                     this.setState({WeeksTotal: weeklyTotal});
                     weekLine = {
                         labels: dayOfWeekOrder,
                         datasets: [{
                             data: [this.state.Sat,this.state.Sun,this.state.Mon,this.state.Tues,this.state.Wed,this.state.Thurs,this.state.Fri],
                             strokeWidth: 2, // optional
                         },],
                       };
                     break;

                     case 'Saturday':
                       if(pDate.diff(this.state.today, 'days') == 0){
                          var Mon = Number(child.val().Total) + this.state.Mon;
                          this.setState({Mon: Mon});
                      } else if (pDate.diff(this.state.today, 'days') == -1){
                          var Tues = Number(child.val().Total) + this.state.Tues;
                          this.setState({Tues: Tues});
                      } else if (pDate.diff(this.state.today, 'days') == -2){
                          var Wed = Number(child.val().Total) + this.state.Wed;
                          this.setState({Wed: Wed});
                      } else if (pDate.diff(this.state.today, 'days') == -3){
                         var Thurs = Number(child.val().Total) + this.state.Thurs;
                         this.setState({Thurs: Thurs});
                      } else if (pDate.diff(this.state.today, 'days') == -4){
                          var Fri = Number(child.val().Total) + this.state.Fri;
                          this.setState({Fri: Fri});
                      }else if (pDate.diff(this.state.today, 'days') == -5){
                          var Sat = Number(child.val().Total) + this.state.Sat;
                          this.setState({Sat: Sat});
                      }else if (pDate.diff(this.state.today, 'days') == -6){
                         var Sun = Number(child.val().Total) + this.state.Sun;
                         this.setState({Sun: Sun});
                     }
                     var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun;
                     weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                     this.setState({WeeksTotal: weeklyTotal});
                     weekLine = {
                         labels: dayOfWeekOrder,
                         datasets: [{
                             data: [this.state.Sun,this.state.Mon,this.state.Tues,this.state.Wed,this.state.Thurs,this.state.Fri,this.state.Sat],
                             strokeWidth: 2, // optional
                         },],
                       };
                     break;

                     case 'Sunday':
                       if(pDate.diff(this.state.today, 'days') == 0){
                          var Mon = Number(child.val().Total) + this.state.Mon;
                          this.setState({Mon: Mon});
                      } else if (pDate.diff(this.state.today, 'days') == -1){
                          var Tues = Number(child.val().Total) + this.state.Tues;
                          this.setState({Tues: Tues});
                      } else if (pDate.diff(this.state.today, 'days') == -2){
                          var Wed = Number(child.val().Total) + this.state.Wed;
                          this.setState({Wed: Wed});
                      } else if (pDate.diff(this.state.today, 'days') == -3){
                         var Thurs = Number(child.val().Total) + this.state.Thurs;
                         this.setState({Thurs: Thurs});
                      } else if (pDate.diff(this.state.today, 'days') == -4){
                          var Fri = Number(child.val().Total) + this.state.Fri;
                          this.setState({Fri: Fri});
                      }else if (pDate.diff(this.state.today, 'days') == -5){
                          var Sat = Number(child.val().Total) + this.state.Sat;
                          this.setState({Sat: Sat});
                      }else if (pDate.diff(this.state.today, 'days') == -6){
                         var Sun = Number(child.val().Total) + this.state.Sun;
                         this.setState({Sun: Sun});
                     }
                     var weeklyTotal = this.state.Mon +this.state.Tues +this.state.Wed +this.state.Thurs +this.state.Fri +this.state.Sat +this.state.Sun;
                     weeklyTotal = (Math.round(weeklyTotal * 100) / 100).toFixed(2);
                     this.setState({WeeksTotal: weeklyTotal});
                     weekLine = {
                       labels: dayOfWeekOrder,
                       datasets: [{
                           data: [this.state.Mon,this.state.Tues,this.state.Wed,this.state.Thurs,this.state.Fri,this.state.Sat,this.state.Sun],
                           strokeWidth: 2, // optional
                       },],
                     };
                     break;

                     default:
                        Alert.alert("Error Reading Weekly Data");
                 }
              });

          }).then(() => {
            if(weekLine != null && weekLine != "" && weekLine != undefined){
                this.setState({ weeklyData: weekLine})
            }
          })//.catch(error())

      };
//{this.state.Trips ?<Text>{"\n"}</Text>: null }
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

            <Text style={styles.gaugeText}>{"\tWelcome To ExpenseLess, "+ this.state.email[0] +""}</Text>
             <Text style={styles.welcomeText}>{"\tSpending:"}</Text>
            <View visible="false" style={{flex: 0.5, flexDirection: 'row'}}>
                <View style={{flex: 0.5, flexDirection: 'column', borderRadius: 0.5}}>
                    <Text style={styles.spendingTitleGrey}>{"Today:"}</Text>
                    <Text style={styles.spendingTextGrey}>{"£" + this.state.TodaysTotal.toString()}</Text>
                </View>
                <View style={{flex: 0.5, flexDirection: 'column', borderRadius: 0.5}}>
                    <Text style={styles.spendingTitleGrey}>{"Past 7 Days:"}</Text>
                    <Text style={styles.spendingTextGrey}>{"£" + this.state.WeeksTotal.toString()}</Text>
                </View>
                <View style={{flex: 0.5, flexDirection: 'column', borderRadius: 0.5}}>
                    <Text style={styles.spendingTitleGrey}>{"This Year:"}</Text>
                    <Text style={styles.spendingTextGrey}>{"£" + this.state.YearsTotal.toString()}</Text>
                </View>
                <Text style={styles.spendingTitleGrey}>{"\n"}</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 0.9, flexDirection: 'column', borderRadius: 0.5}}>
                <Text style={styles.gaugesText}>{"\n\t" + this.state.weekPercent.toString().substring(0, 5) + "% Of Weekly Budget"}</Text>

                </View>
                <View style={{flex: 0.9, flexDirection: 'column', borderRadius: 0.5}}>
                    <Text style={styles.gaugesText}>{"\n\t" + this.state.monthPercent.toString().substring(0, 5) + "% Of Monthly Budget"}</Text>
                </View>
                <View style={{flex: 0.9, flexDirection: 'column', borderRadius: 0.5}}>
                    {this.state.currentTrip ? <Text style={styles.gaugesText}>{"\n\t" + this.state.tripPercent.toString().substring(0, 5) + "% Of Current Trip Budget"}</Text>: null}
                </View>
            </View>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 0.2, flexDirection: 'column'}}></View>
                <View style={{flex: 0.9, flexDirection: 'column', borderRadius: 0.5}}>
                    <Pie
                      radius={40}
                      innerRadius={35}
                      series={[this.state.weekPercent]}
                      colors={this.state.weekPercent >= 100 ? ['#f00'] : ['#00CC00']}
                      backgroundColor="#ddd"
                    />
                </View><View style={{flex: 0.2, flexDirection: 'column'}}></View>
                <View style={{flex: 0.9, flexDirection: 'column', borderRadius: 0.5}}>
                    <Pie
                      radius={40}
                      innerRadius={35}
                      series={[this.state.monthPercent]}
                      colors={this.state.monthPercent >= 100 ? ['#f00'] : ['#00CC00']}
                      backgroundColor="#ddd"
                    />
                </View><View style={{flex: 0.2, flexDirection: 'column'}}></View>
                <View style={{flex: 0.9, flexDirection: 'column', borderRadius: 0.5}}>
                   { this.state.currentTrip ?
                       <Pie radius={40} innerRadius={35}
                            series={[Number(this.state.tripPercent)]}
                            colors={Number(this.state.tripPercent) >= 100 ? ['#f00'] : ['#00CC00']}
                            backgroundColor="#ddd"
                       />:
                       <Text style={styles.gaugeText}>{"No\nCurrent\nTrips"}</Text>
                   }
                </View>
            </View>
            <Text style={styles.graphTitleText}></Text>
            <View>
                  <Text style={styles.graphTitleText} >
                    {"This Past Weeks Spending"}
                  </Text>
                  <LineChart
                    data={this.state.weeklyData}
                    width={Dimensions.get('window').width - 20}  // adaptable to all devices
                    height={220}
                    yAxisLabel={'$'}
                    chartConfig={{
                      backgroundColor: 'black',
                      backgroundGradientFrom: '#87CEFA',
                      backgroundGradientTo: '#00008B',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    style={{
                      marginVertical: 8,
                      alignItems: 'center',
                      borderRadius: 16,
                    }}
                  />
            </View>
            <View>
                  <Text style={styles.graphTitleText} >
                    {"This Years Spending"}
                  </Text>
                  <LineChart
                    data={this.state.yearlyData}
                    width={Dimensions.get('window').width - 40}  // adaptable to all devices
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

              <TouchableOpacity onPress={() => this.btnAddNewPurchase()}
                        activeOpacity={0.7}
                        style={styles.TouchableOpacityStyle}>
                        <Image
                          source={require('../../images/Home_Receipt.png')}
                          style={styles.FloatingButtonStyle}
                        />
              </TouchableOpacity>

              </View>
      );
    };
};

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
      fontSize: 22,
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
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
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

HomeScreen.navigationOptions = {
  title: 'Home',
  header: null,
};