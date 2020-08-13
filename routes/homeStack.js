import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import NewPatientfillin from '../screens/NewPatientfillin';
import logo from '../images/logo_bartlab.png';
import Colors from '../constants/color'
import Login from '../screens/SignInScreen'
import SelectPatient from '../screens/SelectPatientScreen';
import ExistingPatient from '../screens/ExistingPatientRecordScreen';
import SignUpScreen1 from '../screens/SignUpScreen1';
import SignUpScreen2 from '../screens/SignUpScreen2';
import Questionnaire from '../screens/Questionnaire';
import Checkup from '../screens/Checkup';
import OldPatientFillin from '../screens/OldPatientFillin';
const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <View style = {{flexDirection:'row'}}>
    <Image
      style={{ width: 80, height: 80, }}
      source={logo}
    />
    <Text>    </Text> 
    </View>
  );
}

export default function HomeStack(navigation) {
  return (
    <Stack.Navigator initialRouteName="ADAPS" 
    screenOptions={{
        headerStyle: {
          height: 120,
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: 32,
        },
        headerBackTitle: ' ',
      }}>
      <Stack.Screen name="ADAPS" component={Login} options={{
        headerTitleAlign: 'left', 
        headerRight: props => <LogoTitle {...props} /> }}/>
      <Stack.Screen name="NewPatient" component={NewPatientfillin} options= {{
        title: 'New Patient Information',}}/>
      <Stack.Screen name="Question" component={Questionnaire} options= {{
        title: 'Test Information',}}/>
      <Stack.Screen name="Checkup" component= {Checkup} options= {{
        title: 'Test Information',}} />
      <Stack.Screen name="SelectPatient" component= {SelectPatient} options= {{
        title: 'Select Patient',}} />
         <Stack.Screen name="OldPatient" component= {OldPatientFillin} options= {{
        title: 'Existed Patient',}} />
      <Stack.Screen name="SignUpScreen" component= {SignUpScreen1} options= {{title: 'Sign Up'}} />
      <Stack.Screen name="SignUpScreen2" component = {SignUpScreen2} options= {{title: 'Sign Up'}}  />
      <Stack.Screen name="ExistingPatient" component = {ExistingPatient} options= {{title: 'Existed Patient'}}  />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  headerTitle: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold'
},
spacer_mid: {
  flex: 0.3
},
});

//export default createAppContainer(HomeStack);