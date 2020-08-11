import React from "react";
import { Text, View, TextInput, TouchableOpacity, Picker } from "react-native";
import Style from "../constants/Style";
import Color from "../constants/color";
import { auth, firedb } from "../components/firebase";
import SummaryRecord from "./SummaryRecord";
import Summary from "./Summary";

let snapMedical_Record = [];

export default class ExistingPatientRecordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hn: "",
      selectedMedical_Record: "",
      errorMessage: null,
      toggleSelectPatientPressed: false,
      toggleSearchMedicalRecordPressed: false,
    };
  }
  componentDidMount() {
    this.setState({});
  }
  selectPatient = () => {
    console.log("selectPatient");
    this.setState({
      errorMessage: null,
      toggleSearchMedicalRecordPressed: false,
    });
    snapMedical_Record = [];

    firedb.ref("Patient/HN" + this.state.hn).on("value", (snapshot) => {
      if (snapshot.exists() === true) {
        firedb
          .ref("Patient/HN" + this.state.hn + "/Medical_Record")
          .on("value", (snapshot) => {
            snapshot.forEach((snapshot) => {
              var keys = snapshot.key;
              snapMedical_Record.push(keys);
              snapMedical_Record.reduce(
                (unique, item) =>
                  unique.includes(item) ? unique : [...unique, item],
                []
              );
            });
            snapMedical_Record.push("Select Date");
            snapMedical_Record.reverse();
            console.log(snapMedical_Record);
          });
        this.setState({
          toggleSelectPatientPressed: true,
        });
      } else {
        this.setState({
          errorMessage:
            "No data of this Hospital Number. Please recheck and enter again.",
        });
        this.setState({ toggleSelectPatientPressed: false });
      }
    });
  };

  clearInput = () => {
    this.setState({
      hn: "",
      snapGender: "",
      snapFirstname: "",
      snapLastname: "",
      selectedMedical_Record: "",
      errorMessage: null,
      toggleSelectPatientPressed: false,
      toggleSearchMedicalRecordPressed: false,
    });
    snapMedical_Record = [];
  };

  toggleSummary = () => {
    console.log("togglesummary");
    this.setState({ toggleSearchMedicalRecordPressed: true });
    <SummaryRecord />;
  };

  // componentDidMount() {
  // 	this.setState({})
  // }

  render() {
    console.log("render()");
    return (
      <View style={Style.container}>
        <View style={Style.inputForm}>
          <Text style={Style.formTitle}>EXISTING PATIENT RECORD</Text>
          <View style={Style.errorMessageContainer}>
            <Text style={Style.errorMessage}>{this.state.errorMessage}</Text>
          </View>
          <Text style={Style.inputTitle}>HOSPITAL NUMBER</Text>
          <TextInput
            style={Style.inputBox}
            placeholder="   HNxxxx"
            onChangeText={(input) => this.setState({ hn: input })}
            value={this.state.hn.toUpperCase().trim()}
          />
          <TouchableOpacity
            style={Style.majorButton}
            onPress={this.selectPatient}
          >
            <Text style={Style.majorButtonText}>SELECT PATIENT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.minorButton}
            onPress={() => this.clearInput()}
          >
            <Text style={Style.minorButtonText}>CLEAR</Text>
          </TouchableOpacity>
        </View>
        {this.state.toggleSelectPatientPressed ? (
          <View style={Style.container}>
            <Picker
              selectedValue={this.state.selectedMedical_Record}
              style={Style.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedMedical_Record: itemValue })
              }
            >
              {snapMedical_Record.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
            <TouchableOpacity
              style={Style.majorButton}
              onPress={() => this.toggleSummary()}
            >
              <Text style={Style.majorButtonText}>SEARCH MEDICAL RECORD</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {this.state.toggleSelectPatientPressed === true &&
        this.state.toggleSearchMedicalRecordPressed === true ? (
          <View style={{ flex: 1 }}>
            {/* pass this.state.hn, this.state.selectedMedical_Record to Summary*/}
            {
              <Summary
                inputHN={this.state.hn}
                inputMR={this.state.selectedMedical_Record}
              />
            }
          </View>
        ) : null}

        <Text>
          {this.state.hn}
          {"\n"}
          {this.state.selectedMedical_Record}
          {"\n"}
        </Text>
      </View>
    );
  }
}
