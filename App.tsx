import { createDrawerNavigator } from '@react-navigation/drawer'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import { StorageProvider } from './src/context/storage'
import EntriesScreen from './src/screens/entriesscreen'
import InputScreen from './src/screens/inputscreen'
enableScreens()

export type RootStackParamList = {
  Home: undefined
  Entries: undefined
}

const Drawer = createDrawerNavigator()

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
        <Drawer.Navigator>
          <Drawer.Screen name="Input" component={InputScreen}></Drawer.Screen>
          <Drawer.Screen
            name="List entries"
            component={EntriesScreen}></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </StorageProvider>
  )
}

export default App
