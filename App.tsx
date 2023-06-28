import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {enableScreens} from 'react-native-screens'
import ContentScreen from './src/screens/contentscreen'
import InputScreen from './src/screens/inputscreen'
import {STORAGE_KEY} from './src/data/storage'
import {Entry} from './src/data/entry'
import {StorageProvider} from './src/context/storage'
import {Text} from 'react-native'
import {IconButton} from './src/views/iconbutton'
import {ds, icons} from './src/ux/design'
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
            options={({navigation}) => ({
              headerTitle: () => <Text style={{color: 'black'}}>test</Text>,
              headerRight: () => (
                <IconButton
                  icon={icons.trash}
                  color={ds.colors.secondary}
                  size={ds.font.sizes.topBar}
                  onPress={() => {
                    navigation.navigate('Details')
                  }}></IconButton>
              ),
            })}
          />
          <Stack.Screen
            name="Details"
            component={ContentScreen}
            options={{
              title: 'Testing',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StorageProvider>
  )
}

export default App
