import React, { Component, useState } from 'react';
import { TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform } from 'react-native';
import * as FireBase from "firebase";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
                email: null,
                password: "",
                confirmPassword: "",
                uid: null,
                currentUser: null,
                errorMessage: "",
            }
    }
    handleSignUp(){
       this.setState({ errorMessage: null })
       FireBase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
         .then(() =>{
            this.setState({uid: FireBase.auth().currentUser.uid});
            var name = this.state.email.split("@");
            var userDetails = FireBase.database().ref(this.state.uid + '/UserDetails/').set({
                UserName: name[0],
                DailyBudget: 20,
                WeeklyBudget: 140,
                MonthlyBudget: 600,
            }).then((data)=>{console.log(data)
            }).catch((error)=>{this.setState({ errorMessage: error.message.toString() })})

            var categories = FireBase.database().ref(this.state.uid + '/Categories').set({
                "newCategories" : [ {
                     "id" : "0",
                     "value" : "Dinner"
                   }, {
                     "id" : "1",
                     "value" : "Lunch"
                   }, {
                     "id" : "2",
                     "value" : "Breakfast"
                   }, {
                     "id" : "3",
                     "value" : "Sweets"
                   }, {
                     "id" : "4",
                     "value" : "Fuel"
                   }, {
                     "id" : "5",
                     "value" : "Groceries"
                   }, {
                     "id" : "6",
                     "value" : "Social"
                   }, {
                     "id" : "7",
                     "value" : "Electrical"
                   }, {
                     "id" : "8",
                     "value" : "Bills"
                   },  {
                     "id" : "9",
                     "value" : "Retail"
                   },{
                     "id" : "10",
                     "value" : "Other..."
                   } ]
            }).then((data)=>{console.log(data)
            }).catch((error)=>{this.setState({ errorMessage: error.message.toString() })})

         }).catch(error => this.setState({ errorMessage: error.message.toString() }))

         if(this.state.errorMessage != null && this.state.errorMessage != ""){
            Alert.alert("ERROR:" + this.state.errorMessage.toString())
         } else {
            //this.props.navigation.navigate('Main');
         }
     }
    goToLogin(){
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.labelBox}>Sign Up</Text>
                <View style={styles.rowSmall}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        style={styles.txtBox}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.rowSmall}>
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        style={styles.txtBox}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                </View>
                    <View style={styles.rowSmall}>
                        <TextInput
                            secureTextEntry
                            placeholder="Confirm Password"
                            autoCapitalize="none"
                            style={styles.txtBox}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            value={this.state.confirmPassword}
                        />
                    </View>
                <View style={styles.rowSmall}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 3}}>
                         <TouchableOpacity onPress={() => this.handleSignUp()}>
                            <View style={styles.btnScan}>
                                <Text style={{fontSize: 18, textAlign: 'center', paddingTop: 10}}>Register</Text>
                            </View>
                         </TouchableOpacity>
                     </View>
                </View>
                <View style={styles.rowLarge}>
                    <View style={{flex: 1}}>
                         <TouchableOpacity onPress={() => this.goToLogin()}>
                            <View>
                                <Text style={{fontSize: 14, textAlign: 'center'}}>Already Have An Account? Login Here!</Text>
                            </View>
                         </TouchableOpacity>
                     </View>
                </View>
                <View style={styles.rowLarge}></View>
                <View style={styles.rowLarge}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: '#fff' },
  row: { flex: 1.5,
         flexDirection: 'row',
         backgroundColor: '#f6f8fa',
         borderRadius: 0,
         borderWidth: 0,
         borderColor: 'grey'
  },
  rowLarge: { flex: 1.75,
         flexDirection: 'row',
         backgroundColor: '#f6f8fa',
         borderRadius: 0,
         borderWidth: 0,
         borderColor: 'grey'
  },
  rowSmall: { flex: 1.25,
           flexDirection: 'row',
           backgroundColor: '#f6f8fa',
           borderRadius: 0,
           borderWidth: 0,
           borderColor: 'grey'
  },
  btn: {
        width: 30,
        height: 20,
        backgroundColor: '#78B7BB',
        borderRadius: 2
  },
  labelBox: {
         flex: 1,
         backgroundColor:'#c8e1ff',
         fontSize: 36,
         textAlign: 'center',
         alignItems: 'center',
         paddingTop: 15,
  },
    txtBox: {
           flex: 2,
           borderRadius: 4,
           borderWidth: 1,
           borderColor: 'grey',
           fontSize: 24,
    },
  btnScan: {
        width: 100,
        height: 50,
        textAlign: 'center',
        backgroundColor: '#78B7BB',
        borderRadius: 10,
        alignItems:'center',
        marginTop:20,
        marginBottom:10,
        marginRight:15,
        marginLeft:50,
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

Register.navigationOptions = {
  title: 'Register',
};