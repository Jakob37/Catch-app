import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {RootStackParamList} from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

function InputScreen({navigation}: HomeScreenProps) {
  const [value, setValue] = useState('');
  const [textArray, setTextArray] = useState<string[]>([]);

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  const handleSave = async () => {
    if (value === '') {
      return;
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
      const currArray = [...textArray];
      currArray.splice(index, 1);
      await AsyncStorage.setItem('@MyApp:myKey', JSON.stringify(currArray));
      setTextArray(currArray);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('@MyApp:myKey')
      if (data !== null) {
        console.log("Found the data:", data)
        const currArray = JSON.parse(data);
        setTextArray(currArray)
      } else {
        console.log("No data found")
      }
    } catch (error) {
      console.log("Error loading from storage", error)
    }
  }

  useEffect(() => {
    loadDataFromStorage();
  }, [])

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        style={{borderColor: 'gray', borderWidth: 1}}></TextInput>
      <Button title="Save" onPress={handleSave}></Button>
      {/* <Button
        title="Go to content view"
        onPress={() => navigation.navigate('Details')}></Button> */}
      <View>
        {textArray.map((text: string, index: number) => (
          <View
            key={index}
            style={{flexDirection: 'row', justifyContent: 'center', height: 30}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text>{text}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Icon name="trash-o" size={20}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default InputScreen;
