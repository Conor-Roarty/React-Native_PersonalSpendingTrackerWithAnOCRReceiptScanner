import React, { Component, useState } from 'react';
import { Modal, TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform, YellowBox } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchToggle from 'react-native-switch-toggle';
import ImagePicker from 'react-native-image-picker';
import moment from "moment"; //https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4
import * as FireBase from "firebase";
import SubHeader from '../TripsHeader';
//import FireStore from '@react-native-firebase/firestore';
//error start https://stackoverflow.com/questions/58120990/question-getting-error-on-react-native-start

export default class TripsEntry extends Component {
constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Deprecation warning:','Warning: componentWillReceiveProps']);
    this.state = {
        uid: FireBase.auth().currentUser.uid.toString(),
        categoryData: [
        'Business (Fully Paid)', 'Business (Partial Paid)', 'Business (Not Paid)', 'Leisure', 'Other...'
        ],
        Trips: true,
        date: moment().toDate(),
        //startDate: moment().toDate(),
        //endDate: moment().toDate(),
        //time: moment().format('HH:mm:ss'),
        editVisible: false,
        mode: 'date',
        showStart: false,
        TripName: '',
        CurrencySelected: '',
        Currency: ['£ (GBP)', '$ (USD)', '€ (EUR)', '$ (AUD)'],
        CurrencySymbol: '£',
        Limit: null,
        Category: '',
        Comment: '',
        Items: '',
    }
  }

    btnCancelTrip = () => {
      this.props.navigation.navigate('TripScreen');
    }
      btnAddNewTrip(TripName, CurrencySelected, Limit, Category, date, Comment){
        var cur = CurrencySelected[0]
        // THIS NEEDS UPDATED WHEN LOGIN EXISTS

        if(TripName == null || TripName == ""){TripName = "Nameless"}

        var StartDate = this.getParsedDate(date);
        var StartTime = this.getParsedTime(date);
        StartDate = StartDate.replace('/','-');
        const name = TripName + '-' + (StartDate) + '-' + (StartTime);
        CurrencySelected = CurrencySelected[0]

        FireBase.database().ref(this.state.uid+'/Trips/' + name).set({
           TripName,
           //PurchaseDate,
           StartDate: StartDate,
           EndDate: StartDate,
           CurrencySelected,
           Limit: Number(Limit),
           TotalSpent: 0.00,
           Category,
           Comment,
           Cancelled: false
        }).then((data)=>{
            //success callback

            Alert.alert("Added Successfully");
            this.props.navigation.navigate('TripScreen');
            //Alert.alert(upload);
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
            Alert.alert("Error Adding - " + error);
        })

    }
    getParsedDate(strDate){
        return(moment(strDate).format('DD-MM-YYYY'))
    }
   getParsedTime(strTime){
          return(moment(strTime).format('HH:mm:ss'))
    }

    setDate = (event, date) => {
        date = date || this.state.date;
        this.setState({
          show: Platform.OS === 'ios' ? true : false,
          date,
        //  time,
        });
      }
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }
  _alertIndex(index) {
    Alert.alert(`This is , ${index} ,`);
  }
  updateTripName = (e) => {
    this.setState({
      TripName: e
    })
  }
    datepicker = () => {
      this.show('date');
    }
  endDatePicker = () => {
    this.show('date');
  }

  startDatePicker = () => {
    this.show('date');
  }
  timepicker = () => {
    this.show('time');
  }

  onPress1 = () => {
    this.setState({ Reimbursable: !this.state.Reimbursable });
  }

  render() {
    const { show, date, mode } = this.state;
    return (
      <ScrollView>
        <SubHeader />
          <View style={styles.rowSmall}>
               <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                   <Text style={{fontSize: 18, textAlign: 'center'}}>
                   Trip Name</Text>
               </View>
               <View style={{flex: 2}}>
                    <TextInput key='txtTripName'
                    onChangeText={(value) => this.setState({TripName: value})}
                    value={this.state.TripName}
                    />
               </View>
          </View>
          <View style={styles.row}>
              <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Currency</Text>
              </View>
              <View style={{flex: 2}}>
                 <ModalDropdown
                        onSelect={(index,value)=>{this.setState({CurrencySelected:value})}}
                        style={{flex: 7, fontSize: 18, textAlign: 'center'}}
                        textStyle={{fontSize: 18, textAlign: 'center'}}
                        dropdownTextStyle={{fontSize:18, textAlign: 'center', width:300}}
                        options={this.state.Currency}
                        >
                 </ModalDropdown>
              </View>
          </View>
          <View style={styles.row}>
              <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                   <Text style={{fontSize: 18, textAlign: 'center'}}>Spending Limit</Text>
              </View>
              <View style={{flex: 2}}>
                 <TextInput name='txtSpendingLimit'
                    onChangeText={(value) => this.setState({Limit: value})}
                    value={this.state.Limit}
                    />
              </View>
          </View>
          <View style={styles.row}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Trip Type</Text>
             </View>
             <View style={{flex: 2}}>
                 <ModalDropdown
                            onSelect={(index,value)=>{this.setState({Category:value})}}
                            style={{fontSize: 18, textAlign: 'center'}}
                            textStyle={{fontSize: 18, textAlign: 'center'}}
                            dropdownTextStyle={{fontSize:18, textAlign: 'left', width:300}}
                            options={this.state.categoryData}
                            >
                 </ModalDropdown>
             </View>
          </View>
          <View style={styles.rowLarge}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Start Date</Text>
             </View>
             <View style={{flex: 2}}>
                 <View style={{flex: .75, flexDirection: 'row', alignItem:'center'}}>
                 <Text>              </Text>
                    <View style={{flex: .75, flexDirection: 'row', marginTop: 5}}>
                        <Button onPress={this.datepicker} title="Start Date" />
                    </View>
                </View>
                { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
                }
                <View style={{flex: .75}}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>{this.getParsedDate(date)}</Text>
                </View>
          </View>
          </View>
          <View style={styles.rowLarge}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>End Date</Text>
             </View>
             <View style={{flex: 2}}>
                 <View style={{flex: .75, flexDirection: 'row', alignItem:'center'}}>
                 <Text>               </Text>
                    <View style={{flex: .75, flexDirection: 'row', marginTop: 5}}>
                        <Button onPress={this.datepicker} title="End Date" />
                    </View>
                </View>
                { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
                }
                <View style={{flex: .75}}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>{this.getParsedDate(date)}</Text>
                </View>
          </View>
          </View>
          <View style={styles.rowSmall}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Comment</Text>
             </View>
             <View style={{flex: 2}}>
                <TextInput name='txtNewPurchaseComment'
                    onChangeText={(value) => this.setState({Comment: value})}
                    value={this.state.Comment}
                    />
             </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1.5}}>
              <View style={{flex: 2}}>
                 <View style={{flex: .5}}></View>
                 <View style={{flex: 1.5}}>
                 <TouchableOpacity onPress={() => this.btnCancelTrip()}>
                   <View style={styles.btnCancelItem}>
                       <Text style={{fontSize: 18, textAlign: 'center'}}>Cancel</Text>
                   </View>
                 </TouchableOpacity>
                 </View>
              </View>
           <View style={{flex: 2}}>
              <TouchableOpacity onPress={() => this.btnAddNewTrip(this.state.TripName, this.state.CurrencySelected, this.state.Limit, this.state.Category, this.state.date, this.state.Comment)}>
                 <View style={styles.btnFinished}>
                     <Text style={{fontSize: 18, textAlign: 'center'}}>Save Trip</Text>
                 </View>
              </TouchableOpacity>
           </View>
           </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  row: { flex: 1.5,
         flexDirection: 'row',
         backgroundColor: '#f6f8fa',
         borderRadius: 0,
         borderWidth: 0.5,
         borderColor: 'grey'
  },
  rowLarge: { flex: 1.75,
         flexDirection: 'row',
         backgroundColor: '#f6f8fa',
         borderRadius: 0,
         borderWidth: 0.5,
         borderColor: 'grey'
  },
  rowSmall: { flex: 1.25,
           flexDirection: 'row',
           backgroundColor: '#f6f8fa',
           borderRadius: 0,
           borderWidth: 0.5,
           borderColor: 'grey'
  },
  btn: {
        width: 30,
        height: 20,
        backgroundColor: '#78B7BB',
        borderRadius: 2
  },
  labelBox: {
         flex: 2,
         backgroundColor:'#c8e1ff',
         borderRadius: 4,
         borderWidth: 1,
         borderColor: 'grey',
  },
  btnFinished: {
        width: 150,
        height: 30,
        textAlign: 'center',
        backgroundColor: '#78B7BB',
        borderRadius: 10,
        alignItems:'center',
        marginTop:50,
        marginBottom:10,
        marginRight:15,
        marginLeft:30,
  },
      btnCancelItem: {
        width: 150,
        height: 30,
        textAlign: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems:'center',
        marginTop:50,
        marginBottom:10,
        marginRight:15,
        marginLeft:30,
      },
    btnAddItem: {
          width: 35,
          height: 35,
          textAlign: 'center',
          backgroundColor: '#78B7BB',
          borderRadius: 20,
          alignItems:'center',
          marginTop:10,
          marginBottom:10,
          marginRight:15,
          marginLeft:50,
    },
});

TripsEntry.navigationOptions = {
  title: 'Plan A New Trip',
};