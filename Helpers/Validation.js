import React, { Component, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
import moment from "moment";

export class Global extends Component {

    constructor(){
        super();
    }
    validNumber(var input){
        if(Math.abs(input) != "NaN" || Math.abs(input) != "undefined")
            return true;
        else
            return false;
    }
    notNull(var input){
        if(input != null)
            return true;
        else
            return false;
    }
    validLength(var input){
        if(input.toString().length > 3 && input.toString().length <= 20)
            return true;
        else
            return false;
    }
    validDate(var input){
        if(moment(input) != "undefined" && moment(input) != "NaN"){
            return true;
        } else {
            return false;
        }
    }
    validDropDownSelection(var input, var validData){
        validData.every((item) => item.value.toString() === input.toString()){
            return true;
        }
        return false; //if never reached in the every loop and returned
    }
    inputReadable(var input){
        if(input != "undefined" && input != "NaN")
            return true;
        else
            return false;
    }
}