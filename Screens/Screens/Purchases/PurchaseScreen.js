import React, { Component } from 'react';
import { ListItem, SearchBar } from 'react-native-elements';
import { RefreshControl, TextInput, Button, Platform, Image, Modal, ScrollView, StatusBar, StyleSheet,SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity, Alert, FlatList } from 'react-native';
import { createSwitchNavigator  } from 'react-navigation';
import AppNavigator from '../../Navigation/AppNavigator.js';
import PurchaseEntryScreen from './PurchaseEntry';
import * as FireBase from "firebase";
import ListItem2 from '../../Helpers/ListItem';
import SubHeader from '../SubHeader';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

const headerTitle = 'ExpenseLess';

export default class PurchaseScreen extends Component {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.state = {
      userID:  FireBase.auth().currentUser.uid.toString(),
      Trips: global.TripSwitch,
      search: '',
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      confirm: false,
      showModal: ListItem2.editPurchaseVisible,
      refreshing: false,
       editPurchaseKey: null,
       editPurchaseName: null,
       editPurchaseTotal:  null,
       editPurchaseStartDate:  null,
       editPurchaseEndDate: null,
       editPurchaseComment:  null,
       editPurchaseCancelled: null,
       editPurchaseCategory:  null,
       editPurchaseCurrencySelected:  null,
       editPurchaseVisible: false,
    }
    this.updateSwitch = this.updateSwitch.bind(this);
  }
    updateSwitch() {
      this.setState({ Trips: global.TripSwitch });
    }
    getParsedDate(strDate){return(moment(strDate).format('DD-MM-YYYY'))}
    btnCancelEdit = () => {
      this.setState({ editPurchaseVisible: false });
    }
    showEdit(editKey, editTripName, editCurrencySelected, editTotalSpent, editLimit, editCategory, editStartDate,editEndDate, editComment, editCancelled){
//             this.setState({ editPurchaseKey: editKey });
//             this.setState({ editPurchaseName: editTripName });
//             this.setState({ editPurchaseTotal: editLimit.toString() });
//             this.setState({ editPurchaseStartDate: editStartDate });
//             this.setState({ editPurchaseEndDate: editEndDate });
//             this.setState({ editPurchaseComment: editComment });
//             this.setState({ editPurchaseCancelled: editCancelled });
//             this.setState({editPurchaseCategory: 'Dinner'});
//             this.setState({editPurchaseCurrencySelected: '£ (GBP)'})


             this.setState({ editPurchaseVisible: true });


          };

    componentDidUpdate(){
    //Alert.alert(this.state.Trips + " trips " + global.TripSwitch);
    //this.makeRemoteRequest();
    }
    componentDidMount() {
      this.makeRemoteRequest();
      //SET BOOL STATE HERE TO AVOID REPEATING WITH UPDATE
    }
    makeRemoteRequest = () => {
       var ref = FireBase.database().ref(this.state.userID + '/Purchase');
       if(!(global.TripSwitch)){
          if(this.state.search == null){
              ref.once('value').then(snapshot => {
                     var items = [];
                     this.setState({ data: null})//may need to be changed with over 50 items
                     snapshot.forEach((child) => {
                      var tripID = "";
                      if(child.val().trip != null && child.val().trip != ""){
                          tripID = "\tTrip - "+child.val().trip + "  ";
                      }
                       items.push({
                          id: child.key,
                          date: child.val().PurchaseDate,
                          title: child.val().Title + " ",
                          cost: child.val().currency[0] + child.val().Total,
                          img: child.val().img,
                          trip: tripID
                       });
                    });
                    if(items.count == 0){
                       items.push({
                          title: "No Entries Yet",
                          cost: "Go To The Entry Page (Below +) To Add Purchases"
                       });
                    } else {
                        this.setState({ data: items})
                    }
                     this.setState({refreshing: false});
                });
       } else {
              ref.once('value').then(snapshot => {
                       var items = [];
                       this.setState({ data: null})//may need to be changed with over 50 items
                       snapshot.forEach((child) => {
                         if((child.key.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                           || (child.val().PurchaseDate.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                           || (child.val().Title.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                           || (child.val().currency[0].toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                           || (child.val().Total.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)){
                             var tripID = "";
                             if(child.val().trip != null && child.val().trip != ""){
                                 tripID = "\tTrip-" + child.val().trip + "  ";
                             }
                             items.push({
                                id: child.key,
                                date: child.val().PurchaseDate,
                                title: child.val().Title + " ",
                                cost: child.val().currency[0] + child.val().Total,
                                img: child.val().img,
                                trip: tripID
                             });
                         }
                      });
                      if(items.count == 0){
                         items.push({
                            title: "No Entries Yet",
                            cost: "Go To The Entry Page (Below +) To Add Purchases"
                         });
                      } else {
                          this.setState({ data: items})
                      }
                       this.setState({refreshing: false});
                    });
                }
         } else {
                if(this.state.search == null){
                    ref.once('value').then(snapshot => {
                           var items = [];
                           this.setState({ data: null})//may need to be changed with over 50 items
                           snapshot.forEach((child) => {
                            var tripID = "";
                            if(child.val().trip != null && child.val().trip != ""){
                                tripID = "\tTrip-"+child.val().trip + "  ";
                                 items.push({
                                    id: child.key,
                                    date: child.val().PurchaseDate,
                                    title: child.val().Title + "  ",
                                    cost: child.val().currency[0] + child.val().Total,
                                    img: child.val().img,
                                    trip: tripID
                                 });
                             }
                          });
                          if(items.count == 0){
                             items.push({
                                title: "No Entries Yet",
                                cost: "Go To The Entry Page (Below +) To Add Purchases"
                             });
                          } else {
                              this.setState({ data: items})
                          }
                           this.setState({refreshing: false});
                      });
                }else {
                   ref.once('value').then(snapshot => {
                            var items = [];
                            this.setState({ data: null})//may need to be changed with over 50 items
                            snapshot.forEach((child) => {
                              if((child.key.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                                || (child.val().PurchaseDate.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                                || (child.val().Title.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                                || (child.val().currency[0].toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)
                                || (child.val().Total.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) > -1)){
                                  var tripID = "";
                                  if(child.val().trip != null && child.val().trip != ""){
                                      tripID = "\tTrip-" + child.val().trip + "  ";
                                      items.push({
                                         id: child.key,
                                         date: child.val().PurchaseDate,
                                         title: child.val().Title + " ",
                                         cost: child.val().currency[0] + child.val().Total,
                                         img: child.val().img,
                                         trip: tripID
                                      });
                                  }
                              }
                           });
                           if(items.count == 0){
                              items.push({
                                 title: "No Entries Yet",
                                 cost: "Go To The Entry Page (Below +) To Add Purchases"
                              });
                           } else {
                               this.setState({ data: items})
                           }
                            this.setState({refreshing: false});
                         });
                     }
         }
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

    success(key) {
       Alert.alert(
         'Delete Warning',
         'This cannot be undone if you select Confirm',
         [
           {text: 'YES', onPress: () =>  this.deleteEntry(key)},
           {text: 'NO', onPress: () =>  {this.setState({ confirm: false}); this.makeRemoteRequest();}}
         ]
       );
  }

    deleteEntry(key){
        if(key.indexOf("Trip-") < 0){
            var record = key.toString().split("  Title:");
            var recordID = record[0].trimStart().toString();
            recordID = recordID.trimEnd().toString();

             FireBase.database().ref(this.state.userID + '/Purchase/' + recordID).remove().then((data)=>{
                  //success callback
                  Alert.alert("Deleted Successfully");
                  console.log('Deleted data: ' , data);
                  this.makeRemoteRequest();
              }).catch((error)=>{
                  //error callback
                  console.log('error ' , error);
                  Alert.alert("Error Deleting - " + error);
              })
          } else {
              var lines = key.toString().split("Trip-");
              var line = lines[1].toString().split("  ");

              var record = line[2].toString().split("  Title:");
              var recordID = record[0].trimStart().toString();
              recordID = recordID.trimEnd().toString();

                 FireBase.database().ref(this.state.userID + '/Purchase/' + recordID).remove().then((data)=>{
                      //success callback
                      Alert.alert("Deleted Successfully");
                      console.log('Deleted data: ' , data);
                      this.makeRemoteRequest();
                  }).catch((error)=>{
                      //error callback
                      console.log('error ' , error);
                      Alert.alert("Error Deleting - " + error);
                  })

              }
    }

    handleLoadMore = () => {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.makeRemoteRequest();
        }
      );
    };

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
            marginLeft: "100%"
          }}
        />
      );
    };

    renderHeader = () => { return <SearchBar placeholder="Type Here..." lightTheme round />;};

    renderFooter = () => {
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
    getUserID(){
      const uid = FireBase.auth().currentUser.uid
      this.setState({ userID: uid });
    };
     updateSearch = search => {
        this.setState({ search });
        this.makeRemoteRequest();
      };

    btnAddNewPurchase = () => {
      this.props.navigation.navigate('PurchaseEntryScreen');
    }

  render() {
    const { search } = this.state;
    const state = this.state;

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
               placeholder="Filter Purchases Here..."
               onChangeText={this.updateSearch}
               value={search}
         />
        <FlatList
         data={this.state.data}
          renderItem={({ item }) => (
            <ListItem2
                key={item.id}
                text={`${item.trip}\n  ${item.id} \n  Title: ${item.title} - From: ${item.date}\n  Total: ${item.cost}\n `}
                success={this.success}
                onPress={() => this.showEdit(item.id, item.title, item.cost, item.date)}
              //title={`${item.title}From: ${item.date} `}
              //subtitle={`       Total: ${item.cost}`}
              //avatar={{ uri: item.img }}                                //add8e6
              //containerStyle={{ borderBottomWidth: 0, backgroundColor: '#F5F5F5', shadowColor: '#1496BB' }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
         // ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />

      <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.btnAddNewPurchase}
                style={styles.TouchableOpacityStyle}>
                <Image
                  source={require('../../images/fab.png')}
                  style={styles.FloatingButtonStyle}
                />
      </TouchableOpacity>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff', color: '#fff' },
  container2: { flex: 1,  borderRadius: 2, padding: 10, paddingTop: 80, backgroundColor: 'rgba(52, 52, 52, 0.9)' },

  innerContainer: { flex: 1, padding: 0, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 60, backgroundColor: '#c8e1ff' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#f6f8fa' },
  btn: { width: 30, height: 20, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnCancel: { width: 45, height: 20, backgroundColor: '#DC143C',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  btnCancelText: { textAlign: 'center', color: '#fff' },
  btnAdd: { width: 150, height: 20, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnAddText: { textAlign: 'center', color: '#fff' },
    headerLayout: {
      alignItems: 'center',
      backgroundColor: '#78B7BB',
      borderRadius: 1,
      paddingHorizontal: 1,
    },
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

  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
    }
});

PurchaseScreen.navigationOptions = {
    title: "Purchases",
    header: "Purchases",
};

