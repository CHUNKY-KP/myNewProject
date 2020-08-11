import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import Constants from "expo-constants";
import Style from "../constants/Style";
import Color from "../constants/color";
import { fireauth, firedb } from "../components/firebase";

const Separator = () => (
    <View style={Style.separator} />
);

let snapSymptom = [];



export default class SummaryRecord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // hn: this.props.inputHN,
            // selectedMedical_Record: this.props.inputMR,
            hn: 'HN0010',
            selectedMedical_Record: '2019-12-02',
            snapGender: "",
            snapFirstname: "",
            snapLastname: "",
            snapWeight: "",
            snapHeight: "",
            snapBP_Dia_left: "",
            snapBP_Dia_right: "",
            snapBP_Sys_left: "",
            snapBP_Sys_right: "",
            snapFBS: "",
            snapHb1Ac: "",
        };
    }

    snapInfo = () => {
        firedb
            .ref("Patient/" + this.state.hn)
            .once("value", (snapshot) => {
                this.setState({
                    snapGender: snapshot.val().Gender,
                    snapFirstname: snapshot.val().Firstname,
                    snapLastname: snapshot.val().Lastname,
                })
            })
    }

    snapStaticData = () => {
        firedb
            .ref("Patient/" + this.state.hn + "/Medical_Record/" + this.state.selectedMedical_Record)
            .once("value", (snapshot) => {
                this.setState({
                    snapBP_Dia_left: snapshot.val().BP_Dia_left,
                    snapBP_Dia_right: snapshot.val().BP_Dia_right,
                    snapBP_Sys_left: snapshot.val().BP_Sys_left,
                    snapBP_Sys_right: snapshot.val().BP_Sys_right,
                    snapHeight: snapshot.val().Height,
                    snapWeight: snapshot.val().Weight,
                    snapFBS: snapshot.val().FBS,
                    snapHbA1c: snapshot.val().HbA1c,
                })
            })
    }

    snapQuestionnaire = () => {
        snapSymptom = [];
        firedb
            .ref("Patient/" + this.state.hn + "/Medical_Record/" + this.state.selectedMedical_Record + "/Questionnaire")
            .orderByValue()
            .equalTo(true)
            .once("value", (snapshot) => {
                snapshot.forEach((childsnapshot) => {
                    const key = childsnapshot.key;
                    snapSymptom.push(key);
                    snapSymptom.reduce(
                        (unique, item) =>
                            unique.includes(item) ? unique : [...unique, item],
                        []
                    );
                });
            });
    }

    Item = ({ title, id }) => (
        <View style={styles.item}>
            <Text style={styles.title}>
                {id}:{title}
            </Text>
        </View>
    );

    render() {
        this.snapInfo();
        this.snapStaticData();
        return (
            <View>
                <ScrollView>
                    <Text style={Style.Displaydata}>INFORMATION:</Text>
                    <Text style={{ ...Style.Displaydata, margin: 10 }}>
                        Fullname: {this.state.snapFirstname}    {this.state.snapLastname}{'\n'}
                        Gender: {this.state.snapGender}{'\n\n'}
                        HN: {this.state.hn}{'\n'}
                        Date: {this.state.selectedMedical_Record}{'\n'}
                        {/* Height: {this.state.snapHeight} cm{'\n'}
                        Weight: {this.state.snapWeight} kg{'\n\n'}
                        Blood Pressure (L): {this.state.snapBP_Sys_left}/{this.state.snapBP_Dia_left} mmHg{'\n'}
                        Blood Pressure (R): {this.state.snapBP_Sys_right}/{this.state.snapBP_Dia_right} mmHg{'\n'}
                        FBS: {this.state.snapFBS} mg/dL{'\n'}
                        HbA1c: {this.state.snapHbA1c} %                         */}
                    </Text>
                    <Separator />
                </ScrollView>
            </View>
        );
    }
}
