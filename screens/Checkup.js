import React, { useState, Component, useEffect } from "react";
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
var i, HN, BirthYear, BirthMonth, BirthDay, Genders, Age;
var year, month, day;
const Checkup = ({navigation,route}) => {
  const [HN, setHN] = useState();
  const [date, setdate] = useState(new Date());
  const [Birthyear, setBirthyear] = useState();
  const [Birthmonth, setBirthmonth] = useState();
  const [Birthday, setBirthday] = useState();
  const [Birthdate, setBirthdate] = useState();
  const [Gender, setGender] = useState();
  const [Height, setHeight] = useState();
  const [Weight, setWeight] = useState();
  const [FBS, setFBS] = useState();
  const [HBA1C, setHBA1C] = useState();
  const [BP_Sys_left, setBPSleft] = useState();
  const [BP_Dia_left, setBPDleft] = useState();
  const [BP_Sys_right, setBPSright] = useState();
  const [BP_Dia_right, setBPDright] = useState();
  let i = 0;
  useEffect(() => {
    setTimeout(() => {
      getData();
      // setGender(Genders);
      calculate_age();

      i++;
      console.log("========================", i);
    }, 1000);
  });
  const sendData = (
    Height,
    Weight,
    BP_Dia_left,
    BP_Dia_right,
    BP_Sys_left,
    BP_Sys_right,
    FBS,
    HBA1C
  ) => {
    firedb.ref("Patient/HN0012/Medical_Record/2019-12-2").update({
      Height: Height,
      Weight: Weight,
      BP_Dia_left: BP_Dia_left,
      BP_Dia_right: BP_Dia_right,
      BP_Sys_left: BP_Sys_left,
      BP_Sys_right: BP_Sys_right,
      FBS: FBS,
      HbA1c: HBA1C,
    }) ;
  };
  console.log(date);
  console.log(BirthYear);
  console.log(BirthMonth);
  console.log(BirthDay);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  const getData = () => {
    firedb.ref("Patient/HN0012").on("value", (snapshot) => {
      Genders = snapshot.val().Gender;
      BirthYear = snapshot.val().Birthdate.year;
      BirthMonth = snapshot.val().Birthdate.month;
      BirthDay = snapshot.val().Birthdate.date;
    });
    firedb.ref("Patient/HN0012").off;
  };
  const calculate_age = () => {
    setGender(Genders);
    setBirthdate(new Date(BirthYear, BirthMonth - 1, BirthDay));
    Age = new Date(date - Birthdate).getUTCFullYear() - 1970;
    return Age;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>HOSPITAL NUMBER : HN0010</Text>
            <Text style={styles.Displaydata}>Gender:{Gender}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>
              DATE:
              {year}-{month}-{day}
            </Text>
            <Text>AGE:{Age}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={Style.inputTitle}>HEIGHT(CM)</Text>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setHeight(text)}
                blurOnSubmit
                placeholder="Height"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={Style.inputTitle}>WEIGHT(KG)</Text>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setWeight(text)}
                blurOnSubmit
                placeholder="Weight"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={Style.inputTitle}>FBS(mg%)</Text>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setFBS(text)}
                blurOnSubmit
                placeholder="FBS"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={Style.inputTitle}>HBA1C(mmol/mol)</Text>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setHBA1C(text)}
                blurOnSubmit
                placeholder="HbA1c"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={Style.inputTitle}>BLOODPRESSURE LEFT(mmHg)</Text>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setBPSleft(text)}
                blurOnSubmit
                placeholder="Systolic"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={Style.inputTitle}>BLOODPRESSURE RIGHT(mmHg)</Text>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setBPSright(text)}
                blurOnSubmit
                placeholder="Systolic"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setBPDleft(text)}
                blurOnSubmit
                placeholder="Diastolic"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
            <View>
              <TextInput
                style={{ ...Style.inputBox, width: 150 }}
                onChangeText={(text) => setBPDright(text)}
                blurOnSubmit
                placeholder="Diasolic"
                textContentType="none"
                maxLength={25}
                keyboardType="numeric"
              />
            </View>
          </View>
          <Button
            title="GETDATA"
            onPress={() => {
              {
                setGender(Genders), calculate_age();
                console.log("========================");
                console.log(Birthdate);
                //console.log(new Date(date - Birthdate).getUTCFullYear() - 1970);//AGE in time zulu
              }
            }}
          />
          <Button
            title="SUBMIT"
            onPress={() =>{
              sendData(
                Height,
                Weight,
                BP_Dia_left,
                BP_Dia_right,
                BP_Sys_left,
                BP_Sys_right,
                FBS,
                HBA1C
              ); {navigation.navigate('ADAPS')};}
            }
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  Displaydata: {
    fontSize: 15,
  },
});
export default Checkup;
