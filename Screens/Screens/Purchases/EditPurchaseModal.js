import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, PanResponder} from 'react-native';
import { Alert, RefreshControl, TextInput, Button,  Modal, ScrollView,  StatusBar, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchToggle from 'react-native-switch-toggle';
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from "moment";

const {width} = Dimensions.get('window');

export default class EditPurchaseModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        editPurchaseVisible: false,
        rendered: false,
        categoryData: [
        'Dinner', 'Lunch', 'Breakfast', 'Sweets', 'Fuel', 'Groceries', 'Social', 'Electrical', 'Bills', 'Other...'
        ],
        mode: 'date',
        show: false,
        ReceiptName: '',
        CurrencySelected: "",
        Currency: ['£ (GBP)', '$ (USD)', '€ (EUR)', '$ (AUD)'],
        Total: "",
        Category: '',
        Comment: '',
        Items: '',
        Reimbursable: false,
        date: moment().toDate(),
        currIndex: 0,
    }

  }
    getParsedDate(strDate){
        return(moment(strDate).format('DD-MM-YYYY'))
    }
    setDate = (event, date) => {
        date = date || this.state.date;
        this.setState({
          show: Platform.OS === 'ios' ? true : false,
          date: date,
        });
    }
    show = mode => {
    this.setState({
      show: true,
      mode,
    });
    }
    datepicker = () => {
      this.show('date');
    }
  setModalVisibility = () =>  {
        this.setState({editPurchaseVisible: !this.state.editPurchaseVisible})
  }
    onPress1 = () => {
      this.setState({ Reimbursable: !this.state.Reimbursable });
    }
  render() {
    return (
      <View style={styles.listItem}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.editPurchaseVisible}>
              {/*All views of Modal*/}
              {/*Animation can be slide, fade, none*/}
              <ScrollView style={styles.container2}>
                 <Button title="Return Without Saving" onPress={() => this.setModalVisibility()}/>
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

                              </View>
                          </View>
                          <View style={styles.row}>
                              <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                                   <Text style={{fontSize: 18, textAlign: 'center'}}>Total</Text>
                              </View>
                              <View style={{flex: 2}}>
                                 <TextInput name='txtPurchaseTotal'

                                    />
                              </View>
                          </View>
                          <View style={styles.row}>
                             <View style={{flex: 2, backgroundColor:'#c8e1ff'}}>
                                  <Text style={{fontSize: 18, textAlign: 'center'}}>Category</Text>
                             </View>
                             <View style={{flex: 2}}>

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
                                        <Button onPress={() => this.datepicker} title="Date" />
                                    </View>
                                </View>
                                { this.show &&
                                    <DateTimePicker
                                        value={moment().toDate()}
                                        mode={this.state.mode}
                                        display="default"
                                        onChange={this.setDate} />
                                }
                                <View style={{flex: .75}}>
                                    <Text style={{fontSize: 18, textAlign: 'center'}}>{this.getParsedDate(this.state.date)}</Text>
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
                                 <TouchableOpacity>
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
                              <TouchableOpacity onPress={() => this.btnAddPurchase(this.state.ReceiptName, this.state.date, this.state.CurrencySelected, this.state.Total, this.state.Category, this.state.Comment, this.state.Items, this.state.Reimbursable, this.state.photo)}>
                                 <View style={styles.btnFinished}>
                                     <Text style={{fontSize: 18, textAlign: 'center'}}>Update Purchase</Text>
                                 </View>
                              </TouchableOpacity>
                           </View>
                        </View>

              </ScrollView>
            </Modal>

      </View>
    );
  }
}
/*
<Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.editPurchaseVisible}>
              {}
              {}
              <ScrollView style={styles.container2}>
                 <Button title="Return Without Saving" onPress={() => this.setModalVisibility()}/>
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
                                { this.show && <DateTimePicker value={this.state.date}
                                    mode={this.state.mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.setDate} />
                                }
                                <View style={{flex: .75}}>
                                    <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.date}</Text>
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
                                 <TouchableOpacity>
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
                              <TouchableOpacity onPress={() => this.btnAddPurchase(this.state.ReceiptName, this.state.date, this.state.CurrencySelected, this.state.Total, this.state.Category, this.state.Comment, this.state.Items, this.state.Reimbursable, this.state.photo)}>
                                 <View style={styles.btnFinished}>
                                     <Text style={{fontSize: 18, textAlign: 'center'}}>Update Purchase</Text>
                                 </View>
                              </TouchableOpacity>
                           </View>
                        </View>

              </ScrollView>
            </Modal>
            */
const styles = StyleSheet.create({
  container2: { flex: 1,  borderRadius: 2, padding: 10, paddingTop: 80, backgroundColor: 'rgba(52, 52, 52, 0.9)' },
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
  listItem: {
    height: 80,
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: '#e50000',
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#F5F5F5',
  },
  absoluteCellText: {
    margin: 16,
    fontSize: 18,
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  innerCell: {
    width: width,
    height: 80,
    fontSize: 36,
    marginLeft: 100,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#F5F5F5',
  },
});