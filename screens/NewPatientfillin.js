//ตั้งdefaultให้ส่ง''ไปที่firebase ตั้งflag textinput ว่าต้องมีค่าใส่ถึงจะส่งข้อมูลอย่างน้อยHN Firstname Lastname ถ้าไม่มีให้เด้งalert
//Birthdate ในandriodพัง
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
import Style from "../constants/Style";
import { CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
var flag = [];
const sendData = (
  HN,
  FirstName,
  LastName,
  Gender,
  Tel,
  Email,
  Address,
  date
) => {
  var Hosnum = "HN" + HN;
  console.log(Hosnum);
  if (flag.length == 0) {
    Alert.alert("Missing informations");
  } else {
    var i;
    for (i = 0; i < 6; ++i) {
      if (flag[i] === undefined || flag[i] === "") {
        var a = i;
        break;
      }
    }
    console.log(flag);
    console.log(a);
    switch (a) {
      case 0:
        Alert.alert("Hospital number is missing");
        break;
      case 1:
        Alert.alert("First name is missing");
        break;
      case 2:
        Alert.alert("Last name is missing");
        break;
      case 3:
        Alert.alert("Telephone number is missing");
        break;
      case 4:
        Alert.alert("Email is missing");
        break;
      case 5:
        Alert.alert("Address is missing");
        break;
      default:
        firedb.ref("Patient/" + Hosnum).update({
          Firstname: FirstName,
          Lastname: LastName,
          Gender: Gender,
          Tel: Tel,
          Email: Email,
          Address: Address,
        });

        firedb.ref("Patient/" + Hosnum + "/Birthdate").update({
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        });
        Alert.alert("Data sent");
        
    }
  }
};
const NewPatientfillin = ({navigation,route}) => {
  const [Data, setData] = useState({
    HN: "",
    FirstName: "",
    LastName: "",
    Gender: "Male",
    Tel: "",
    Address: "",
    Email: "",
  });
  const [Male, setMale] = useState(true);
  const [Female, setFemale] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  console.log(flag);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={Style.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <Text style={Style.formTitle}>New patient information</Text>
            <Text style={Style.inputTitle}>HOSPITAL NUMBER</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) =>
                setData({ ...Data, HN: text }, (flag[0] = text))
              }
              blurOnSubmit
              placeholder="eg.0010"
              textContentType="none"
              keyboardType="number-pad"
              maxLength={25}
            />
            <Text style={Style.inputTitle}>FIRSTNAME</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) =>
                setData({ ...Data, FirstName: text }, (flag[1] = text))
              }
              blurOnSubmit
              placeholder="eg.Rittichai"
              textContentType="none"
              maxLength={25}
            />
            <Text style={Style.inputTitle}>LASTNAME</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) =>
                setData({ ...Data, LastName: text }, (flag[2] = text))
              }
              blurOnSubmit
              placeholder="eg.Praiboon"
              textContentType="none"
              maxLength={25}
            />
            <Text style={Style.inputTitle}>BIRTHDAY</Text>
            <DateTimePicker
              value={date}
              is24Hour={true}
              display="spinner"
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
                    Male
                      ? setData({ ...Data, Gender: "Female" })
                      : setData({ ...Data, Gender: "Male" });
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
                    Male
                      ? setData({ ...Data, Gender: "Female" })
                      : setData({ ...Data, Gender: "Male" });
                  console.log("Male" + Male), console.log("Female" + Female);
                }}
                checkedColor="lightcoral"
              />
            </View>
            <Text style={Style.inputTitle}>TELEPHONE NUMBER</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) =>
                setData({ ...Data, Tel: text }, (flag[3] = text))
              }
              blurOnSubmit
              placeholder="Telephone number eg.0812345678"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={Style.inputTitle}>EMAIL</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) =>
                setData({ ...Data, Email: text }, (flag[4] = text))
              }
              blurOnSubmit
              placeholder="Email eg.Rittichai.pra@gmail.com"
              keyboardType="email-address"
            />
            <Text style={Style.inputTitle}>ADDRESS</Text>
            <TextInput
              style={Style.inputBox}
              onChangeText={(text) =>
                setData({ ...Data, Address: text }, (flag[5] = text))
              }
              blurOnSubmit
              multiline
              placeholder="858/66 Crystal place, Salaya, Lopburi, 10270"
            />
            <TouchableOpacity
              style={Style.majorButton}
              onPress={() => {
                sendData(
                  Data.HN,
                  Data.FirstName,
                  Data.LastName,
                  Data.Gender,
                  Data.Tel,
                  Data.Email,
                  Data.Address,
                  date
                );
                navigation.navigate('Question', {hn_n: Data.HN});}
              }
            >
              <Text style={Style.majorButtonText}>Submit</Text>
            </TouchableOpacity>
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
