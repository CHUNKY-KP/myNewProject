import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Style from "../constants/Style";

export default class SelectPatientScreen extends React.Component {
  render() {
    return (
      <View style={Style.container}>
        <View>
          <TouchableOpacity
            style={Style.majorLargeButton}
            onPress={() => this.props.navigation.navigate('ExistingPatient')} //EDIT HERE navigate to ExistingPatientRecordScreen
          >
            <Text style={Style.majorLargeButtonText}>CHECK{"\n"}RESULT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.majorLargeButton}
            onPress={() => this.props.navigation.navigate('OldPatient')} //EDIT HERE navigate to OldPatientFillin
          >
            <Text style={Style.majorLargeButtonText}>
              EXISTING{"\n"}PATIENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.minorLargeButton}
            onPress={() => this.props.navigation.navigate('NewPatient')} //EDIT HERE navigate to NewPatientfillin
          >
            <Text style={Style.minorLargeButtonText}>NEW{"\n"}PATIENT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
