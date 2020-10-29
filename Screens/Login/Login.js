import React, { Component, useState } from 'react';
import { TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import * as FireBase from "firebase";

export default class Login extends Component {
state = { email: '', password: '', errorMessage: null }
    constructor(props) {
        super(props);
              this.state = {
                   email: "",
                   password: "",
                   errorMessage: "",
              }
       }
  handleLogin = () => {
    const { email, password } = this.state
    this.setState({ errorMessage: null })
    FireBase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))

     if(this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != ""){
        Alert.alert("ERROR:" + this.state.errorMessage)
     }
  }
       goToRegister(){
           this.props.navigation.navigate('Register');
       }
       render() {
           return (
           <View style={styles.container}>
                   <Text style={styles.labelBox}>Login</Text>
                    <View style={styles.rowTiny}></View>
                   <View style={styles.rowSmall}>
                       <TextInput
                           placeholder="Email"
                           autoCapitalize="none"
                           style={styles.txtBox}
                           onChangeText={email => this.setState({ email })}
                           value={this.state.email}
                       />
                   </View>
                   <View style={styles.rowTiny}>
                      <Text style={{fontSize: 14, textAlign: 'center', paddingTop: 10, padding: 5}}></Text>
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
                   <View style={styles.rowTiny}>
                       <Text style={{fontSize: 14, textAlign: 'center', paddingTop: 10}}></Text>
                   </View>
                   <View style={styles.rowSmall}>
                       <View style={{flex: 1}}></View>
                       <View style={{flex: 3}}>
                            <TouchableOpacity onPress={() => this.handleLogin()}>
                               <View style={styles.btnScan}>
                                   <Text style={{fontSize: 18, textAlign: 'center', paddingTop: 10}}>Login</Text>
                               </View>
                            </TouchableOpacity>
                        </View>
                   </View>
                   <View style={styles.rowSmall}>
                       <View style={{flex: 1}}>
                            <TouchableOpacity onPress={() => this.goToRegister()}>
                               <View>
                                   <Text style={{fontSize: 14, textAlign: 'center'}}>Don`t Have An Account? Register Here!</Text>
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
  rowSmall: { flex: 1,
               flexDirection: 'row',
               backgroundColor: '#f6f8fa',
               borderRadius: 0,
               borderWidth: 0,
               borderColor: 'grey',
               padding: 2
  },
 rowTiny: { flex: 0.4,
            flexDirection: 'row',
            backgroundColor: '#f6f8fa',
            textAlign: 'center',
            alignItems: 'center',
            color: 'red',
 },
  btn: {
        width: 30,
        height: 20,
        backgroundColor: '#78B7BB',
        borderRadius: 2
  },
  labelBox: {
         flex: 0.5,
         backgroundColor:'#c8e1ff',
         fontSize: 24,
         textAlign: 'center',
         alignItems: 'center',
         paddingTop: 10,
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

Login.navigationOptions = {
  title: 'Login',
};