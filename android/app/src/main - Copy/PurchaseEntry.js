
import React, { Component, useState } from 'react';
import { TextInput, Alert, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight, View, Text, Button, Platform } from 'react-native';
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
/*
    FIREBASE COMPARED TO ML KIT
    https://heartbeat.fritz.ai/choose-the-right-on-device-text-recognition-sdk-on-android-using-deltaml-9b4b3e409b6e

    FIREBASE ML ARTICLE
    https://heartbeat.fritz.ai/building-text-detection-apps-for-ios-and-android-using-react-native-42fe3c7e339

*/


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
      const imageRef = FireBase.storage().ref("/u7rHv6EXfldDt1oQoC3lKmCLRZX2") //.child('test_img')

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
    let imageRef = FireBase.storage().ref("u7rHv6EXfldDt1oQoC3lKmCLRZX2").child('test_img')
    //let currentUser = FireBase.auth().currentUser
    let image = {
        type: 'image',
        url: downloadUrl,
        createdAt: sessionId,
        user: {
            id: "u7rHv6EXfldDt1oQoC3lKmCLRZX2",
            email: "roarty-c@ulster.ac.uk"
        }
    }
    FireBase.storage().ref('u7rHv6EXfldDt1oQoC3lKmCLRZX2').push(image);
  }
export default class PurchaseEntry extends Component {
constructor(props) {
    super(props);
    this.state = {

        categoryData: [
        'Dinner', 'Lunch', 'Breakfast', 'Fuel', 'Groceries', 'Social', 'Electrical', 'Bills', 'Other...'
        ],
        date: moment().toDate(),
        //time: moment().format('HH:mm:ss'),
        mode: 'date',
        show: false,
        ReceiptName: '',
        CurrencySelected: '',
        Currency: ['£ (GBP)', '$ (USD)', '€ (EUR)', '$ (AUD)'],
        CurrencySymbol: '£',
        Total: 0.00,
        Category: '',
        Comment: '',
        Items: '',
        Reimbursable: false,
        avatarSource: null,
        photo: null,
        uri: '',
        res: null,
        ocr: "",
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
      selectPhotoTapped() {

       const tessOptions = {
        whitelist: null,
        blacklist: '!"#%&/()={}[]+*-_:;<>'
      };
            const cameraOptions = {
              title: 'Upload Photo',
              cancelButtonTitle: 'Cancel',
              takePhotoButtonTitle: 'Take Photo...',
              chooseFromLibraryButtonTitle: 'Choose from Library...',
              quality: 1.0,
              maxWidth: 500,
              maxHeight: 500,
              storageOptions: {
                skipBackup: true,
              },
            };
            ImagePicker.showImagePicker(cameraOptions, response => {

              this.setState({
                 photo: response.uri
              });
              if (response.didCancel) {
                console.log('User cancelled photo picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
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
            Alert.alert("photo   " + this.state.photo)
            if(this.state.photo != null){
               var path = this.state.photo.toString();
               if (path.includes('file://')){
                 path = path.replace('file://', '');
               } else if (path.includes('content://')){
                 path = path.replace('content://', '/');
               } else {  path = null}
                Alert.alert(path)
                if(path != null){
                    RNTesseractOcr.recognize(path, 'LANG_ENGLISH', tessOptions)
                      .then((result) => {
                        this.setState({ ocr: result });
                        Alert.alert("OCR Result: " + result);
                      })
                      .catch((err) => {
                        this.setState({ ocr: err });
                        Alert.alert("OCR Error: " + err);
                      })
                      .done();
                }
            }
              //uriToBlob(response.uri)
             // uriToBlob2(response.uri)
             // uploadToFirebase()
             // this._alertIndex(this.state.photo);
             // this._alertIndex(Blob);
            });
            /*Alert.alert("photo   " + this.state.photo)
            if(this.state.photo != null){
                const path = this.state.photo.toString().replace('file://', '');
                Alert.alert(path)
                if(path != null){
                    RNTesseractOcr.recognize(path, 'LANG_ENGLISH', tessOptions)
                      .then((result) => {
                        this.setState({ ocr: result });
                        Alert.alert("OCR Result: " + result);
                      })
                      .catch((err) => {
                      this.setState({ ocr: err });
                        Alert.alert("OCR Error: " + err);
                      })
                      .done();
                }
            }*/
      }
          btnReturn = () => {
            this.props.navigation.navigate('PurchaseScreen');
          }

      btnAddPurchase(ReceiptName, date, CurrencySelected, Total, Category, Comment, Items, Reimbursable, img){
        var cur = CurrencySelected[0]
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
            //Alert.alert("image5: " + image.name)
            //Alert.alert("image: " + image.type)
            //Alert.alert("image2: " + image.url.toString())
            //Alert.alert("image3: " + image.createdAt)
            //Alert.alert("image4: " + image.user.id)
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
         const android = RNFetchBlob.android
         let body = [{
             name: name,
             type: 'image/jpeg',
             data: RNFetchBlob.wrap(img.toString()),
           }]
         const location = FireBase.storage().ref('u7rHv6EXfldDt1oQoC3lKmCLRZX2')// + name
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
        FireBase.database().ref('u7rHv6EXfldDt1oQoC3lKmCLRZX2/Purchase/' + name).set({
           Title,
           PurchaseDate,
           CurrencySelected,
           Total,
           Category,
           Comment,
           Items,
           Reimbursable,
           img,
        }).then((data)=>{
            //success callback
            Alert.alert("Added Successfully");
            //this.props.navigation.navigate('PurchaseScreen');
            //console.log('data ' , data)
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
                 <TouchableOpacity onPress={() => this.updateReceiptName()}>
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
              <TouchableOpacity onPress={() => this.btnAddPurchase(this.state.ReceiptName, this.state.date, this.state.CurrencySelected, this.state.Total, this.state.Category, this.state.Comment, this.state.Items, this.state.Reimbursable, this.state.photo)}>
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