import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

function App(): JSX.Element {
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
      <Text>Hello world!</Text>
      <Text>Stored value: {value}</Text>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        style={{borderColor: 'gray', borderWidth: 1}}></TextInput>
      <Button title="Save" onPress={handleSave}></Button>
      <View>
        {textArray.map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
      </View>
    </View>
  );
}

export default App;
