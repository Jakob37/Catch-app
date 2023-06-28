import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect, useState} from 'react'
import {Button, Text, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {StorageContext} from '../context/storage'
import {ds} from '../ux/design'
import {IconButton, InputRow} from '../views/views'
import {icons} from '../ux/icons'
import {TopBarIconButton} from '../views/iconbutton'

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TopBarIconButton
            icon={icons.bars}
            onPress={() => {
              navigation.navigate('Entries')
            }}></TopBarIconButton>
          <TopBarIconButton
            icon={icons.floppy}
            onPress={handleSave}></TopBarIconButton>
        </View>
      ),
    })
  }, [currentInput, currentTagInput])

  const handleSave = async () => {
    console.log('handling save')
    console.log('current input', currentInput)
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
      console.log('Updated entries', updatedEntries)
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
