//Require HN
import React, { useState, Component, useEffect, useLayoutEffect } from "react";
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
var BirthYear, BirthMonth, BirthDay, Genders, Agee;
var year, month, day;
var Ynow, Mnow, Dnow;
const flag = [];
const Checkup = ({navigation,route}) => {
  const [HN, setHN] = useState();
  const [date, setdate] = useState(new Date());
  const [Birthyear, setBirthyear] = useState("");
  const [Birthmonth, setBirthmonth] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [Gender, setGender] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [FBS, setFBS] = useState("");
  const [HBA1C, setHBA1C] = useState("");
  const [BP_Sys_left, setBPSleft] = useState("");
  const [BP_Dia_left, setBPDleft] = useState("");
  const [BP_Sys_right, setBPSright] = useState("");
  const [BP_Dia_right, setBPDright] = useState("");
  const [Age, setAge] = useState("");
  const [BPS_DP_left, setDPleft] = useState("");
  const [BPS_PT_left, setPTleft] = useState("");
  const [BPS_DP_right, setDPright] = useState("");
  const [BPS_PT_right, setPTright] = useState("");
  let i = 0;
  var hn_n = route.params.hn_n;
  //console.log(flag);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //It's working//
  function getdata() {
    return new Promise((resolve) => {
      firedb.ref("Patient/HN"+hn_n).once("value", (snapshot) => {
        Genders = snapshot.val().Gender;
        BirthYear = snapshot.val().Birthdate.year;
        BirthMonth = snapshot.val().Birthdate.month;
        BirthDay = snapshot.val().Birthdate.date;
        var a = [Genders, BirthYear, BirthMonth, BirthDay];
        resolve(a);
      });
    });
  }
  function calage(a) {
    return new Promise((resolve) => {
      var BD = new Date(a[1], a[2] - 1, a[3]);
      var Agee = new Date(date - BD).getUTCFullYear() - 1970;
      var b = [a[0], Agee];
      resolve(b);
    });
  }

  async function setinfo() {
    let result = await getdata();
    let BBB = await calage(result);
    setGender(BBB[0]);
    setAge(BBB[1]);
  }
  setinfo();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //It's also working///
  /*
  const promise1 = new Promise((resolve) => {
    firedb.ref("Patient/HN0012").once("value", (snapshot) => {
      Genders = snapshot.val().Gender;
      BirthYear = snapshot.val().Birthdate.year;
      BirthMonth = snapshot.val().Birthdate.month;
      BirthDay = snapshot.val().Birthdate.date;
      a = [Genders, BirthYear, BirthMonth, BirthDay];

      resolve(a);
    });
  });
  useLayoutEffect(() => {
    promise1
      .then((value) => {
        return new Promise((resolve) => {
          BD=new Date(value[1], value[2] - 1, value[3]);
          gender = value[0];
          Agee = new Date(date - BD).getUTCFullYear() - 1970;
          b = [gender, Agee];
          resolve(b);
        });
      })
      .then((resolve) => {
        setGender(resolve[0]);
        setAge(resolve[1]);
      });
  });
*/
  Ynow = date.getFullYear();
  Mnow = date.getMonth() + 1;
  Dnow = date.getDate();
  if (Mnow < 10) {
    Mnow = "0" + Mnow;
  }
  if (Dnow < 10) {
    Dnow = "0" + Dnow;
  }
  const clearInput = () => {
    setHeight("");
    setWeight("");
    setFBS("");
    setHBA1C("");
    setBPSleft("");
    setBPDleft("");
    setBPSright("");
    setBPDright("");
  };
  const sendData = (
    Height,
    Weight,
    BP_Dia_left,
    BP_Dia_right,
    BP_Sys_left,
    BP_Sys_right,
    FBS,
    HBA1C,
    Ynow,
    Mnow,
    Dnow,
    BPS_DP_left,
    BPS_PT_left,
    BPS_DP_right,
    BPS_PT_right
  ) => {
    if (flag.length === 0) {
      Alert.alert("Missing informations");
    } else {
      var i;
      for (i = 0; i < flag.length; ++i) {
        if (flag[i] === undefined || flag[i] === "") {
          var a = i;
          break;
        }
      }
      switch (a) {
        case 0:
          Alert.alert("Height is missing");
          break;
        case 1:
          Alert.alert("Weight is missing");
          break;
        case 2:
          Alert.alert("FBS is missing");
          break;
        case 3:
          Alert.alert("HbA1c is missing");
          break;
        case 4:
          Alert.alert("Left Blood pressure(Systolic) is missing");
          break;
        case 5:
          Alert.alert("Left blood pressure (Diastolic) is missing");
          break;
        case 6:
          Alert.alert("Right blood pressur (Systolic) is missing");
          break;
        case 7:
          Alert.alert("Right blood pressure(Diastolic) is missing");
          break;
        case 8:
          Alert.alert("Left DP pressure is missing");
          break;
        case 9:
          Alert.alert("Left PT pressure is missing");
          break;
        case 10:
          Alert.alert("Right DP pressure is missing");
          break;
        case 11:
          Alert.alert("Right PT pressure is missing");
          break;
        default:
          firedb
            .ref(
              "Patient/HN"+hn_n+ "/Medical_Record/" + Ynow + "-" + Mnow + "-" + Dnow
            )
            .update({
              Height: Height,
              Weight: Weight,
              BP_Dia_left: BP_Dia_left,
              BP_Dia_right: BP_Dia_right,
              BP_Sys_left: BP_Sys_left,
              BP_Sys_right: BP_Sys_right,
              FBS: FBS,
              HbA1c: HBA1C,
              BPS_DP_left: BPS_DP_left,
              BPS_PT_left: BPS_PT_left,
              BPS_DP_right: BPS_DP_right,
              BPS_PT_right: BPS_PT_right,
            });
      }
    }
  };
  return (
    <View style={Style.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={Style.Displaydata}>HOSPITAL NUMBER : {hn_n} </Text>
          <Text style={Style.Displaydata}>Gender:{Gender}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={Style.Displaydata}>
            DATE:
            {year}-{month}-{day}
          </Text>
          <Text style={Style.Displaydata}>AGE:{Age}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={Style.inputTitle}>HEIGHT(CM)</Text>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setHeight(text);
                flag[0] = text;
              }}
              blurOnSubmit
              placeholder="Height"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={Height}
            />
          </View>
          <View>
            <Text style={Style.inputTitle}>WEIGHT(KG)</Text>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setWeight(text);
                flag[1] = text;
              }}
              blurOnSubmit
              placeholder="Weight"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={Weight}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={Style.inputTitle}>FBS(mg%)</Text>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setFBS(text);
                flag[2] = text;
              }}
              blurOnSubmit
              placeholder="FBS"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={FBS}
            />
          </View>
          <View>
            <Text style={Style.inputTitle}>HBA1C(mmol/mol)</Text>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setHBA1C(text);
                flag[3] = text;
              }}
              blurOnSubmit
              placeholder="HbA1c"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={HBA1C}
            />
          </View>
        </View>
        <Text style={Style.inputTitle}>BLOODPRESSURE LEFT(mmHg)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setBPSleft(text);
                flag[4] = text;
              }}
              blurOnSubmit
              placeholder="Systolic"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BP_Sys_left}
            />
          </View>
          <Text style={{ ...Style.inputTitle, fontSize: 25 }}>/</Text>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setBPDleft(text);
                flag[5] = text;
              }}
              blurOnSubmit
              placeholder="Diastolic"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BP_Dia_left}
            />
          </View>
        </View>
        <Text style={Style.inputTitle}>BLOODPRESSURE RIGHT(mmHg)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setBPSright(text);
                flag[6] = text;
              }}
              blurOnSubmit
              placeholder="Systolic"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BP_Sys_right}
            />
          </View>
          <Text style={{ ...Style.inputTitle, fontSize: 25 }}>/</Text>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setBPDright(text);
                flag[7] = text;
              }}
              blurOnSubmit
              placeholder="Diasolic"
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BP_Dia_right}
            />
          </View>
        </View>
        <Text style={Style.inputTitle}>Left Ankle pressure (mmHg)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setDPleft(text);
                flag[8] = text;
              }}
              blurOnSubmit
              placeholder="Dorsalis Pedis a."
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BPS_DP_left}
            />
          </View>
          <Text style={{ ...Style.inputTitle, fontSize: 25 }}>,</Text>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setPTleft(text);
                flag[9] = text;
              }}
              blurOnSubmit
              placeholder="Posterior Tibial a."
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BPS_PT_left}
            />
          </View>
        </View>
        <Text style={Style.inputTitle}>Right Ankle pressure (mmHg)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setDPright(text);
                flag[10] = text;
              }}
              blurOnSubmit
              placeholder="Dorsalis Pedis a."
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BPS_DP_right}
            />
          </View>
          <Text style={{ ...Style.inputTitle, fontSize: 25 }}>,</Text>
          <View>
            <TextInput
              style={{ ...Style.inputBox, width: 150 }}
              onChangeText={(text) => {
                setPTright(text);
                flag[11] = text;
              }}
              blurOnSubmit
              placeholder="Posterior Tibial a."
              textContentType="none"
              maxLength={25}
              keyboardType="numeric"
              value={BPS_PT_right}
            />
          </View>
        </View>
        <TouchableOpacity
          style={Style.majorButton}
          onPress={() => {
            sendData(
              Height,
              Weight,
              BP_Dia_left,
              BP_Dia_right,
              BP_Sys_left,
              BP_Sys_right,
              FBS,
              HBA1C,
              Ynow,
              Mnow,
              Dnow,
              BPS_DP_left,
              BPS_PT_left,
              BPS_DP_right,
              BPS_PT_right
            );
            navigation.navigate('SelectPatient');
          }
          }
        >
          <Text style={Style.majorButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.minorButton} onPress={clearInput}>
          <Text style={Style.minorButtonText}>CLEAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default Checkup;
