import React from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Style from "../constants/Style";
import Color from "../constants/color";
import { auth } from "../components/firebase";

export default class SignUpScreen1 extends React.Component {
  state = {
    email: "",
    password: "",
    re_enter_password: "",
    errorMessage: null,
  };

  handleSignUp1 = () => {
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.re_enter_password === ""
    ) {
      this.setState({ errorMessage: "Incomplete fill." });
    } else if (this.state.password !== this.state.re_enter_password) {
      this.setState({ errorMessage: "Passwords did not match." });
    } else {
      this.setState({ errorMessage: null });
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => { 
          console.log(auth.currentUser.uid);
          this.props.navigation.navigate('SignUpScreen2',{uid: auth.currentUser.uid})
           })
        // .then(userCredential => {
        //     return (
        //         userCredential.user.updateProfile({ displayName: this.state.displayName })
        //     )
        // })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  clearInput = () => {
    this.setState({
      email: "",
      password: "",
      re_enter_password: "",
      errorMessage: null,
    });
  };

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.inputForm}>
          <Text style={Style.formTitle}>PROFESSIONAL SIGN UP</Text>
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
          <Text style={Style.inputTitle}>RE-ENTER PASSWORD</Text>
          <TextInput
            style={Style.inputBox}
            placeholder="   password"
            keyboardType="default"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            onChangeText={(re_enter_password) =>
              this.setState({ re_enter_password })
            }
            value={this.state.re_enter_password}
          />
          <TouchableOpacity
            style={Style.majorButton}
            onPress={this.handleSignUp1} //EDIT HERE navigate to SignUpScreen2
          >
            <Text style={Style.majorButtonText}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.minorButton} onPress={this.clearInput}>
            <Text style={Style.minorButtonText}>CLEAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.minorButton}
            onPress={() => this.props.navigation.navigate('ADAPS')} //EDIT HERE navigate to SignInScreen
          >
            <Text style={Style.minorButtonText}>Switch to SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
