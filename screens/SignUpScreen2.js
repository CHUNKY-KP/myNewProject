import React from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Style from "../constants/Style";
import Color from "../constants/color";
import { auth, firedb } from "../components/firebase";

export default class SignUpScreen2 extends React.Component {
  state = {
    displayName: "",
    deptCode: "",
    staffID: "",
    errorMessage: null,
  };

  handleSignUp2 = () => {
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.deptCode === "" ||
      this.state.staffID === ""
    ) {
      this.setState({ errorMessage: "Incomplete fill." });
    } else {
      this.setState({ errorMessage: null });
      firedb.ref("Professional/" + auth.currentUser.uid).update({
        Firstname: this.state.firstname,
        Lastname: this.state.lastname,
        DeptCode: this.state.deptCode,
        StaffID: this.state.staffID,
      }).then(() => { 
        console.log(auth.currentUser.uid);
        this.props.navigation.navigate('SelectPatient',{uid: auth.currentUser.uid})
         });
    }
  };

  clearInput = () => {
    this.setState({
      firstname: "",
      lastname: "",
      deptCode: "",
      staffID: "",
      errorMessage: null,
    });
  };

    render() {
        return (
            <View style={Style.container}>
                <View style={Style.inputForm}>
                    <Text style={Style.formTitle}>
                        PROFESSIONAL SIGN UP
                    </Text>
                    <View style={Style.errorMessageContainer}>
                        <Text style={Style.errorMessage}>
                            {this.state.errorMessage}
                        </Text>
                    </View>
                    <Text style={Style.inputTitle}>
                        FIRSTNAME
                    </Text>
                    <TextInput
                        style={Style.inputBox}
                        placeholder='   Firstname'
                        onChangeText={(firstname) => this.setState({ firstname })}
                        value={this.state.firstname}
                    />
                    <Text style={Style.inputTitle}>
                        LASTNAME
                    </Text>
                    <TextInput
                        style={Style.inputBox}
                        placeholder='   Lastname'
                        onChangeText={(lastname) => this.setState({ lastname })}
                        value={this.state.lastname}
                    />
                    <Text style={Style.inputTitle}>
                        DEPARTMENT CODE
                    </Text>
                    <TextInput
                        style={Style.inputBox}
                        placeholder='   123'
                        keyboardType='number-pad'
                        onChangeText={(deptCode) => this.setState({ deptCode })}
                        value={this.state.deptCode}
                    />
                    <Text style={Style.inputTitle}>
                        STAFF ID
                    </Text>
                    <TextInput
                        style={Style.inputBox}
                        placeholder='   1234567'
                        keyboardType='number-pad'
                        onChangeText={(staffID) => this.setState({ staffID })}
                        value={this.state.staffID}
                    />
                    <TouchableOpacity
                        style={Style.majorButton}
                        onPress={this.handleSignUp2} //EDIT HERE navigate to SignInScreen
                    >
                        <Text style={Style.majorButtonText}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Style.minorButton}
                        onPress={this.clearInput}
                    >
                        <Text style={Style.minorButtonText}>
                            CLEAR
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
