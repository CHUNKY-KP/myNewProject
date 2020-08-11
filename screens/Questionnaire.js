import React, { useState, Component, useLayoutEffect } from "react";
import { CheckBox } from "react-native-elements";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  RecyclerViewBackedScrollView,
  FlatList,
  ScrollView,
} from "react-native";
import { firedb } from "../components/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Style from "../constants/Style";
var year, month, date;
year = new Date().getFullYear();
month = new Date().getMonth() + 1;
date = new Date().getDate();
if (month < 10) {
  month = "0" + month;
}
if (date < 10) {
  date = "0" + date;
}

const sendData = (
  HN_number = "",
  Foot_ulcer,
  Foot_pain,
  Tingling,
  Ataxia,
  ULS,
  Pinprick,
  Vibration,
  PositionSense,
  Numbness,
  Light_Touch,
  Temp,
  Weakness,
  year,
  month,
  date,
  RKRA
) => {
  console.log(year, month, date);
  firedb
    .ref(
      "Patient/HN"+ HN_number +"/Medical_Record/" +
        year +
        "-" +
        month +
        "-" +
        date +
        "/Questionnaire"
    )
    .update({
      Foot_ulcer: Foot_ulcer,
      Foot_pain: Foot_pain,
      Numbness: Numbness,
      Tingling: Tingling,
      Weakness: Weakness,
      Ataxia: Ataxia,
      Upper_limb_symptom: ULS,
      Pinprick: Pinprick,
      Light_Touch: Light_Touch,
      Vibration: Vibration,
      Position_Sense: PositionSense,
      Temp: Temp,
      Rotax_ankle_left: RKRA.Rotax_ankle_left,
      Reflex_knee_left: RKRA.Reflex_knee_left,
      Rotax_ankle_right: RKRA.Rotax_ankle_right,
      Reflex_knee_right: RKRA.Reflex_knee_right,
    });
};
var FlagReflex = [false, true, false, true, false, false];
const Questionnaire = ({navigation,route}) => {
  const [Foot_ulcer, setFootUlcer] = useState(false);
  const [Foot_pain, setFootPain] = useState(false);
  const [Numbness, setNumbness] = useState(false);
  const [Tingling, setTingling] = useState(false);
  const [Weakness, setWeakness] = useState(false);
  const [Ataxia, setAtaxia] = useState(false);
  const [ULS, setULS] = useState(false);
  const [Pinprick, setPinprick] = useState(false);
  const [Temp, setTemp] = useState(false);
  const [Light_Touch, setLightTouch] = useState(false);
  const [Vibration, setVibration] = useState(false);
  const [PositionSense, setPositionSense] = useState(false);
  const [RKnormL, setRKnormL] = useState(false);
  const [RKreduceL, setRKreduceL] = useState(false);
  const [RKabsL, setRKabsL] = useState(false);
  const [RAnormL, setRAnormL] = useState(false);
  const [RAreduceL, setRAreduceL] = useState(false);
  const [RAabsL, setRAabsL] = useState(false);
  const [RKnormR, setRKnormR] = useState(false);
  const [RKreduceR, setRKreduceR] = useState(false);
  const [RKabsR, setRKabsR] = useState(false);
  const [RAnormR, setRAnormR] = useState(false);
  const [RAreduceR, setRAreduceR] = useState(false);
  const [RAabsR, setRAabsR] = useState(false);
  const [RKRA, setRKRA] = useState({
    Rotax_ankle_left: "",
    Reflex_knee_left: "",
    Rotax_ankle_right: "",
    Reflex_knee_right: "",
  });
  console.log(FlagReflex);
  useLayoutEffect(() => {});
  const ReflexHandler = (a) => {
    console.log("Reflex handler");
    switch (a) {
      case 1:
        console.log("normal pressed");
        setRKnormL(true);
        setRKreduceL(false);
        setRKabsL(false);
        setRKRA({ ...RKRA, Reflex_knee_left: "Normal" });
        break;
      case 2:
        console.log("reduce pressed");
        setRKnormL(false);
        setRKreduceL(true);
        setRKabsL(false);
        setRKRA({ ...RKRA, Reflex_knee_left: "Reduce" });
        break;
      case 3:
        console.log("absent pressed");
        setRKnormL(false);
        setRKreduceL(false);
        setRKabsL(true);
        setRKRA({ ...RKRA, Reflex_knee_left: "Absent" });
        break;
      case 4:
        console.log("normal pressed");
        setRKnormR(true);
        setRKreduceR(false);
        setRKabsR(false);
        setRKRA({ ...RKRA, Reflex_knee_right: "Normal" });
        break;
      case 5:
        console.log("reduce pressed");
        setRKnormR(false);
        setRKreduceR(true);
        setRKabsR(false);
        setRKRA({ ...RKRA, Reflex_knee_right: "Reduce" });
        break;
      case 6:
        console.log("absent pressed");
        setRKnormR(false);
        setRKreduceR(false);
        setRKabsR(true);
        setRKRA({ ...RKRA, Reflex_knee_right: "Absent" });
        break;
    }
  };
  const RotaxHandler = (b) => {
    switch (b) {
      case 1:
        setRAnormL(true);
        setRAreduceL(false);
        setRAabsL(false);
        setRKRA({ ...RKRA, Rotax_ankle_left: "Normal" });
        break;
      case 2:
        setRAnormL(false);
        setRAreduceL(true);
        setRAabsL(false);
        setRKRA({ ...RKRA, Rotax_ankle_left: "Reduce" });
        break;
      case 3:
        setRAnormL(false);
        setRAreduceL(false);
        setRAabsL(true);
        setRKRA({ ...RKRA, Rotax_ankle_left: "Absent" });
        break;
      case 4:
        setRAnormR(true);
        setRAreduceR(false);
        setRAabsR(false);
        setRKRA({ ...RKRA, Rotax_ankle_right: "Normal" });
        break;
      case 5:
        setRAnormR(false);
        setRAreduceR(true);
        setRAabsR(false);
        setRKRA({ ...RKRA, Rotax_ankle_right: "Reduce" });
        break;
      case 6:
        setRAnormR(false);
        setRAreduceR(false);
        setRAabsR(true);
        setRKRA({ ...RKRA, Rotax_ankle_right: "Absent" });
        break;
    }
  };
  const clearData = () => {
    setFootUlcer(false);
    setFootPain(false);
    setNumbness(false);
    setTingling(false);
    setWeakness(false);
    setAtaxia(false);
    setULS(false);
    setPinprick(false);
    setTemp(false);
    setLightTouch(false);
    setVibration(false);
    setPositionSense(false);
  };
  return (
    <ScrollView>
      <View style={styles.screen}>
      <Text>{route.params.hn_n}</Text>
        <View style={Style.container}>
          <CheckBox
            title="Foot ulcer"
            checked={Foot_ulcer}
            onPress={() => {
              setFootUlcer((Foot_ulcer) => !Foot_ulcer);
            }}
          />
          <CheckBox
            title="Foot pain"
            checked={Foot_pain}
            onPress={() => {
              setFootPain((Foot_pain) => !Foot_pain);
            }}
          />
          <CheckBox
            title="Numbness"
            checked={Numbness}
            onPress={() => {
              setNumbness((Numbness) => !Numbness);
            }}
          />
          <CheckBox
            title="Tingling"
            checked={Tingling}
            onPress={() => {
              setTingling((Tingling) => !Tingling);
            }}
          />
          <CheckBox
            title="Weakness"
            checked={Weakness}
            onPress={() => {
              setWeakness((Weakness) => !Weakness);
            }}
          />
          <CheckBox
            title="Ataxia"
            checked={Ataxia}
            onPress={() => {
              setAtaxia((Ataxia) => !Ataxia);
            }}
          />
          <CheckBox
            title="Upper limb symptom"
            checked={ULS}
            onPress={() => {
              setULS((ULS) => !ULS);
            }}
          />
          <CheckBox
            title="Pinprick"
            checked={Pinprick}
            onPress={() => {
              setPinprick((Pinprick) => !Pinprick);
            }}
          />
          <CheckBox
            title="Temp"
            checked={Temp}
            onPress={() => {
              setTemp((Temp) => !Temp);
            }}
          />
          <CheckBox
            title="Light touch"
            checked={Light_Touch}
            onPress={() => {
              setLightTouch((Light_Touch) => !Light_Touch);
            }}
          />
          <CheckBox
            title="Vibration"
            checked={Vibration}
            onPress={() => {
              setVibration((Vibration) => !Vibration);
            }}
          />
          <View>
            <Text style={Style.inputTitle}>Left knee reflex</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CheckBox
                title="Normal"
                checked={RKnormL}
                onPress={() => {
                  //ถ้าใช้Arrayต้องทำให้มันrenderถึงจะใช้ได้แต่ถ้าใช้เป็นhookมันจะrenderให้ตลอด
                  /*FlagReflex[0] = true;
                    FlagReflex[1] = false;
                    FlagReflex[2] = false;
                    console.log("Normal");
                    console.log(FlagReflex);*/
                  ReflexHandler(1);
                }}
              />
              <CheckBox
                title="Reduce"
                checked={RKreduceL}
                onPress={() => {
                  ReflexHandler(2);
                }}
              />
              <CheckBox
                title="Absent"
                checked={RKabsL}
                onPress={() => {
                  ReflexHandler(3);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={Style.inputTitle}>Right knee reflex</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CheckBox
                title="Normal"
                checked={RKnormR}
                onPress={() => {
                  ReflexHandler(4);
                }}
              />
              <CheckBox
                title="Reduce"
                checked={RKreduceR}
                onPress={() => {
                  ReflexHandler(5);
                }}
              />
              <CheckBox
                title="Absent"
                checked={RKabsR}
                onPress={() => {
                  ReflexHandler(6);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={Style.inputTitle}>Left ankle rotax</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CheckBox
                title="Normal"
                checked={RAnormL}
                onPress={() => {
                  RotaxHandler(1);
                }}
              />
              <CheckBox
                title="Reduce"
                checked={RAreduceL}
                onPress={() => {
                  RotaxHandler(2);
                }}
              />
              <CheckBox
                title="Absent"
                checked={RAabsL}
                onPress={() => {
                  RotaxHandler(3);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={Style.inputTitle}>Right ankle rotax</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CheckBox
                title="Normal"
                checked={RAnormR}
                onPress={() => {
                  RotaxHandler(4);
                }}
              />
              <CheckBox
                title="Reduce"
                checked={RAreduceR}
                onPress={() => {
                  RotaxHandler(5);
                }}
              />
              <CheckBox
                title="Absent"
                checked={RAabsR}
                onPress={() => {
                  RotaxHandler(6);
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={Style.majorButton}
            onPress = {() => {sendData(
              route.params.hn_n,
              Foot_ulcer,
              Foot_pain,
              Tingling,
              Ataxia,
              ULS,
              Pinprick,
              Vibration,
              PositionSense,
              Numbness,
              Light_Touch,
              Temp,
              Weakness,
              year,
              month,
              date,
              RKRA
            );
            navigation.navigate('Checkup',{hn_n: route.params.hn_n});
          }
        }
          >
            <Text style={Style.majorButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.minorButton}
            onPress={() => clearData()}
          >
            <Text style={Style.minorButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default Questionnaire;
