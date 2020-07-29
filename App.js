import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Detail from './screens/Detail';
import NewPatientfillin from './screens/NewPatientfillin'
import SelectPatientScreen from './screens/SelectPatient'
import Header from './components/header';
import logo from './images/logo_bartlab.png';
import Colors from './constants/color'
import SelectPatient from './screens/SelectPatient';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}

const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <View style = {{flexDirection:'row'}}>
    <Image
      style={{ width: 80, height: 80, }}
      source={logo}
    />
    <Text>    </Text> 
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="ADAPS" 
    screenOptions={{
        headerStyle: {
          height: 120,
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: 32,
        },
      }}>
      <Stack.Screen name="ADAPS" component={Home} options={{
        headerTitleAlign: 'left', 
        headerRight: props => <LogoTitle {...props} /> }}/>
      <Stack.Screen name="NewPatient" component={NewPatientfillin} initialParams={{ itemId: 42 }} />
      <Stack.Screen name="CreatePost" component= {CreatePostScreen} />
      <Stack.Screen name="SelectPatient" component= {SelectPatientScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  headerTitle: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold'
},
spacer_mid: {
  flex: 0.3
},
});
export default App;