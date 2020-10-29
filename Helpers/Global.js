import React, { Component, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';

export class Global extends Component {

  constructor(){
    super();
    global.SampleVar = 'This is Global Variable.';
    module.exports = {
      USERNAME: 'test',
    };
  }
}