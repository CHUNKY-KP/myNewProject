import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import Color from '../constants/color'
import logo_login from '../images/login_icon.png'
import logo_pass from '../images/pass_icon.png'
import {auth} from '../components/firebase'

const Login = ({navigation,route}) => {
    
    const [loginID,onChangeLogin] = useState('');
    const [loginPass,onChangePass] = useState('');
    const [errormsg,onError] = useState('false');
    
    const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

     const onSubmit = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(loginID, loginPass)
            .then(() => { 
                console.log(auth.currentUser.uid);
                navigation.navigate('SelectPatient',{uid: auth.currentUser.uid})
                 })
            .catch(() => {
                Alert.alert('Invalid UserName or Password','Please check spelling or register new account' , [{text:'Okay',style: 'destructive'}])
                //createThreeButtonAlert();
                //auth.createUserWithEmailAndPassword(loginID, loginPass)
            })
        
      }
    return (

        <View style={{flex: 1, justifyContent: 'space-around'}}>
            <View style ={styles.header}>
                <View style= {{flexDirection: 'row', padding: 20 }}>
                    <View style={styles.spacer_begin}></View> 
                    <Text style={{fontSize:30, color:Color.primary}}>Professional Login</Text>
                </View>
                <View style={styles.screen}>
                    <View style = {styles.login_view}>
                        <Image style = {styles.tinylogo} source = {logo_login} />
                        <View style = {styles.spacer_button} />
                        <TextInput style = {styles.text_input}
                        onChangeText = {text => onChangeLogin(text)}
                        //value = {loginID}
                        blurOnSubmit
                        placeholder= 'Please enter User Name'
                        textContentType = 'username'
                        maxLength = {25}
                        /> 
                    </View>
                    <View style = {styles.login_view}>
                        <Image style = {styles.tinylogo} source = {logo_pass} />
                        <View style = {styles.spacer_button} />
                        <TextInput style = {styles.text_input}
                        onChangeText = {text => onChangePass(text)}
                        //value = {loginID}
                        blurOnSubmit
                        secureTextEntry={true}
                        textContentType = 'password'
                        maxLength = {25}
                        />
                    </View>
                    <View style = {styles.button_view}>
                        <View style ={styles.button}>
                            <Button title ="Login" onPress={onSubmit} color ={Color.blue_button}/>  
                        </View>
                        <View style ={styles.button}>
                            <Button title ="Cancel" onPress={createThreeButtonAlert} color ={Color.primary}/>  
                        </View>
                        <View style ={styles.button}>
                            <Button title ="Register" color ={Color.accent}/>  
                        </View>
                    </View>
                </View>
            </View>
    </View>

    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: 50,
        flex: 1
    },
    screen: {
        padding: 20,
        alignItems: 'center',
    },
    login_view: {
        flexDirection: 'row',
        paddingBottom: 15
        
    },
    button_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 100
    },
    picture_style: {
        width: "100%",
        height: "40%"
    },
    text_input: {
        height: 30,
        width: 220,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        fontSize:20,
        alignItems: 'center'
    },
    tinylogo: {
        //paddingTop: 10,
        justifyContent: 'flex-end',
        width: 30,
        height: 30
    },
    mediumlogo: {
        width: 80,
        height: 80,
    },
    spacer_begin: {
        flex: 0.1
        
    },
    spacer_button: {
        flex: 0.05
        
    },
});

export default Login;