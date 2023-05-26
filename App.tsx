import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens();

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

type DetailsScreenProps = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

function InputScreen({navigation}: HomeScreenProps) {
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

function ContentScreen() {
  return (
    <View>
      <Text>Content screen</Text>
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

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
