//Require HN and date
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
  FlatList,
  InteractionManager,
} from "react-native";
import Constants from "expo-constants";
import { firedb } from "../components/firebase";
import Style from "../constants/Style";
import { CheckBox, Divider } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { render } from "react-dom";
// let DATA = [];
// let DATA2 = [];
var snapQuestionnaire = [];
const Separator = () => <View style={styles.separator} />;
const Summary = (props, navigation) => {
  const [info, setinfo] = useState({
    BP_Dia_left: "",
    BP_Dia_right: "",
    BP_Sys_left: "",
    BP_Sys_right: "",
    Height: "",
    Weight: "",
    FBS: "",
    HbA1c: "",
    BPS_DP_left: "",
    BPS_PT_left: "",
    BPS_DP_right: "",
    BPS_PT_right: "",
  });
  const getQuestionnaire = () => {
    firedb
      .ref(
        "Patient/HN" +
          props.inputHN +
          "/" +
          "Medical_Record/" +
          props.inputMR +
          "/" +
          "Questionnaire"
      )
      .orderByValue()
      .equalTo(true)
      .once("value", (snapshot) => {
        snapshot.forEach((childsnapshot) => {
          const key = childsnapshot.key;
          snapQuestionnaire.push(key);
          snapQuestionnaire.reduce(
            (unique, item) =>
              unique.includes(item) ? unique : [...unique, item],
            []
          );
        });
      });
    firedb
      .ref(
        "Patient/HN" +
          props.inputHN +
          "/" +
          "Medical_Record/" +
          props.inputMR +
          "/" +
          "Questionnaire"
      )
      .orderByValue()
      .limitToLast(4)
      .once("value", (snapshot) => {
        snapshot.forEach((childsnapshot) => {
          const key = childsnapshot.key;
          const val = childsnapshot.val();
          const temp = key + " : " + val;
          snapQuestionnaire.push(temp);
        });
      });

    console.log("snapQ");
    console.log(snapQuestionnaire);
    //console.log(DATA2);
    //console.log(Questionnaire);
  };
  const getInfo = () => {
    firedb
      .ref(
        "Patient/HN" +
          props.inputHN +
          "/" +
          "Medical_Record/" +
          props.inputMR +
          "/"
      )
      .once("value", (snapshot) => {
        setinfo({
          BP_Dia_left: snapshot.val().BP_Dia_left,
          BP_Dia_right: snapshot.val().BP_Dia_right,
          BP_Sys_left: snapshot.val().BP_Sys_left,
          BP_Sys_right: snapshot.val().BP_Sys_right,
          Height: snapshot.val().Height,
          Weight: snapshot.val().Weight,
          FBS: snapshot.val().FBS,
          HbA1c: snapshot.val().HbA1c,
          BPS_DP_left: snapshot.val().BPS_DP_left,
          BPS_PT_left: snapshot.val().BPS_PT_left,
          BPS_DP_right: snapshot.val().BPS_DP_right,
          BPS_PT_right: snapshot.val().BPS_PT_right,
        });
      });
  };
  // const fetchData = () => {
  //   firedb
  //     .ref("Patient/" + 'HN0012' + "/Medical_Record/" + props.inputDate)
  //     .on("value", (snapshot) => {
  //       snapshot.forEach((childsnapshot, i) => {
  //         const title = childsnapshot.val();
  //         const id = childsnapshot.key;
  //         if (id != "Questionnaire") {
  //           DATA.push({ id, title });
  //           //setData({ key: key, item: item });
  //           setData([...Data, ...DATA]);
  //         }
  //         //console.log(Data);
  //       });
  //     });
  //   return DATA;
  // };
  //console.log(Data);
  //console.log(DATA2);
  // useEffect(() => {
  //   //not working
  //   setTimeout(() => {
  //     getInfo();
  //     fetchData();
  //     getQuestionnaire();
  //   }, 1000);
  // }, [Data != [], DATA2 != []]);
  useLayoutEffect(() => {
    getInfo();
    getQuestionnaire();
    console.log(info);
  }, []);

  const Item = ({ title, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>
        {id}:{title}
      </Text>
    </View>
  );
  /*<FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> */
  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;
  console.log(snapQuestionnaire);
  const changePage = () => {
    
    //go to selectPatientScreeen page
  };

  return (
    <ScrollView>
      <View style={Style.container}>
        <Text style={Style.Displaydata}>INFORMATION:</Text>
        <Text style={{ ...Style.Displaydata, margin: 10 }}>
          HN: {props.inputHN}
          {"\n"}
          Date: {props.inputMR}
          {"\n"}
          Height: {info.Height} cm{"\n"}
          Weight: {info.Weight} kg{"\n\n"}
          FBS: {info.FBS} mg/dL{"\n"}
          HbA1c: {info.HbA1c} %{"\n"}
          Blood Pressure (L): {info.BP_Sys_left}/{info.BP_Dia_left} mmHg{"\n"}
          Blood Pressure (R): {info.BP_Sys_right}/{info.BP_Dia_right} mmHg{" "}
          {"\n"}
          Left ankle pressure (DP,PT):{"\n"}
          {info.BPS_DP_left}mmHg , {info.BPS_PT_left} mmHg{"\n"}Right ankle
          pressure (DP,PT):{"\n"}
          {info.BPS_DP_right}mmHg , {info.BPS_PT_right} mmHg
        </Text>
      </View>
      <Separator />
      <View style={Style.container}>
        <Text style={Style.Displaydata}>SYMPTOMS:</Text>
        <View style={{ margin: 10 }}>
          {snapQuestionnaire.map((item, key) => (
            <Text key={key} style={Style.Displaydata}>
              - {item}
            </Text>
          ))}
        </View>
      </View>

      <Separator />

      <View>
        <Text style={Style.Displaydata}>Test Result:</Text>
      </View>
      <TouchableOpacity style={Style.minorButton} onPress={changePage}>
        <Text style={Style.minorButtonText}>Ok</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  Displaydata: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "bisque",
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default Summary;
