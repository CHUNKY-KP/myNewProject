import React from "react";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import Style from "../constants/Style";
import Color from "../constants/color";
import { auth } from "../components/firebase";
export default class SignInScreen extends React.Component {
  
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleSignIn = () => {
    const { email, password } = this.state;
    this.setState({ errorMessage: null });
    auth
      .signInWithEmailAndPassword(email, password)            
      .then(() => { 
        console.log(auth.currentUser.uid);
        this.props.navigation.navigate('SelectPatient',{uid: auth.currentUser.uid})
         })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render = () => {
    return (
      <View style={Style.container}>
        <View style={Style.inputForm}>
          <Text style={Style.formTitle}>PROFESSIONAL SIGN IN</Text>
          <View style={Style.errorMessageContainer}>
            <Text style={Style.errorMessage}>{this.state.errorMessage}</Text>
          </View>
          <Text style={Style.inputTitle}>EMAIL ADDRESS</Text>
          <TextInput
            style={Style.inputBox}
            placeholder="   firstname.las@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="username"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <Text style={Style.inputTitle}>PASSWORD</Text>
          <TextInput
            style={Style.inputBox}
            placeholder="   password"
            keyboardType="default"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity
            style={Style.majorButton}
            onPress={this.handleSignIn}
          >
            <Text style={Style.majorButtonText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.minorButton}
            onPress={() => this.props.navigation.navigate('SignUpScreen')} //EDIT HERE navigate to SignUpScreen
          >
            <Text style={Style.minorButtonText}>Switch to SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
