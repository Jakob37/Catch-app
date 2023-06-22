import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../../App';
import {formatDate} from '../util/util';
import {ds, icons} from '../ux/design';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const STORAGE_KEY = '@catch:entries';

type Entry = {
  text: string;
  date: string;
};

function InputScreen({navigation}: HomeScreenProps) {
  const [currentInput, setCurrentInput] = useState('');
  const [storedEntries, setStoredEntries] = useState<Entry[]>([]);

  const handleChangeText = (text: string) => {
    setCurrentInput(text);
  };

  const handleSave = async () => {
    if (currentInput === '') {
      return;
    }
    try {
      const parsedInput = {
        text: currentInput,
        date: String(new Date()),
      };

      const updatedEntries = [...storedEntries, parsedInput];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      setStoredEntries(updatedEntries);
      setCurrentInput('');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRemove = async (index: number) => {
    try {
      const currArray = [...storedEntries];
      currArray.splice(index, 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currArray));
      setStoredEntries(currArray);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadDataFromStorage = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEntries !== null) {
        console.log('Found the data:', storedEntries);
        const currArray = JSON.parse(storedEntries);
        setStoredEntries(currArray);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.log('Error loading from storage', error);
    }
  };

  useEffect(() => {
    loadDataFromStorage();
  }, []);

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
        <View style={{flex: 1}}>
          <TextInput
            value={currentInput}
            onChangeText={handleChangeText}
            // numberOfLines={ds.textInput.numberOfLines}
            multiline={false}
            placeholder="Enter your thoughts..."
            onSubmitEditing={_event => {
              handleSave();
            }}></TextInput>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingRight: ds.spacing.sideMargins,
            }}>
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name={icons.save}
                size={ds.icons.size}
                style={{color: ds.colors.primary}}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Button
        title="Go to content view"
        onPress={() => navigation.navigate('Details')}></Button> */}
      <View>
        {storedEntries
          .slice(0)
          .reverse()
          .map((entry: Entry, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                // Should be controlled by content, isn't it
                height: ds.entries.height,
                paddingLeft: ds.spacing.sideMargins,
                marginVertical: ds.spacing.verticalPadding,
              }}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
                  <Text
                    style={{
                      color: ds.colors.primary,
                      flexWrap: 'wrap',
                      fontSize: ds.font.sizes.major,
                    }}>
                    {entry.text}
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: ds.colors.secondary,
                      fontSize: ds.font.sizes.minor,
                    }}>
                    {formatDate(entry.date)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'center',
                  paddingRight: ds.spacing.sideMargins,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    // Temporary fix to get the right entry
                    // Should be using index-based system
                    handleRemove(storedEntries.length - index - 1)
                  }>
                  <Icon
                    name={icons.trash}
                    size={ds.icons.size}
                    style={{color: ds.colors.primary}}></Icon>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}

export default InputScreen;
