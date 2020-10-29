
import React, { Component, useState } from 'react';
import { SafeAreaView, TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform, YellowBox } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchToggle from 'react-native-switch-toggle';
import ImagePicker from 'react-native-image-picker';
import moment from "moment"; //https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4
import * as FireBase from "firebase";
//import * as firebase from 'firebase/app';
import 'firebase/storage'
import RNFetchBlob from  "react-native-fetch-blob"
import RNTesseractOcr from 'react-native-tesseract-ocr';
import PurchaseScreen from "./PurchaseScreen";
import SubHeader from '../SubHeader';

//FETCH API https://docs.expo.io/versions/latest/react-native/network/?redirected
//medium.com/@joananespina/uploading-to-firebase-storage-with-react-native-39f4a500dbcb

//import FireStore from '@react-native-firebase/firestore';
//error start https://stackoverflow.com/questions/58120990/question-getting-error-on-react-native-start
//https://medium.com/@davidjsehl/react-native-and-the-infamous-blob-uploading-images-to-firebase-b1a440f9e078

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const uriToBlob = (photo) => {
   return(dispatch) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const uploadUri = Platform.OS === 'ios' ? photo.replace('file://','') : photo

      const sessionId = new Date().getTime()
      let uploadBlob = null
      let mime = 'application/octet-stream'
      const store = FireBase.storage().getInstance()
      const imageRef = FireBase.storage().ref("/" + this.state.uid) //.child('test_img')

      Alert.alert("image Ref " + imageRef)//gs://expenseless1.appspot.com/u7rHv6EXfldDt1oQoC3lKmCLRZX2/TestUploadFromCamera.JPG
      //Alert.alert(`FS , ${fs} ,`)
      let data = fs.readFile(uploadUri, 'base64')
      //Alert.alert(`test , ${data} ,`)
      .then((data) => {
        //let mime = 'application/octet-stream'
        return Blob.build(data, { type: `application/octet-stream;BASE64` })
      })
      .then((blob) => {
      //Alert.alert(`BLOB , ${blob} , ${mime} ,`)
      //Alert.alert("blob  " + blob)
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        Alert.alert(`dURL , ${imageRef.getDownloadURL()} ,`)
        //Alert.alert("download url  " + imageRef.getDownloadURL())
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        Alert.alert(`url , ${url} ,`)
        resolve(url)
        storeReference(url, sessionId)
      })
      .catch((error) => {
        console.log(error)
        //Alert.alert(`error  , ${testerror} ,`)
        //reject(error)
      })
    })
  }
}

const storeReference = (downloadUrl, sessionId) => {
    let imageRef = FireBase.storage().ref(this.state.uid).child('test_img')
    //let currentUser = FireBase.auth().currentUser
    let image = {
        type: 'image',
        url: downloadUrl,
        createdAt: sessionId,
        user: {
            id: this.state.uid,
            email: "roarty-c@ulster.ac.uk"
        }
    }
    FireBase.storage().ref(this.state.uid).push(image);
  }

