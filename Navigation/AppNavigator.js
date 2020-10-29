import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Loading from '../Screens/Login/Loading'
import Register from '../Screens/Login/Register'
import Login from '../Screens/Login/Login'
import PurchaseEntryScreen from '../Screens/Purchases/PurchaseEntry';
import TripEntryScreen from '../Screens/Trips/TripsEntry';
import Home from '../Screens/Home/HomeScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    TripEntryScreen: TripEntryScreen,
    PurchaseEntryScreen: PurchaseEntryScreen,
    Loading: Loading,
    Login: Login,
    Register: Register,
    Home: Home,
  },
  {
    initialRouteName: 'Loading'
  })
);
