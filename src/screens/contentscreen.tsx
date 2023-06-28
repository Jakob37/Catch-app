import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {ScrollView, Text, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {EntryRow} from '../views/views'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEY, loadDataFromStorage} from '../data/storage'
import {Entry} from '../data/entry'
import {useEffect, useState} from 'react'

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>
type DetailsScreenProps = {
  navigation: DetailsScreenNavigationProp
  route: DetailsScreenRouteProp
}

function ContentScreen({route}: DetailsScreenProps) {
  const [storedEntries, setStoredEntries] = useState<Entry[]>([])

  useEffect(() => {
    loadDataFromStorage(entries => setStoredEntries(entries))
  }, [])

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

  return (
    <View>
      <Text>Content screen</Text>
      <ScrollView>
        {storedEntries
          .slice(0)
          .reverse()
          .map((entry: Entry, index: number) => (
            <EntryRow
              index={index}
              entry={entry}
              handleRemove={() =>
                handleRemove(storedEntries.length - index - 1)
              }></EntryRow>
          ))}
      </ScrollView>
    </View>
  )
}

export default ContentScreen
