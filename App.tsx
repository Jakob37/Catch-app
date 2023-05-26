import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

function App(): JSX.Element {
  const [value, setValue] = useState('');

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('@MyApp:myKey', value);
      console.log(`${value} stored`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View>
      <Text>Hello world!</Text>
      <Text>Stored value: {value}</Text>
      <TextInput
        onChangeText={handleChangeText}
        style={{borderColor: 'gray', borderWidth: 1}}></TextInput>
      <Button title="Save" onPress={handleSave}></Button>
    </View>
  );
}

export default App;
