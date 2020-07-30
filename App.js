import * as React from 'react';
import { View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './routes/homeStack'

function App() {
  return (
    <NavigationContainer><HomeStack/></NavigationContainer>
  );
}
export default App;