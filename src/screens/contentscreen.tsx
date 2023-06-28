import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {ScrollView, Text, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {EntryRow} from '../views/views'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEY, loadDataFromStorage} from '../data/storage'
import {Entry} from '../data/entry'
import {useContext, useEffect, useState} from 'react'
import {StorageContext} from '../context/storage'

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
  const {entries, saveEntries} = useContext(StorageContext)

  const handleRemove = async (index: number) => {
    try {
      const currArray = [...entries]
      currArray.splice(index, 1)
      saveEntries(currArray)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <View>
      <Text>Content screen</Text>
      <ScrollView>
        {entries
          .slice(0)
          .reverse()
          .map((entry: Entry, index: number) => (
            <EntryRow
              key={index}
              entry={entry}
              handleRemove={() =>
                handleRemove(entries.length - index - 1)
              }></EntryRow>
          ))}
      </ScrollView>
    </View>
  )
}

export default ContentScreen
