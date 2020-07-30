import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet, TextInput, Image,TouchableOpacity} from 'react-native';
import icon_new from '../images/icon_newPatient.png'
import icon_existed from '../images/icon_oldPatient.png'
import Color from '../constants/color'
import { firedb } from "../components/firebase";

const getData = (uid_in) => {
    var Name;
    firedb.ref("users/"+uid_in).on("value", (snapshot) => {
       Name = snapshot.val().name;
    });
    console.log(Name);
    firedb.ref("users/"+uid_in).off;
  };

const SelectPatient = ({navigation,route}) => {
    const  {uid} = route.params;
    getData(uid);
    return (
        <View style={styles.screen}>
                <Text>{JSON.stringify(uid)} </Text>
                <TouchableOpacity style={{alignItems: 'center', flex :1}} onPress={()=>
                {navigation.navigate('NewPatient');}}>
                    <Image style ={styles.mediumlogo} source = {icon_new} />
                    <Text style={{fontSize:24, color:Color.blue_button}}>New Patient</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center', flex :1}} onPress={()=>
                {navigation.navigate('OldPatient');}}>
                    <Image style ={styles.mediumlogo} source = {icon_existed} />
                    <Text style={{fontSize:24, color:Color.blue_button}}>Established Patient</Text>
                </TouchableOpacity>
        </View>
      );
};



const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 30,
      alignContent: 'space-around',
    },
    mediumlogo: {
        width: 100,
        height: 100,
    },
    smalllogo: {
        width: 60,
        height: 60,
    },
  });

export default SelectPatient;