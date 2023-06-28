import AsyncStorage from '@react-native-async-storage/async-storage'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect, useState} from 'react'
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {RootStackParamList} from '../../App'
import {formatDate} from '../util/util'
import {ds, icons} from '../ux/design'
import {EntryRow, InputRow} from '../views/views'
import {Entry} from '../data/entry'
import {STORAGE_KEY, loadDataFromStorage} from '../data/storage'
import {StorageContext} from '../context/storage'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRouteProp
}

function InputScreen({navigation}: HomeScreenProps) {
  const [currentInput, setCurrentInput] = useState('')
  const [currentTagInput, setCurrentTagInput] = useState('')
  const {entries, saveEntries} = useContext(StorageContext)

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

      const updatedEntries = [...entries, parsedInput]
      saveEntries(updatedEntries)
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

  return (
    <View style={{height: '100%'}}>
      <InputRow
        placeholder="Enter your thoughts..."
        icon={icons.save}
        textInputValue={currentInput}
        handleSave={handleSave}
        handleChangeText={(text: string) => setCurrentInput(text)}></InputRow>
      <Text style={{color: ds.colors.secondary, fontSize: ds.font.sizes.minor}}>
        {tags.map((tag: string) => `#${tag}`).join(' ')}
      </Text>

      <InputRow
        placeholder="Enter your tags..."
        icon={icons.tag}
        textInputValue={currentTagInput}
        handleSave={handleSaveTag}
        handleChangeText={(text: string) =>
          setCurrentTagInput(text)
        }></InputRow>
    </View>
  )
}

export default InputScreen