export default class PurchaseEntry extends Component {
constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Deprecation warning:','Warning: componentWillReceiveProps']);
    this.state = {
        uid: FireBase.auth().currentUser.uid.toString(),
        Trips: global.TripSwitch,
        TripsList: [],
        TripName: "",
        refreshing: true,
        categoryData: [
        'Dinner', 'Lunch', 'Breakfast', 'Sweets', 'Fuel', 'Groceries', 'Social', 'Electrical', 'Bills', 'Other...'
        ],
        date: moment().toDate(),
        //time: moment().format('HH:mm:ss'),
        mode: 'date',
        show: false,
        ReceiptName: '',
        CurrencySelected: null,
        Currency: ['£ (GBP)', '$ (USD)', '€ (EUR)', '$ (AUD)'],
        currIndex: 0,
        Total: null,
        Category: '',
        Comment: '',
        Items: '',
        Reimbursable: false,
        avatarSource: null,
        photo: null,
        uri: '',
        res: null,
        ocr: "",
        currentUser: null,
        today: moment().toDate(),
        opacity: 0,
    }
    this.ref = React.createRef();
    this.ref2 = React.createRef();
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.updateSwitch = this.updateSwitch.bind(this);
  }
    updateSwitch() {
      this.setState({ Trips: global.TripSwitch });
    }
    componentDidUpdate(){

    }
    componentDidMount() {
        this.getCategories();
        this.makeRemoteRequest();
    }
      makeRemoteRequest = () => {
        if(global.TripSwitch){

           this.setState({ opacity: 1 })
           var ref = FireBase.database().ref(this.state.uid + '/Trips');
           ref.once('value').then(snapshot => {
                   var items = [];
                   this.setState({ TripsList: null})
                   snapshot.forEach((child) => {
                      var eHolder = child.val().EndDate.split('-');
                      var End =eHolder[1] + "/" + eHolder[0] + "/" +eHolder[2];
                      eDate = moment(End);

                      if((eDate.diff(this.state.today, 'days') > -7)){
                        items.push(child.val().TripName.toString());
                      }
                   });

                   this.setState({ TripsList: items })
               });
           } else { this.setState({ opacity: 0 })}
      };
