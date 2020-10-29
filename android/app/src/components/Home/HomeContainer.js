import React, { Component } from 'react'

import {
createBottomTabNavigator,
createAppContainer
} from 'react-navigation';

import {
  Alert,
  Button,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Pie from 'react-native-pie';

export default class HomeContainer extends Component {
   constructor() {
      super()
   }
   render() {
      return (
        <>


          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Header />
            </ScrollView>
          </SafeAreaView>

            <Text>{"\n"}</Text>

            <View style={{flex: 4, flexDirection: 'row'}}>
             <Text style={styles.Legend}>{"\n"}<Text style={{fontWeight: "bold"}}>Times Over-Budget</Text>{"\n"}{"\n"}
             Yellow = Roughly On{"\n"}
             Red = Over{"\n"}
             Blue = Under{"\n"}
             </Text>
              <Pie
                radius={80}
                innerRadius={40}
                series={[55, 30, 15]}
                //values to show and color sequentially
                colors={['#f00', '#4ca3dd', '#ffd700']}
                backgroundColor="#ddd"
              />
          </View>
          <View style={{ alignItems: 'center', flex: 1}}>
              <View style={{ width:80, height: 40, justifyContent:'center'}} >
                <TouchableOpacity>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>View More</Text>
                    </View>
                </TouchableOpacity>
              </View>
          </View>
          <View style={{ alignItems: 'center', flex: 6}}>

        </View>
        </>
      );
    };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  Legend: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    paddingLeft: 20,
    textAlign: 'left',
  },
    btn: { width: 100, height: 30, justifyContent:'center', backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: "bold" },
});

export default HomeScreen;
