import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { TextInput, Button, Modal, SectionList, Platform, Image, ScrollView, StatusBar, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { createSwitchNavigator  } from 'react-navigation';
import TripEntryScreen from './TripsEntry';
import AppNavigator from '../../Navigation/AppNavigator.js';
import ListItem2 from '../../Helpers/ListItem';
import * as FireBase from "firebase";
import moment from "moment";
import SubHeader from '../TripsHeader';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class TripScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      editVisible: false,
      today: moment().toDate(),
      searchPast: '',
      searchCancelled: '',
      userID:  FireBase.auth().currentUser.uid.toString(),
      search: '',
      loading: false,
      current: [],
      upcoming: [],
      past: [],
      cancelled: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      complete: false,

      categoryData: [
        'Business (Fully Paid)', 'Business (Partial Paid)', 'Business (Not Paid)', 'Leisure', 'Other...'
      ],
      editCurrency: ['£ (GBP)', '$ (USD)', '€ (EUR)', '$ (AUD)'],
      date: moment().toDate(),
      mode: 'date',
      editKey: null,
        editTripName: null,
        editStartDate: null,
        editEndDate: null,
        editCurrencySelected: null,
        editLimit: null,
        editTotalSpent: null,
        editCategory: null,
        editComment: null,
        editCancelled: null,
    }
    this.refCat = React.createRef();
    this.ref = React.createRef();
    this.showEdit = this.showEdit.bind(this);
  }
      showEdit(editKey, editTripName, editCurrencySelected, editTotalSpent, editLimit, editCategory, editStartDate,editEndDate, editComment, editCancelled){
         this.setState({ editKey: editKey });
         this.setState({ editTripName: editTripName });
         this.setState({ editLimit: editLimit.toString() });
         this.setState({ editStartDate: editStartDate });
         this.setState({ editEndDate: editEndDate });
         this.setState({ editComment: editComment });
         this.setState({ editCancelled: editCancelled });
         this.setState({editCategory: editCategory});

         if(editCurrencySelected == null || editCurrencySelected == ""){
              this.setState({editCurrencySelected: '£ (GBP)'})
           }
           else if(editCurrencySelected == "£"){
               this.setState({editCurrencySelected: '£ (GBP)'})
           }else if(editCurrencySelected == "$"){
               this.setState({editCurrencySelected: '$ (USD)'});
           }else if(editCurrencySelected == "€"){
               this.setState({editCurrencySelected: '€ (EUR)'});
           }else{
               this.setState({editCurrencySelected: '$ (AUD)'});
           }

//             if(editCategory == null || editCategory == ""){
//                 this.setState({editCategory: 'Business (Fully Paid)'});
//                 this.refCat.current.select(1);
//             }
//             else if(editCategory == "Business (Fully Paid)"){
//                 this.setState({editCategory: 'Business (Fully Paid)'});
//                 this.refCat.current.select(1);
//             }else if(editCategory == "Business (Partial Paid)"){
//                 this.setState({editCategory: 'Business (Partial Paid)'});
//                 this.refCat.current.select(1);
//             }else if(editCategory == "Business (Not Paid)"){
//                 this.setState({editCategory: 'Business (Not Paid)'});
//                 this.refCat.current.select(1);
//             }else if(editCategory == "Leisure"){
//                 this.setState({editCategory: 'Leisure'});
//             }else{
//                 this.setState({editCategory: 'Other...'});
//             }

         this.setState({ editVisible: true });

         this.setState({editCurrencySelected: '$ (USD)'});
        // this.ref.current.select(0);

         this.setState({editCategory: 'Business (Fully Paid)'});
        // this.refCat.current.select(0);
      };

    componentDidMount() {
        this.makeRemoteRequest();
        this.setState({complete: true});
    }
    makeRemoteRequest = () => {
        var ref = FireBase.database().ref(this.state.userID + '/Trips');
        ref.once('value').then(snapshot => {
           var itemsUp = [];
           var itemsPast = [];
           var itemsCan = [];
           var itemsCur = [];
          //Alert.alert(moment(this.state.today).format('DD-MM-YYYY') + " abc")
           snapshot.forEach((child) => {
           if((child.key.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
              || (child.val().TripName.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
              || (child.val().StartDate.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
              || (child.val().EndDate.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
              || (child.val().CurrencySelected[0].toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
              || (child.val().Limit.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)){

               var sHolder = child.val().StartDate.split('-')
               var Start =sHolder[1] + "/" + sHolder[0] + "/" +sHolder[2]
               sDate = moment(Start);
               var eHolder = child.val().EndDate.split('-')
               var End =eHolder[1] + "/" + eHolder[0] + "/" +eHolder[2]
               eDate = moment(End);

             if(child.val().Cancelled == true){
                 itemsCan.push({
                     id: child.key,
                     title: child.val().TripName.toUpperCase(),
                     cost: child.val().StartDate + " to " + child.val().EndDate + "\nSpending Limit - "+ child.val().CurrencySelected[0] + child.val().Limit,

                     StartDate: child.val().StartDate,
                     EndDate: child.val().EndDate,
                     TripName: child.val().TripName,
                     Category: child.val().Category,
                     cur: child.val().CurrencySelected,
                     Limit: child.val().Limit,
                     Total: child.val().TotalSpent,
                     Comment: child.val().Comment,
                     Cancelled: 'true'
                 });
             }
             if((sDate.diff(this.state.today, 'days') <= 0) && (eDate.diff(this.state.today, 'days') >= 0)){
                 itemsCur.push({
                     id: child.key,
                     title: child.val().TripName.toUpperCase() + ":\t" + child.val().Category,
                     cost: child.val().StartDate + " to " + child.val().EndDate + "\nSpending Limit - "+ child.val().CurrencySelected[0] + child.val().Limit,

                     StartDate: child.val().StartDate,
                     EndDate: child.val().EndDate,
                     TripName: child.val().TripName,
                     Category: child.val().Category,
                     cur: child.val().CurrencySelected,
                     Limit: child.val().Limit,
                     Total: child.val().TotalSpent,
                     Comment: child.val().Comment,
                     Cancelled: 'false'
                 });
             }
             if((sDate.diff(this.state.today, 'days') > 0) && (eDate.diff(this.state.today, 'days') > 0)){
                 itemsUp.push({
                     id: child.key,
                     title: child.val().TripName.toUpperCase() + ":\t" + child.val().Category,
                     cost: child.val().StartDate + " to " + child.val().EndDate + "\nSpending Limit - "+ child.val().CurrencySelected[0] + child.val().Limit,

                     StartDate: child.val().StartDate,
                     EndDate: child.val().EndDate,
                     TripName: child.val().TripName,
                     Category: child.val().Category,
                     cur: child.val().CurrencySelected,
                     Limit: child.val().Limit,
                     Total: child.val().TotalSpent,
                     Comment: child.val().Comment,
                     Cancelled: 'false'
                 });
             }
             if((eDate.diff(this.state.today, 'days') < 0) && (sDate.diff(this.state.today, 'days') < 0)){
                 itemsPast.push({
                    id: child.key,
                    title: child.val().TripName.toUpperCase() + ":\t" + child.val().Category,
                    cost: child.val().StartDate + " to " + child.val().EndDate + "\nSpending Limit - "+ child.val().CurrencySelected[0] + child.val().Limit,

                    StartDate: child.val().StartDate,
                    EndDate: child.val().EndDate,
                    TripName: child.val().TripName,
                    Category: child.val().Category,
                    cur: child.val().CurrencySelected,
                    Limit: child.val().Limit,
                    Total: child.val().TotalSpent,
                    Comment: child.val().Comment,
                    Cancelled: 'false'
                 });
             }
             }
          });

          this.setState({ current: itemsCur})
          this.setState({ upcoming: itemsUp})
          this.setState({ past: itemsPast})
          this.setState({ cancelled: itemsCan})

      });
    };
    getParsedDate(strDate){return(moment(strDate).format('DD-MM-YYYY'))}
    getParsedTime(strTime){return(moment(strTime).format('HH:mm:ss'))}
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

    datepicker = () => {
      this.show('date')
    };
    handleRefresh = () => {
      this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
    };
    updateSearchTrips = search => {
        this.setState({ search });
        this.makeRemoteRequest();
    };
    updateSearchPast = searchPast => {
        this.setState({ searchPast });
    }
    updateSearchCancelled = searchCancelled => {
        this.setState({ searchCancelled });
    }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
    btnCancelEdit = () => {
      this.setState({ editVisible: false });
    }
    btnAddTrip = () => {
   // Alert.alert(this.state.Trip)
      this.props.navigation.navigate('TripEntryScreen');
    }
    GetSectionListItem = item => {
        //Function for click on an item
        Alert.alert(item);
  };
    SecListItemSeparator = () => {
        return (
          //Item Separator
          <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        );
      };
  render() {
  const { searchUpcoming, searchPast, searchCancelled } = this.state;
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Edit</Text>
        </View>
      </TouchableOpacity>

    );
    return (
      <View style={styles.container}>
                 <StatusBar barStyle="dark-content" />
                 <SafeAreaView>
                   <ScrollView
                     contentInsetAdjustmentBehavior="automatic"
                     style={styles.scrollView}>
                     <SubHeader />
                   </ScrollView>
                 </SafeAreaView>
        <SearchBar
              round
              placeholderTextColor="white"
              lightTheme={true}
              placeholder="Filter All Trips Here..."
              onChangeText={this.updateSearchTrips}
              value={this.state.search}
        />
        <SectionList
          ItemSeparatorComponent={this.SecListItemSeparator}
          sections={[
            { title: 'Current Trips', data: this.state.current },
            { title: 'Upcoming Trips', data: this.state.upcoming },
            { title: 'Recent Trips', data: this.state.past },
            { title: 'Cancelled Trips', data: this.state.cancelled },
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) => (
            // Single Comes here which will be repetitive for the FlatListItems
            <Text
              style={styles.SectionListItemStyle}
              //Item Separator View
              //this.GetSectionListItem.bind(this,'Id: '+item.id+'\nName: '+item.title); this.setState({ editVisible: true });}
              //UPDATE ITEM TO TAKE ALL DETAILS SEPARATELY

              onPress={() => this.showEdit(item.id, item.TripName, item.cur, item.Total, item.Limit, item.Category, item.StartDate, item.EndDate, item.Comment, item.Cancelled)}
              >
              {item.title + "\n" + item.cost}
            </Text>
          )}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled={true}

          onEndReachedThreshold={10}
        />
          <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.btnAddTrip}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                      source={require('../../images/fab_trip.png')}
                      style={styles.FloatingButtonStyle}
                    />
                  </TouchableOpacity>

            <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={this.state.editVisible}>
                  {/*All views of Modal*/}
                  {/*Animation can be slide, fade, none*/}
                  <ScrollView style={styles.container2}>
                    <Button title="Return Without Saving"
                      onPress={() => {
                        this.setState({ editVisible: !this.state.editVisible });
                      }}
                    />
                  <View style={styles.rowSmall}>
                       <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                           <Text style={{fontSize: 18, textAlign: 'center'}}>
                           Trip Name</Text>
                       </View>
                       <View style={{flex: 2}}>
                            <TextInput key='txtTripName'
                            onChangeText={(value) => this.setState({editTripName: value})}
                            value={this.state.editTripName}
                            />
                       </View>
                  </View>
                    <View style={styles.row}>
                      <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                          <Text style={{fontSize: 18, textAlign: 'center'}}>Currency</Text>
                      </View>
                      <View style={{flex: 2}}>
                         <ModalDropdown
                                onSelect={(index,value)=>{this.setState({editCurrencySelected:value})}}
                                style={{flex: 7, fontSize: 18, textAlign: 'center'}}
                                textStyle={{fontSize: 18, textAlign: 'center'}}
                                dropdownTextStyle={{fontSize:18, textAlign: 'center', width:300}}
                                options={this.state.editCurrency}
                                ref={this.ref}
                                defaultValue={this.state.editCurrencySelected}
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
                            onChangeText={(value) => this.setState({editLimit: value})}
                            value={this.state.editLimit}
                            />
                      </View>
                  </View>
                  <View style={styles.row}>
                     <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                          <Text style={{fontSize: 18, textAlign: 'center'}}>Trip Type</Text>
                     </View>
                     <View style={{flex: 2}}>
                         <ModalDropdown
                            ref={this.refCat}
                            onSelect={(index,value)=>{this.setState({editCategory:value})}}
                            style={{fontSize: 18, textAlign: 'center'}}
                            textStyle={{fontSize: 18, textAlign: 'center'}}
                            dropdownTextStyle={{fontSize:18, textAlign: 'left', width:300}}
                            options={this.state.categoryData}
                            defaultValue={this.state.editCategory}
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
                <View style={{flex: .75}}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.editStartDate}</Text>
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

                <View style={{flex: .75}}>
                    <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.editEndDate}</Text>
                </View>
          </View>
          </View>

                  <View style={styles.rowSmall}>
                     <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                          <Text style={{fontSize: 18, textAlign: 'center'}}>Comment</Text>
                     </View>
                     <View style={{flex: 2}}>
                        <TextInput name='txtNewPurchaseComment'
                            onChangeText={(value) => this.setState({editComment: value})}
                            value={this.state.editComment}
                            />
                     </View>
                  </View>
                  <View style={{flexDirection: 'row', flex: 3, backgroundColor:'#f6f8fa'}}>
                      <View style={{flex: 1}}>
                         <TouchableOpacity onPress={() => this.btnCancelEdit()}>
                           <View style={styles.btnCancelItem}>
                               <Text style={{fontSize: 18, textAlign: 'center'}}>Cancel</Text>
                           </View>
                         </TouchableOpacity>
                      </View>
                   <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => this.btnAddNewTrip(this.state.editTripName, this.state.editCurrencySelected, this.state.editLimit, this.state.editCategory, this.state.date, this.state.editComment)}>
                         <View style={styles.btnFinished}>
                             <Text style={{fontSize: 18, textAlign: 'center'}}>Save Trip</Text>
                         </View>
                      </TouchableOpacity>
                   </View>

               </View>
               <View style={{flex: 1}}></View>
                  </ScrollView>
                </Modal>
          </View>
    )
  }
}

