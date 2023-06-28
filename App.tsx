import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {enableScreens} from 'react-native-screens'
import ContentScreen from './src/screens/contentscreen'
import InputScreen from './src/screens/inputscreen'
import {STORAGE_KEY} from './src/data/storage'
import {Entry} from './src/data/entry'
import {StorageProvider} from './src/context/storage'
enableScreens()

export type RootStackParamList = {
  Home: undefined
  Details: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    dark: 'gray',
    background: 'gray',
  },
}

function App(): JSX.Element {
  return (
    <StorageProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={InputScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={ContentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StorageProvider>
  )
}

export default App
