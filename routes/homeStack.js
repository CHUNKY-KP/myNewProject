
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Detail from '../screens/Detail';

import { NavigationContainer } from '@react-navigation/native';


const screens = {
  Home: {
    screen: Home,
  },
  ReviewDetails: {
    screen: Detail,
  },
};

export default function Test() {
  return (<NavigationContainer><Stack.Navigator>
  <Stack.Screen name="Home" component={Home} />
</Stack.Navigator></NavigationContainer>);
}
//export default createAppContainer(HomeStack);