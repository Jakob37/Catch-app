import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {Text, View} from 'react-native'
import {enableScreens} from 'react-native-screens'
import {StorageProvider} from './src/context/storage'
import EntriesScreen from './src/screens/entriesscreen'
import InputScreen from './src/screens/inputscreen'
import {ds} from './src/ux/design'
import {IconButton} from './src/views/iconbutton'
import {icons} from './src/ux/icons'
enableScreens()

export type RootStackParamList = {
  Home: undefined
  Entries: undefined
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
          <Stack.Screen name="Home" component={InputScreen} />
          <Stack.Screen
            name="Entries"
            component={EntriesScreen}
            options={{
              title: 'Entries',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StorageProvider>
  )
}

export default App
