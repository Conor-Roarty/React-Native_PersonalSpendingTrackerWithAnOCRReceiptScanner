import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, createSwitchNavigator  } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../Components/TabBarIcon';

import HomeScreen from '../Screens/Home/HomeScreen';
import PurchaseScreen from '../Screens/Purchases/PurchaseScreen';
import TripScreen from '../Screens/Trips/TripScreen';
import Analytics from '../Screens/Analytics/Analytics';
import SettingsScreen from '../Screens/Settings/SettingsScreen';
import firebase from 'react-native-firebase'
import Icon from "react-native-vector-icons/FontAwesome";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'home'
      }
    />
  ),
};

HomeStack.path = '';


const AnalyticsStack = createStackNavigator(
  {
    Analytics: Analytics,
  },
  config
);

AnalyticsStack.navigationOptions = {
  tabBarLabel: 'Analytics',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'home'
      }
    />
  ),
};
AnalyticsStack.path = '';


const PurchaseStack = createStackNavigator(
    {
        Purchase: PurchaseScreen,
    },
    config
);
PurchaseStack.navigationOptions = {
  tabBarLabel: 'Purchases',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}
    name={Platform.OS === 'ios'
    ? 'MaterialIcons'
    : 'attach-money'
    }
    />
  ),
};
PurchaseStack.path = '';

const TripStack = createStackNavigator(
  {
    Trip: TripScreen,
  },
  config
);
TripStack.navigationOptions = {
  tabBarLabel: 'Trips',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
TripStack.path = '';


const SettingsStack = createStackNavigator(
  {
    SettingsScreen: SettingsScreen,
  },
  config
);
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
SettingsStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  Analytics,
  PurchaseScreen,
  TripScreen,
  SettingsScreen
});
tabNavigator.path = '';

export default tabNavigator;
