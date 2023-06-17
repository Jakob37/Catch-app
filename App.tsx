import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import ContentScreen from './src/screens/contentscreen';
import InputScreen from './src/screens/inputscreen';
enableScreens();

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={InputScreen} />
        <Stack.Screen name="Details" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