getCategories = () => {
      var ref = FireBase.database().ref(this.state.uid + '/Categories/newCategories');
      var cats = [];
      ref.once('value').then(snapshot => {
           var items = [];
           var counter = 0;
           this.setState({ data: null})
           snapshot.forEach((child) => {
             cats.push(child.val().value.toString());
          });
          this.setState({ categoryData: cats})
      });
  };
      selectPhotoTapped() {

       const tessOptions = {
        whitelist: "abcdefghijgklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,£$€",
        blacklist: '!"#%&()=/\\{}[]+*-_<>""!^`@?¬-'
      };
            const cameraOptions = {
              title: 'Upload Photo',
              cancelButtonTitle: 'Cancel',
              takePhotoButtonTitle: 'Take Photo...',
              chooseFromLibraryButtonTitle: 'Choose from Library...',
              quality: 1.0,
              maxWidth: 900,
              maxHeight: 900,
              storageOptions: {
                skipBackup: false,
              },
            };
            ImagePicker.showImagePicker(cameraOptions, response => {

              this.setState({
                 photo: response.uri
              });
              if (response.didCancel) {
                console.log('User cancelled photo picker');
              } else if (response.error) {
                Alert.alert('Image Picker Error: ', response.error);
              } else if (response.takePhotoButtonTitle) {
                  // Launch Camera:
                  let source = {uri: response.uri};
                  ImagePicker.launchCamera(cameraOptions, (uri) => {
                      this.setState({
                        photo: source,
                        res: response
                      });
                  });
              }
              else if (response.chooseFromLibraryButtonTitle){
                  // Open Image Library:
                  let source = {uri: response.uri};
                  ImagePicker.launchImageLibrary(cameraOptions, (uri) => {
                      this.setState({
                        photo: source,
                        res: response
                      });
                  });
              } else {
                console.log('Unknown Error: ', response.error);
              }
            //Alert.alert("photo   " + this.state.photo)
            if(this.state.photo != null){
               var path = this.state.photo.toString();
               if (path.includes('file://')){
                 path = path.replace('file://', '');
               } else if (path.includes('content://')){
                 //Bitmap imageBitmap = null;
                 //path = path.replace('content://', '');
                 //path = 'document/primary:Download/Receipt2.JPG'
               } else {  path = null}
                //Alert.alert(path)
                if(path != null){
                    RNTesseractOcr.recognize(path, 'LANG_ENGLISH', tessOptions)
                      .then((result) => {
                        var regNum = new RegExp('^[0-9]+$');

                        if(this.state.ReceiptName.toString() === null || this.state.ReceiptName.toString() === "" || this.state.ReceiptName.toString() === " "){
                            var resultTitle = result.substr(0, 20)
                            this.setState({ReceiptName: resultTitle})
                        } else {

                        }

                        result = result.toLowerCase()

                        if(result.indexOf('grocery') > -1 || result.indexOf('groceries') > -1 || result.indexOf('supermarket') > -1 || result.indexOf('foods') > -1){// || result.indexOf('super market') > -1  || result.indexOf('asda') > -1  || result.indexOf('tesco') > -1 || result.indexOf('sainsburys') > -1 || result.indexOf('whole foods') > -1 || result.indexOf('wholefoods') > -1){
                            this.setState({Category: 'Groceries'});
                            this.ref2.current.select(5);
                        }else if(result.indexOf('restaurant') > -1 || result.indexOf('dinner') > -1 || result.indexOf('starter') > -1 || result.indexOf('dessert') > -1){
                            this.setState({Category: 'Dinner'});
                            this.ref2.current.select(0);
                        }else if(result.indexOf('retail') > -1 || result.indexOf('shirt') > -1 || result.indexOf('dress') > -1 || result.indexOf('skirt') > -1 || result.indexOf('jacket') > -1 || result.indexOf('shoes') > -1){
                            this.setState({Category: 'Retail'});
                            this.ref2.current.select(13);
                        }else if(result.indexOf('party') > -1 || result.indexOf('wine') > -1 || result.indexOf('beer') > -1 || result.indexOf('music') > -1){
                            this.setState({Category: 'Social'});
                            this.ref2.current.select(6);
                        }else if(result.indexOf('cake') > -1 || result.indexOf('sweets') > -1){
                            this.setState({Category: 'Sweets'});
                            this.ref2.current.select(3);
                        }else if(result.indexOf('fuel') > -1 || result.indexOf('petrol') > -1 || result.indexOf('diesel') > -1){
                            this.setState({Category: 'Fuel'});
                            this.ref2.current.select(4);
                        }else if(result.indexOf('breakfast') > -1 || result.indexOf('fry') > -1 || result.indexOf('cereal ') > -1 || result.indexOf('toast') > -1){
                            this.setState({Category: 'Breakfast'});
                            this.ref2.current.select(2);
                        }else if(result.indexOf('lunch') > -1 || result.indexOf('sandwich') > -1 || result.indexOf('soup') > -1){
                            this.setState({Category: 'Lunch'});
                            this.ref2.current.select(1);
                        }else if(result.indexOf('invoice') > -1 || result.indexOf('bill') > -1){
                            this.setState({Category: 'Bills'});
                            this.ref2.current.select(8);
                        }else{
                            this.setState({Category: 'Other...'});
                            this.ref2.current.select(9);
                        }

                        var indexTotal = result.lastIndexOf('total')
                        if(indexTotal == -1){
                            indexTotal = result.lastIndexOf('tota1');
                        }
                        if(indexTotal == null || indexTotal < 0){
                            indexTotal = result.lastIndexOf('amount')
                        }
                        var resultTotal = result.substr(indexTotal)
                        resultTotal = resultTotal.substr(0, 13)
                        resultTotal = resultTotal.replace(/[a-zA-Z]/g, "")
                        resultTotal = resultTotal.replace(" ", "")

                        if(resultTotal[0] == "£"){
                            //TRIM FIRST AND SET CURRENCY AND TOTAL
                            resultTotal = resultTotal.replace("£", "");
                            this.setState({CurrencySelected: '£ (GBP)'})
                            this.ref.current.select(0);
                        }
                        else if(resultTotal[0] == "$"){
                            //TRIM FIRST AND SET CURRENCY AND TOTAL
                            resultTotal = resultTotal.replace("$", "");
                            this.setState({CurrencySelected: '$ (USD)'});
                            this.ref.current.select(1);
                        }
                        else if(resultTotal[0] == "€"){
                             //TRIM FIRST AND SET CURRENCY AND TOTAL
                             resultTotal = resultTotal.replace("€", "");
                             this.setState({CurrencySelected: '€ (EUR)'});
                             this.ref.current.select(2);
                        }
                        else{
                            if(result.indexOf('£') > -1){this.setState({CurrencySelected: '£ (GBP)'});this.ref.current.select(0);}
                            else if(result.indexOf('$') > -1){this.setState({CurrencySelected: '$ (USD)'});this.ref.current.select(1);}
                            else if(result.indexOf('€') > -1){this.setState({CurrencySelected: '€ (EUR)'});this.ref.current.select(2);}
                        }
                        //SET TOTAL
                        if(Math.abs(resultTotal) != "NaN"){
                            this.setState({ Total: resultTotal });
                        } else {
                            Alert.alert("Error Reading Total '" + resultTotal +"' As Money")
                        }

                        //Alert.alert("Math Abs: " + Math.abs(resultTotal));
                        //Alert.alert("index: " + resultTotal);
                        this.setState({ ocr: result });

                      })
                      .catch((err) => {
                        this.setState({ ocr: err });
                        Alert.alert("OCR Error: " + err);
                      })
                      .done();
                }
            }
//              var current = this.state.ocr.length
//              Alert.alert("length: " + current)

              //uriToBlob(response.uri)
             // uriToBlob2(response.uri)
             // uploadToFirebase()
             // this._alertIndex(this.state.photo);
             // this._alertIndex(Blob);
            });
      }

      btnReturn = () => {
        this.props.navigation.navigate('PurchaseScreen');
      }
      getUserID = () => {
        Alert.alert(this.state.uid);
      }

      _onRefresh = () => {
          this.setState({refreshing: true});
          fetchData().then(() => {
              this.setState({refreshing: false});
          });
      }

      btnAddPurchase(ReceiptName, date, CurrencySelected, Total, Category, Comment, Items, Reimbursable, img, trip){
        var currency = CurrencySelected[0]
        var itemList = Items.toString();// THIS NEEDS UPDATED WHEN LOGIN EXISTS

        if(ReceiptName == null){var Title = "Nameless"}
        else {var Title = ReceiptName}

        const fileStorage = FireBase.storage().ref();

        //https://medium.com/@joananespina/uploading-to-firebase-storage-with-react-native-39f4a500dbcb
        //https://medium.com/@joananespina/uploading-to-firebase-storage-with-react-native-39f4a500dbcb

       // const imageStore = {
         //   receipt: {
         //       pic: require("file:///storage/emulated/0/Android/data/com.expenseless/files/Pictures/image-6a5f0eb3-abb2-4a3f-9e0a-38b6174e6cb4.jpg")
         //   }
        //}
        //let receiptImg = require("file:///storage/emulated/0/Android/data/com.expenseless/files/Pictures/image-6a5f0eb3-abb2-4a3f-9e0a-38b6174e6cb4.jpg")
        //Alert.alert("img: " + receiptImg)
        var PurchaseDate = this.getParsedDate(date);
        var PurchaseTime = this.getParsedTime(date);
        PurchaseDate = PurchaseDate.replace('/','-');
        const name = Title + '-' + (PurchaseDate) + '-' + (PurchaseTime);
        /*    let image = {
                name: name,
                type: 'image/jpeg',
                url: img,
                createdAt: name,
                user: {
                    id: "u7rHv6EXfldDt1oQoC3lKmCLRZX2",
                    email: "roarty-c@ulster.ac.uk"
                }
            }
            const usersStorage = FireBase.storage().ref('u7rHv6EXfldDt1oQoC3lKmCLRZX2')
            Alert.alert("storage ref: " + usersStorage)
            usersStorage.putString(image.name)*/
            //usersStorage.putFile(image)
            //FireBase.storage().ref('u7rHv6EXfldDt1oQoC3lKmCLRZX2').putFile({
            //  name: name,
            //  type: 'image/jpeg',
            //  url: img,
            //  createdAt: date,
            //  user: {
            //      id: "u7rHv6EXfldDt1oQoC3lKmCLRZX2",
            //      email: "roarty-c@ulster.ac.uk"
            //  }
            //})
           //FireBase.storage().ref('u7rHv6EXfldDt1oQoC3lKmCLRZX2').put(image);
        //const upload = fileStorage.child("u7rHv6EXfldDt1oQoC3lKmCLRZX2/").put(img);
        //gs://expenseless1.appspot.com/u7rHv6EXfldDt1oQoC3lKmCLRZX2
         //Alert.alert("TEST: " + fileStorage);
         if(img != null){
           const android = RNFetchBlob.android
           let body = [{
             name: name,
             type: 'image/jpeg',
             data: RNFetchBlob.wrap(img.toString()),
           }]
         }
         const location = FireBase.storage().ref(this.state.uid)// + name
         /*RNFetchBlob.fetch('POST', location,{
                           'Content-Type': 'application/octet-stream',
                           }, body)
           .progress((received, total) => {
             let percent = received / total
             Alert.alert(percent)
           }).then((response) => response.json()).then((response) => {
             Alert.alert(response)
           }).catch((error) => {
             Alert.alert(error.toString())
           })*/
        // RNFetchBlob.fetch('POST', location, { 'Transfer-Encoding' : 'Chunked' }, body)
        /* RNFetchBlob.fetch('POST', 'gs://expenseless1.appspot.com/u7rHv6EXfldDt1oQoC3lKmCLRZX2', {
             // dropbox upload headers
             Authorization : "Bearer access-token...",
             'Dropbox-API-Arg': JSON.stringify({
               path : img,
               mode : 'add',
               autorename : true,
               mute : false
             }),
             'Content-Type' : 'application/octet-stream',
             // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
             // Or simply wrap the file path with RNFetchBlob.wrap().
           }, RNFetchBlob.wrap(img))
           .then((res) => {
             console.log(res.text())
           })
           .catch((err) => {
             // error handling ..
             Alert.alert("error: "+err)
           })*/


         //uriToBlob2(img)
         //uploadToFirebase()
         if(trip === null || trip === ""){
            FireBase.database().ref(this.state.uid + '/Purchase/' + name).set({
               Title,
               PurchaseDate,
               currency,
               Total: Number(Total),
               Category,
               Comment,
               Items,
               Reimbursable,
               img,
               trip
            }).then((data)=>{
                //success callback
                Alert.alert("Added Successfully");
               // this.props.navigation.navigate('PurchaseScreen');

               //reset vars
               this.setState({PurchaseDate: moment().toDate()})
                //console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
                Alert.alert("Error Adding - " + error);
            })
        } else {
            FireBase.database().ref(this.state.uid + '/Purchase/' + name).set({
               Title,
               PurchaseDate,
               currency,
               Total: Number(Total),
               Category,
               Comment,
               Items,
               Reimbursable,
               img,
               trip
            }).then((data)=>{
                //success callback
                Alert.alert("Added Successfully");
               // this.props.navigation.navigate('PurchaseScreen');

               //reset vars
               this.setState({PurchaseDate: moment().toDate()})
                //console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
                Alert.alert("Error Adding - " + error);
            })
            var ref = FireBase.database().ref(this.state.uid + '/Trips');
            var key = "";
            var currentTotal = 0;
            ref.once('value').then(snapshot => {
                snapshot.forEach((child) => {
                    if(child.key.toString().indexOf(trip.toString()) > -1){
                       currentTotal = Number(child.val().TotalSpent)
                       currentTotal = currentTotal + Number(Total)
                       key = child.key;

                       var TripName = child.val().TripName;
                       var StartDate = child.val().StartDate;
                       var EndDate = child.val().StartDate;
                       var CurrencySelected = child.val().CurrencySelected;
                       var Limit = Number(child.val().Limit);
                       var Category = child.val().Category;
                       var Comment = child.val().Comment;
                       var Cancelled = child.val().Cancelled;

                       var tripRef = FireBase.database().ref(this.state.uid + '/Trips/' + key).set({
                           TripName: TripName,
                           StartDate: StartDate,
                           EndDate: EndDate,
                           CurrencySelected: CurrencySelected,
                           Limit: Number(Limit),
                           TotalSpent: Number(currentTotal),
                           Category: Category,
                           Comment: Comment,
                           Cancelled: Cancelled

                       });
                    }
                });
            });
        }
    };

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
        });
    }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }
  updateReceiptName = (e) => {
    this.setState({
      ReceiptName: e
    })
  }
  datepicker = () => {
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
    const { photo } = this.state;
    return (
    <View style={styles.container}>
            <SafeAreaView>
             <ScrollView
               contentInsetAdjustmentBehavior="automatic"
               style={styles.scrollView}>
               <SubHeader />
             </ScrollView>
           </SafeAreaView>
        <ScrollView>
        <View style={styles.rowLarge}>
            <View style={{flex: 1, backgroundColor:'#0A6EC2'}}>
               <TouchableOpacity onPress={() => this.btnReturn()}>
                      <Text style={{fontSize: 24, textAlign: 'left', color: 'white'}}>Return |</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 3.75, backgroundColor:'#0A6EC2'}}>
                <Text style={{fontSize: 24, textAlign: 'center', color: 'white'}}>New Purchase</Text>
            </View>
        </View>
         <View style={{ flex:4, opacity:this.state.opacity, flexDirection:'row', backgroundColor:'#f6f8fa', borderWidth: 0.25, borderColor:'grey'}} >
          <View hide={this.state.Trips} style={{flex: 2, backgroundColor:'#c8e1ff'}}>
              <Text style={{fontSize: 18, textAlign: 'center'}}>Trip</Text>
          </View>
          <View hide={this.state.Trips} style={{flex: 2}}>
             <ModalDropdown
                    onSelect={(index,value)=>{this.setState({TripName:value})}}
                    style={{flex: 7, fontSize: 18, textAlign: 'left'}}
                    textStyle={{fontSize: 18, textAlign: 'center'}}
                    dropdownTextStyle={{fontSize:18, textAlign: 'left', width:300}}
                    options={this.state.TripsList}
                    >
             </ModalDropdown>
          </View>
      </View>
         <View style={styles.rowSmall}>
               <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                   <Text style={{fontSize: 18, textAlign: 'center'}}>
                   Receipt Name</Text>
               </View>
               <View style={{flex: 2}}>
                    <TextInput key='txtNewReceiptName'
                    onChangeText={(value) => this.setState({ReceiptName: value})}
                    value={this.state.ReceiptName}
                    />
               </View>
          </View>
          <View style={styles.row}>
              <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Currency</Text>
              </View>
              <View style={{flex: 2}}>
                 <ModalDropdown
                        ref={this.ref}
                        onSelect={(index,value)=>{this.setState({CurrencySelected:value, currIndex:index})}}
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
                   <Text style={{fontSize: 18, textAlign: 'center'}}>Total</Text>
              </View>
              <View style={{flex: 2}}>
                 <TextInput name='txtPurchaseTotal'
                    onChangeText={(value) => this.setState({Total: value})}
                    value={this.state.Total}
                    />
              </View>
          </View>
          <View style={styles.row}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Category</Text>
             </View>
             <View style={{flex: 2}}>
                 <ModalDropdown
                     ref={this.ref2}
                     onSelect={(index,value)=>{this.setState({Category:value})}}
                     style={{fontSize: 18, textAlign: 'center'}}
                     textStyle={{fontSize: 18, textAlign: 'center'}}
                     dropdownTextStyle={{fontSize:18, textAlign: 'center', width:300}}
                     options={this.state.categoryData}
                 >
                 </ModalDropdown>
             </View>
          </View>
          <View style={styles.rowLarge}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Purchase Date</Text>
             </View>
             <View style={{flex: 2}}>
                 <View style={{flex: .75, flexDirection: 'row', alignItem:'center'}}>
                 <Text>                   </Text>
                    <View style={{flex: .5, flexDirection: 'row', marginTop: 5}}>
                        <Button onPress={this.datepicker} title="Date" />
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
          <View style={styles.rowSmall}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Items</Text>
             </View>
             <View style={{flex: 1}}>
                <TextInput name='txtNewItems'
                    onChangeText={(value) => this.setState({Items: value})}
                    value={this.state.Items}
                    //onChangeText={(value) => ({ Items: [...this.state.Items, value] })}
                />
             </View>
             <View style={{flex: 1}}>
                 <TouchableOpacity onPress={() => this.getUserID()}>
                    <View style={styles.btnAddItem}>
                        <Text style={{fontSize: 24, textAlign: 'center'}}>+</Text>
                    </View>
                  </TouchableOpacity>
             </View>
          </View>
          <View style={styles.rowSmall}>
             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>Reimbursable</Text>
             </View>
             <View style={{flex: .3}}></View>
             <View style={{flex: 1.7, flexDirection: 'row'}}>
             <Text style={{marginTop: 3, fontSize: 18, textAlign: 'center'}}>No  </Text>
                     <SwitchToggle
                         containerStyle={{
                              marginTop: 5,
                              width: 60,
                              height: 30,
                              borderRadius: 27.5,
                              padding: 5,
                           }}
                           backgroundColorOn='grey'
                           backgroundColorOff='lightgrey'
                           circleStyle={{
                             width: 20,
                             height: 20,
                             borderRadius: 27.5,
                             backgroundColor: 'blue', // rgb(102,134,205)
                           }}
                           switchOn={this.state.Reimbursable}
                           onPress={this.onPress1}
                           circleColorOff='#2e85b8'
                           circleColorOn='#78B7BB'
                           duration={500}
                     />
              <Text style={{marginTop: 3, fontSize: 18, textAlign: 'center'}}>  Yes</Text>
             </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1.5}}>
              <View style={{flex: 2}}>
                 <View style={{flex: .5}}></View>
                 <View style={{flex: 1.5}}>
                 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                   <View style={styles.btnScan}>
                       <Text style={{fontSize: 18, textAlign: 'center'}}>Scan Receipt</Text>
                   </View>
                 </TouchableOpacity>
                 </View>
              </View>
           <View style={{flex: 2}}>
              <TouchableOpacity onPress={() => this.btnAddPurchase(this.state.ReceiptName, this.state.date, this.state.CurrencySelected, this.state.Total, this.state.Category, this.state.Comment, this.state.Items, this.state.Reimbursable, this.state.photo, this.state.TripName)}>
                 <View style={styles.btnFinished}>
                     <Text style={{fontSize: 18, textAlign: 'center'}}>Add Purchase</Text>
                 </View>
              </TouchableOpacity>
           </View>
        </View>
            <View style={{flex: 5, flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 2}}>
            <TouchableHighlight>
                 <Image id="imgReceipt" source={{uri: this.state.photo}} style={{width: 200, height: 200}}/>
            </TouchableHighlight>
            </View>
            <View style={{flex: 1}}></View>
            </View>
            <View style={{flex: 5, flexDirection: 'row'}}>
                <Text> {this.state.ocr} </Text>
            </View>
        </ScrollView>
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
    rowLargeTrip: { flex: 2,

           flexDirection: 'row',
           backgroundColor: '#f6f8fa',
           borderRadius: 0,
           borderWidth: 0.25,
           borderColor: 'grey',
           //opacity: this.state.opacity
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
  btnScan: {
        width: 70,
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

PurchaseEntry.navigationOptions = {
  title: 'Log A Purchase',
};