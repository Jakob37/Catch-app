import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {Text} from 'react-native'
import {enableScreens} from 'react-native-screens'
import {StorageProvider} from './src/context/storage'
import EntriesScreen from './src/screens/entriesscreen'
import InputScreen from './src/screens/inputscreen'
import {ds, icons} from './src/ux/design'
import {IconButton} from './src/views/iconbutton'
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
          <Stack.Screen
            name="Home"
            component={InputScreen}
            options={({navigation}) => ({
              headerRight: () => (
                <IconButton
                  icon={icons.bars}
                  color={ds.colors.secondary}
                  size={ds.font.sizes.topBar}
                  onPress={() => {
                    navigation.navigate('Entries')
                  }}
                  style={{padding: ds.spacing.sideMargins}}></IconButton>
              ),
            })}
          />
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
