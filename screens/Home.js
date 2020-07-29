import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import {firedb} from '../components/firebase'


function storeHR(userId,BP_value){
    firedb.ref('uid/'+userId).update({Sys: BP_value});
  }

export default function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      var BP = route.params?.post;
      storeHR('111111',BP);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 35, fontWeight:'bold'}}>WELLCOME TO ADAPS</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate('SelectPatient')}
      />
      <Button title = 'plus1' onPress = {()=>storeHR('123456','528')} />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}