const styles = StyleSheet.create({
     container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff', color: '#fff' },
    container2: { flex: 1,  borderRadius: 2, padding: 10, paddingTop: 80, backgroundColor: 'rgba(52, 52, 52, 0.9)' },
    head: { height: 40, backgroundColor: '#c8e1ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#f6f8fa' },
    btn: { width: 30, height: 20, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnCancel: { width: 45, height: 20, backgroundColor: '#DC143C',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    btnCancelText: { textAlign: 'center', color: '#fff' },
    btnAdd: { width: 120, height: 20, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnAddText: { textAlign: 'center', color: '#fff' },

    titleHighlightYellow: {
        backgroundColor: '#ffffed',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    titleHighlightGreen: {
        backgroundColor: '#90EE90',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    titleHighlightRed: {
     backgroundColor: '#F08080',
     borderRadius: 3,
     paddingHorizontal: 4,
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
     width: 50,
     height: 50,
    },
    SectionHeaderStyle: {
        backgroundColor: '#D3B53D',
        fontSize: 20,
        padding: 5,
        color: '#fff',
      },
      SectionListItemStyle: {
        fontSize: 15,
        padding: 15,
        color: '#000',
        backgroundColor: '#F5F5F5',
      },
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

TripScreen.navigationOptions = {
  title: 'Trips',
  header: {
          visible: true
          },
  header: props => <CustomHeader {...props} />,
  headerStyle: {
    backgroundColor: "transparent"
  },
  headerTintColor: '#ffffed',
  headerVisible: true
};


