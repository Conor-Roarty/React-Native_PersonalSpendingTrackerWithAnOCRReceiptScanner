import React, { Component } from 'react';
import { Button, Modal, FlatList, Platform, Image, ScrollView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as FireBase from "firebase";
import ListItem from '../../Helpers/ListItem';

export default class SettingsScreen extends Component {
constructor(props) {
    super(props);
    this.state = {
        uid:  FireBase.auth().currentUser.uid.toString(),
        editCategories: false,
        editDetails: false,
        data: [],
        refreshing: false,
        page: 1,
        seed: 1,
        newCat: "",
        catCount: 0,
        catList: [],
        UserName: FireBase.auth().currentUser.email.toString(),
        Password: "********",
        ConfirmPassword: "********",
        DailyBudget: '0.00',
        WeeklyBudget: '0.00',
        MonthlyBudget: '0.00',
    }
  }
  addCategory = () => {//ERROR THIS IS DELETING ALL OTHER CATEGORIES LOOK INTO
    var newCat = this.state.newCat.toString();
    var newCategories = this.state.catList;
    newCategories.push({
      id: this.state.catCount,
      value: newCat
    });
    FireBase.database().ref(this.state.uid + '/Categories/').set({
              newCategories
            }).then((data)=>{
               //success callback
               Alert.alert("Added Successfully");

               this.setState({newCat: ""});
               this.setState({editCategories: false});

               this.handleRefresh();
               this.getCategories();

            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
                Alert.alert("Error Adding - " + error);
            })
  }
  getCategories = () => {
      var ref = FireBase.database().ref(this.state.uid + '/Categories/newCategories');
      ref.once('value').then(snapshot => {
           var items = [];
           var counter = 0;
           this.setState({ data: null})
           snapshot.forEach((child) => {
             items.push({
                id: child.key,
                value: child.val().value.toString()
             });
             counter = counter + 1;
          });
          if(items.count == 0){
             items.push({
                id: "No Categories",
                value: "Categories All Deleted"
             });
          }
          this.setState({ catList: items})
          this.setState({ catCount: counter})
          this.setState({ data: items})
          this.setState({refreshing: false});
      });
  };
  handleRefresh = () => {
      //Alert.alert("" + this.state.showModal)
        this.setState(
          {
            page: 1,
            refreshing: true
          },
          () => {
            this.getCategories();
          }
        );
      };

  success(key) {
         Alert.alert(
           'Delete Warning',
           'This cannot be undone if you select Confirm',
           [
             {text: 'YES', onPress: () =>  this.deleteEntry(key)},
             {text: 'NO', onPress: () =>  {this.setState({ confirm: false}); this.getCategories();}}
           ]
         );
    }
  deleteEntry(key){
      var record = key.toString();
      var recordID = record.trimStart().toString();
      recordID = recordID.trimEnd().toString();

       FireBase.database().ref(this.state.uid + '/Categories/Categories/' + recordID).remove().then((data)=>{
            //success callback
            Alert.alert("Deleted Successfully");
            console.log('Deleted data: ' , data);
            this.handleRefresh();
            this.getCategories();
        }).catch((error)=>{
            //error callback
            console.log('error ' , error);
            Alert.alert("Error Deleting - " + error);
        })
    }

  handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1
          },
          () => {
            this.editCategories();
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

  btnSignOut = () => {
      FireBase.auth().signOut()
        .then(() => this.props.navigation.navigate('Login'))
        .catch((error) => { Alert.alert('Log Out Error: ' + error)})
  }
  btnEditCategories = () => {
      this.getCategories();
      this.setState({ editCategories: !this.state.editCategories });
    }
    showEditDetails = () => {
        var refUserDetails = FireBase.database().ref(this.state.uid + '/UserDetails/');
        var daily, weekly, monthly;
        refUserDetails.once('value').then(snapshot => {
           snapshot.forEach((child) => {
               if(child.key.toString() === "DailyBudget"){
                   daily = child.val().toString()
               }
               if(child.key.toString() === "WeeklyBudget"){
                   weekly = child.val().toString()
               }
               if(child.key.toString() === "MonthlyBudget"){
                   monthly = child.val().toString()
               }
          });
        });
        this.setState({ DailyBudget: daily });
        this.setState({ WeeklyBudget: weekly });
        this.setState({ MonthlyBudget: monthly });
        this.setState({ editDetails: !this.state.editDetails });

    }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.25}}></View>
        <View style={{flex: 10}}>
            <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => this.showEditDetails()}>
                     <View style={styles.btnAdd}>
                         <Text style={{fontSize: 20, textAlign: 'center'}}>Update Details</Text>
                     </View>
                  </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => Alert.alert('WARNING: This Cannot Be Undone. Everything Will Be Lost')}>
                     <View style={styles.btnAdd}>
                         <Text style={{fontSize: 20, textAlign: 'center'}}>Clear All Entries</Text>
                     </View>
                  </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => Alert.alert('WARNING: This Cannot Be Undone. Everything Will Be Lost & You Must Register Again')}>
                     <View style={styles.btnAdd}>
                         <Text style={{fontSize: 20, textAlign: 'center'}}>Delete Account</Text>
                     </View>
                  </TouchableOpacity>
            </View>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => this.btnEditCategories()}>
                     <View style={styles.btnAdd}>
                         <Text style={{fontSize: 20, textAlign: 'center'}}>Manage Categories</Text>
                     </View>
                  </TouchableOpacity>
            </View>
              <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => Alert.alert('Should`ve Signed Up WIth Email, Run, catch errors, if none alert "sent"')}>
                         <View style={styles.btnAdd}>
                             <Text style={{fontSize: 20, textAlign: 'center'}}>Get Report Emailed Out</Text>
                         </View>
                      </TouchableOpacity>
                </View>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => Alert.alert('Fuck Off, There`s No Problems With My App')}>
                     <View style={styles.btnAdd}>
                         <Text style={{fontSize: 20, textAlign: 'center'}}>Report A Problem</Text>
                     </View>
                  </TouchableOpacity>
            </View>
              <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => Alert.alert('Email For Support')}>
                         <View style={styles.btnAdd}>
                             <Text style={{fontSize: 20, textAlign: 'center'}}>Email For Support</Text>
                         </View>
                      </TouchableOpacity>
                </View>
              <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => Alert.alert('Eww, why would you read the T&Cs')}>
                         <View style={styles.btnAdd}>
                             <Text style={{fontSize: 20, textAlign: 'center'}}>View Documentation</Text>
                         </View>
                      </TouchableOpacity>
                </View>
            <View style={{flex: 1}}></View>
        </View>
           <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.btnSignOut()}>
                 <View style={styles.btnAdd}>
                     <Text style={{fontSize: 20, textAlign: 'center'}}>Log Out</Text>
                 </View>
              </TouchableOpacity>
           </View>
            <Modal
                  animationType={'slide'}
                  transparent={true}
                  visible={this.state.editCategories}>
                  {/*All views of Modal*/}
                  {/*Animation can be slide, fade, none*/}
                 <View style={styles.container2}>
                   <Button title="Return"
                     onPress={() => {
                       this.setState({ editCategories: !this.state.editCategories });
                     }}
                   />
                   <FlatList
                         data={this.state.data}
                         renderItem={({ item }) => (
                           <ListItem
                               key={item.id}
                               text={`\t\t\t\t\t\t\t${item.value}`}
                               success={this.success}
                           />
                         )}
                         keyExtractor={item => item.id}
                         ItemSeparatorComponent={this.renderSeparator}
                         ListFooterComponent={this.renderFooter}
                         onRefresh={this.handleRefresh}
                         refreshing={this.state.refreshing}
                         onEndReachedThreshold={50}
                       />
                 </View>
                 <View style={styles.container3}>
                   <Text style={{width: 150, height: 50, backgroundColor: '#F8F8F8', fontSize: 18}}>        Add Here: </Text>
                   <TextInput style={{width: 200, height: 50, backgroundColor: 'white'}}
                        onChangeText={(value) => this.setState({newCat: value})}
                        value={this.state.newCat}
                   ></TextInput>
                   <Text style={{height: 50, fontSize: 18}}> </Text>
                   <Button style={{height: 50, fontSize: 50}} title="+"
                        onPress={() => {
                          this.addCategory();
                        }}
                   ></Button>
                 </View>
            </Modal>
            <Modal
                  animationType={'slide'}
                  transparent={true}
                  visible={this.state.editDetails}>
                 <ScrollView style={styles.container2}>
                   <Button title="Return Without Saving"
                     onPress={() => {
                       this.setState({ editDetails: !this.state.editDetails });
                     }}
                   />
                <View style={styles.rowSmall}>
                     <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                          <Text style={{fontSize: 22, textAlign: 'center'}}>UserName</Text>
                     </View>
                     <View style={{flex: 2}}>
                        <TextInput name='txtUserName'
                            onChangeText={(value) => this.setState({UserName: value})}
                            value={this.state.UserName}
                            />
                     </View>
                 </View>
                <View style={styles.rowSmall}>
                     <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                          <Text style={{fontSize: 22, textAlign: 'center'}}>Password</Text>
                     </View>
                     <View style={{flex: 2}}>
                        <TextInput name='txtPassword'
                            style={{fontSize: 22, textAlign: 'center'}}
                            onChangeText={(value) => this.setState({Password: value})}
                            value={this.state.Password}
                            />
                     </View>
                 </View>
                 <View style={styles.rowSmall}>
                      <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                           <Text style={{fontSize: 22, textAlign: 'center'}}>Confirm Password</Text>
                      </View>
                      <View style={{flex: 2}}>
                         <TextInput name='txtConfirmPassword'
                             style={{fontSize: 22, textAlign: 'center'}}
                             onChangeText={(value) => this.setState({ConfirmPassword: value})}
                             value={this.state.ConfirmPassword}
                             />
                      </View>
                  </View>
                 <View style={styles.rowSmall}>
                      <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                           <Text style={{fontSize: 22, textAlign: 'center'}}>Daily Budget</Text>
                      </View>
                      <View style={{flex: 2}}>
                         <TextInput name='txtDailyBudget'
                             style={{fontSize: 22, textAlign: 'center'}}
                             onChangeText={(value) => this.setState({DailyBudget: value})}
                             value={this.state.DailyBudget}
                             />
                      </View>
                  </View>
                  <View style={styles.rowSmall}>
                        <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                             <Text style={{fontSize: 22, textAlign: 'center'}}>Weekly Budget</Text>
                        </View>
                        <View style={{flex: 2}}>
                           <TextInput name='txtWeeklyBudget'
                               onChangeText={(value) => this.setState({WeeklyBudget: value})}
                               value={this.state.WeeklyBudget}
                               />
                        </View>
                  </View>
                <View style={styles.rowSmall}>
                      <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                           <Text style={{fontSize: 22, textAlign: 'center'}}>Monthly Budget</Text>
                      </View>
                      <View style={{flex: 2}}>
                         <TextInput name='txtMonthlyBudget'
                             onChangeText={(value) => this.setState({MonthlyBudget: value})}
                             value={this.state.MonthlyBudget}
                             />
                      </View>
                </View>
                <Button title="SAVE"
                 onPress={() => {this.setState({ editDetails: !this.state.editDetails });
                 }}
               />
               <View style={styles.row}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>Please Be Careful When Updating! Budget Responsibly</Text>
               </View>
             </ScrollView>
            </Modal>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff' },
  container2: { flex: 1,  borderRadius: 2, paddingRight: 10,paddingLeft: 10, paddingTop: 80, backgroundColor: 'rgba(52, 52, 52, 0.9)' },
   container3: { flexDirection: 'row', flex:0.1, borderRadius: 2, alignItems: 'center', paddingRight: 10,paddingLeft: 10, paddingTop: 20, backgroundColor: 'rgba(52, 52, 52, 0.9)' },
  innerContainer: { flex: 1, padding: 0, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 60, backgroundColor: '#c8e1ff' },
  text: { margin: 6 },
  row: { flexDirection: 'row', flex: 1.25, backgroundColor: '#f6f8fa' },
  btn: { width: 30, height: 20, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnCancel: { width: 45, height: 20, backgroundColor: '#DC143C',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  btnCancelText: { textAlign: 'center', color: '#fff' },
  btnAdd: { width: 393, height: 50, paddingVertical: 10, backgroundColor: '#78B7BB',  borderRadius: 20, borderWidth: 3 , borderColor: 'black' },
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
        rowSmall: { flex: 1.25,
                 flexDirection: 'row',
                 backgroundColor: '#f6f8fa',
                 borderRadius: 0,
                 borderWidth: 0.5,
                 borderColor: 'grey'
        },
      labelBox: {
             flex: 2,
             backgroundColor:'#c8e1ff',
             borderRadius: 4,
             borderWidth: 1,
             borderColor: 'grey',
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

SettingsScreen.navigationOptions = {
    title: "Settings",
    header: "Settings",
};

