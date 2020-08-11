import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
} from "react-native";
import Style from "../constants/Style";
import Color from "../constants/color";
import { auth, firedb } from "../components/firebase";
var MR = [];
const OldPatientFillin = ({navigation,route}) => {
  const [Data, setData] = useState({
    HN: "",
    FirstName: "",
    LastName: "",
    Gender: "",
  });
  const [MedicalRecord, setMedicalRecord] = useState("");
  const [LastCheck, setLastCheck] = useState("");
  const [Press, checkPress] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const selectPatient = () => {
    //find lastcheck
    checkPress(true);
    setData({
      HN: "",
      FirstName: "",
      LastName: "",
      Gender: "",
    });
    setLastCheck(null);
    setMedicalRecord(null);
    setErrorMessage(null);
    firedb.ref("Patient/HN" + Data.HN).on("value", (snapshot) => {
      var a = snapshot.exists();
      if (a == true) {
        firedb.ref("Patient/HN" + Data.HN).once("value", (snapshot) => {
          const firstname = snapshot.val().Firstname;
          const lastname = snapshot.val().Lastname;
          const gender = snapshot.val().Gender;
          console.log(firstname, lastname, gender);
          setData({
            ...Data,
            FirstName: firstname,
            LastName: lastname,
            Gender: gender,
          });
          //console.log(firstname, lastname, gender);
        });
        firedb
          .ref("Patient/HN" + Data.HN + "/Medical_Record")
          .once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const record = childSnapshot.key;
              MR.push(record);
            });
          })
          .then(() => {
            MR.reverse();
            setLastCheck(MR[0]);
            console.log(MR[0]);
            console.log(LastCheck);
          });
      } else {
        setErrorMessage(
          "No data of this Hospital Number. Please recheck and enter again."
        );
      }
    });
  };
  const clearInput = () => {
    setData({
      HN: "",
      FirstName: "",
      LastName: "",
      Gender: "",
    });
    setLastCheck(null);
    setMedicalRecord(null);
    MR = [];
    checkPress(false);
  };
  const changePage = () => {
    
  };
  return (
    <View style={Style.container}>
      <View style={Style.inputForm}>
        <Text style={Style.formTitle}>Old patient information</Text>
        <View style={Style.errorMessageContainer}>
          <Text style={Style.errorMessage}>{ErrorMessage}</Text>
        </View>
        <Text style={Style.inputTitle}>HOSPITAL NUMBER</Text>
        <TextInput
          style={Style.inputBox}
          placeholder="   HNxxxx"
          onChangeText={(hn) => setData({ ...Data, HN: hn })}
          value={Data.HN.toUpperCase().trim()}
        />
        <TouchableOpacity
          style={Style.majorButton}
          onPress={() => {
            selectPatient();
          }}
        >
          <Text style={Style.majorButtonText}>SELECT PATIENT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.minorButton} onPress={clearInput}>
          <Text style={Style.minorButtonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>
      {Press ? (
        <View style={Style.container}>
          <Text style={Style.Displaydata}>
            Hospital Number:{"\t"}
            {Data.HN}
            {"\n"}
            Gender:{"\t\t\t"}
            {Data.Gender}
            {"\n"}
            Full Name:{"\t\t\t"}
            {Data.FirstName} {Data.LastName}
            {"\n"}
            Last Check:{"\t\t"}
            {LastCheck}
          </Text>
          <TouchableOpacity style={Style.majorButton} onPress={() => {navigation.navigate('Checkup',{hn_n: Data.HN});}}>
            <Text style={Style.majorButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
export default OldPatientFillin;
