import React from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import logo from '../images/logo_bartlab.png'
import Color from '../constants/color'

const Header = props => {
    return (
        <View style = {styles.header}>
            <View style = {styles.spacer_begin} />
            <Text style = {styles.headerTitle}>{props.title}</Text>
            <View style = {styles.spacer_mid} />
            <Image style = {styles.tinylogo} source = {logo} />
        </View>
    );


};



const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        paddingTop: 36,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row"
    },
    headerTitle: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold'
    },
    spacer_begin: {
        flex: 0.15
    },
    spacer_mid: {
        flex: 0.75
    },
    tinylogo: {
        justifyContent: 'flex-end',
        width: 90,
        height: 90
    }

});