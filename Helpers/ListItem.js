import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, PanResponder} from 'react-native';
import { Alert, RefreshControl, TextInput, Button,  Modal, ScrollView,  StatusBar, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchToggle from 'react-native-switch-toggle';
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from "moment";

const {width} = Dimensions.get('window');

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;
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
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({x: newX, y: 0});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: width, y: 0},
            duration: 300,
          }).start(() => {
            this.props.success(this.props.text);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = {position};
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
  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== true) {
      this.props.setScrollEnabled(true);
      this.scrollViewEnabled = true;
    }
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
    <Animated.View style={[this.state.position.getLayout()]} {...this.panResponder.panHandlers}>
      <View style={styles.absoluteCell}>
        <Text style={styles.absoluteCellText}>DELETE</Text>
      </View>
      <View
        onStartShouldSetResponder={() => this.setModalVisibility()}
        //OnPress={() => this.setModalVisibility()}
        >
        <Text
        style={(this.props.text.toString().indexOf("Trip-") > -1 ? styles.innerCellTripPurchase : styles.innerCell)}>
          {this.props.text}
        </Text>
      </View>
    </Animated.View>
  </View>
 );
}
}
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
  listTripItem: {
    height: 80,
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: '#FFFFE0',
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
    color: 'black',
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
    fontSize: 16,
    marginLeft: 100,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'black',
  },
  innerCellTripPurchase: {
      width: width,
      height: 80,
      fontSize: 16,
      marginLeft: 100,
      backgroundColor: '#FFFFE0',
      justifyContent: 'center',
      alignItems: 'flex-start',
      color: 'black',
    },
});