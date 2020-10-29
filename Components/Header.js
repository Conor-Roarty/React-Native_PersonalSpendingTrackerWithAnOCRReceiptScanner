import React from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{title.toUpperCase()}</Text>
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 22,
    fontWeight: '500'
  },
  headerLeft: {

      }
});
export default Header;
