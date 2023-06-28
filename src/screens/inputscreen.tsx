import AsyncStorage from '@react-native-async-storage/async-storage'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect, useState} from 'react'
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {RootStackParamList} from '../../App'
import {formatDate} from '../util/util'
import {ds, icons} from '../ux/design'
import {InputRow} from '../views/views'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRouteProp
}

const STORAGE_KEY = '@catch:entries'

type Entry = {
  text: string
  date: string
  tags: string[]
}

function InputScreen({navigation}: HomeScreenProps) {
  const [currentInput, setCurrentInput] = useState('')
  const [currentTagInput, setCurrentTagInput] = useState('')
  const [storedEntries, setStoredEntries] = useState<Entry[]>([])

  const [tags, setTags] = useState<string[]>([])

  const handleSave = async () => {
    if (currentInput === '') {
      return
    }
    try {
      const parsedInput = {
        text: currentInput,
        date: String(new Date()),
        tags: tags,
      }

      const updatedEntries = [...storedEntries, parsedInput]
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries))
      setStoredEntries(updatedEntries)
      setCurrentInput('')
      setTags([])
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSaveTag = async () => {
    if (currentTagInput === '') {
      return
    }
    const updatedTags = [...tags, currentTagInput]
    setTags(updatedTags)
    setCurrentTagInput('')
  }

  const handleRemove = async (index: number) => {
    try {
      const currArray = [...storedEntries]
      currArray.splice(index, 1)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currArray))
      setStoredEntries(currArray)
    } catch (error) {
      console.log('error', error)
    }
  }

  const loadDataFromStorage = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedEntries !== null) {
        const currArray = JSON.parse(storedEntries)
        setStoredEntries(currArray)
      } else {
        console.log('No data found')
      }
    } catch (error) {
      console.log('Error loading from storage', error)
    }
  }

  useEffect(() => {
    loadDataFromStorage()
  }, [])

  return (
    <View style={{height: '100%'}}>
      <InputRow
        placeholder="Enter your thoughts..."
        icon={icons.save}
        textInputValue={currentInput}
        handleSave={handleSave}
        handleChangeText={(text: string) => setCurrentInput(text)}></InputRow>
      <Text>{tags.map((tag: string) => `#${tag}`).join(' ')}</Text>

      <InputRow
        placeholder="Enter your tags..."
        icon={icons.tag}
        textInputValue={currentTagInput}
        handleSave={handleSaveTag}
        handleChangeText={(text: string) =>
          setCurrentTagInput(text)
        }></InputRow>

      {/* <Button
        title="Go to content view"
        onPress={() => navigation.navigate('Details')}></Button> */}
      <ScrollView>
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
                paddingLeft: ds.spacing.sideMargins,
                marginVertical: ds.spacing.verticalPadding,
              }}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: ds.colors.primary,
                      flexWrap: 'wrap',
                      fontSize: ds.font.sizes.major,
                    }}>
                    {entry.text}
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: ds.colors.secondary,
                        fontSize: ds.font.sizes.minor,
                      }}>
                      {formatDate(entry.date, true)}
                    </Text>
                    <Text
                      style={{
                        color: ds.colors.primary,
                        fontSize: ds.font.sizes.minor,
                      }}>
                      {entry.tags != null
                        ? entry.tags.map(tag => `#${tag}`).join(' ')
                        : '<No tags>'}
                    </Text>
                  </View>
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
      </ScrollView>
    </View>
  )
}

export default InputScreen
