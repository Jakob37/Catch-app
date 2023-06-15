import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

function InputScreen({navigation}: HomeScreenProps) {
    const [value, setValue] = useState('');
    const [textArray, setTextArray] = useState<string[]>([]);
  
    const handleChangeText = (text: string) => {
      setValue(text);
    };
  
    const handleSave = async () => {
      if (value === "") {
        return
      }
      try {
        const newArray = [...textArray, value];
        await AsyncStorage.setItem('@MyApp:myKey', JSON.stringify(newArray));
        setTextArray(newArray);
        setValue('');
      } catch (error) {
        console.log('error', error);
      }
    };
  
    const handleRemove = async (index: number) => {
      try {
        const currArray = [...textArray]
        currArray.splice(index, 1);
        console.log('Array:', JSON.stringify(currArray))
        await AsyncStorage.setItem('@MyApp:myKey', JSON.stringify(currArray));
        setTextArray(currArray)
        // setTextArray(textArray);
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
          {textArray.map((text: string, index: number) => (
            <View>
              <Text key={index}>{text}</Text>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }

  export default InputScreen