import React, { useState, Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import { firedb } from "../components/firebase";
import Style from "../styles/Style";
import { CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
const sendData = (
  HN,
  FirstName,
  LastName,
  Gender,
  Tel,
  Email,
  Address,
  date,
  uid
) => {
  /*HN,
  FirstName,
  LastName,
  Gender,
  Height,
  Weight,
  Tel,
  Email,
  Address,
  date*/

  firedb.ref("Patient/" + HN).update({
    Firstname: FirstName,
    Lastname: LastName,
    Gender: Gender,
    Tel: Tel,
    Email: Email,
    Address: Address,
    Uid: uid,
  });

  firedb.ref("Patient/" + HN + "/Birthdate").update({
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });
};
const NewPatientfillin = ({navigation,route}) => {
  const  {uid} = route.params;
  const [HN, setHN] = useState();
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Gender, setGender] = useState("Male");
  const [Male, setMale] = useState(true);
  const [Female, setFemale] = useState(false);
  const [Tel, setTel] = useState();
  const [Email, setEmail] = useState();
  const [Address, setAddress] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  console.log("Male" + Male), console.log("Female" + Female);
  console.log("Gender:" + Gender);
  console.log(date.getFullYear());
  console.log(date.getMonth() + 1);
  console.log(date.getDate());
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <Text style={Style.inputTitle}>HOSPITAL NUMBER</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) => setHN(text)}
              blurOnSubmit
              placeholder="eg.HN0010"
              textContentType="none"
              maxLength={25}
            />
            <Text style={Style.inputTitle}>FIRSTNAME</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) => setFirstName(text)}
              blurOnSubmit
              placeholder="eg.Rittichai"
              textContentType="none"
              maxLength={25}
            />
            <Text style={Style.inputTitle}>LASTNAME</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) => setLastName(text)}
              blurOnSubmit
              placeholder="eg.Praiboon"
              textContentType="none"
              maxLength={25}
            />
            <Text style={Style.inputTitle}>BIRTHDAY</Text>

            <DateTimePicker
              value={date}
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />

            <Text style={Style.inputTitle}>GENDER</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CheckBox
                title="Male"
                checked={Male}
                onPress={() => {
                  setMale((Male) => !Male),
                    setFemale((Female) => !Female),
                    Male ? setGender("Female") : setGender("Male");
                  console.log("Male" + Male), console.log("Female" + Female);
                }}
                checkedColor="deepskyblue"
              />
              <CheckBox
                title="Female"
                checked={Female}
                onPress={() => {
                  setMale((Male) => !Male),
                    setFemale((Female) => !Female),
                    Male ? setGender("Female") : setGender("Male");
                  console.log("Male" + Male), console.log("Female" + Female);
                }}
                checkedColor="lightcoral"
              />
            </View>
            <Text style={Style.inputTitle}>TELEPHONE NUMBER</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) => setTel(text)}
              blurOnSubmit
              placeholder="Telephone number eg.0812345678"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={Style.inputTitle}>EMAIL</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) => setEmail(text)}
              blurOnSubmit
              placeholder="Email eg.Rittichai.pra@gmail.com"
              keyboardType="email-address"
            />
            <Text style={Style.inputTitle}>ADDRESS</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) => setAddress(text)}
              blurOnSubmit
              multiline
              placeholder="858/66 Crystal place, Salaya, Lopburi, 10270"
            />
            <Button
              title="Submit"
              onPress={() => {
                sendData(
                  HN,
                  FirstName,
                  LastName,
                  Gender,
                  Tel,
                  Email,
                  Address,
                  date,
                  uid
                ); {navigation.navigate('SelectPatient',{HNid: HN})};}
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default NewPatientfillin;
