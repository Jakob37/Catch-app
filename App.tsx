import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens();

function InputScreen({navigation}) {
  const [value, setValue] = useState('');
  const [textArray, setTextArray] = useState<string[]>([]);

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  const handleSave = async () => {
    try {
      const newArray = [...textArray, value];
      await AsyncStorage.setItem('@MyApp:myKey', JSON.stringify(newArray));
      console.log(`${value} stored`);
      setTextArray(newArray);
      setValue('');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View>
      <Text>Hello world!!</Text>
      <Text>Stored value: {value}</Text>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        style={{borderColor: 'gray', borderWidth: 1}}></TextInput>
      <Button title="Save" onPress={handleSave}></Button>
      <Button
        title="Go to content view"
        onPress={() => navigation.navigate('Details')}></Button>
      <View>
        {textArray.map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
      </View>
    </View>
  );
}

function ContentScreen({navigation}) {
  return (
    <View>
      <Text>Content screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

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

export default App;
