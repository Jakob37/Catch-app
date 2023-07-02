import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { RootStackParamList } from '../../App'
import { StorageContext } from '../context/storage'
import { Entry } from '../data/entry'
import { EntryRow } from '../views/views'

function EntriesScreen() {
  const { entries, saveEntries } = useContext(StorageContext)

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
      <ScrollView>
        {entries.length > 0 ? (
          entries
            .slice(0)
            .reverse()
            .map((entry: Entry, index: number) => (
              <EntryRow
                key={index}
                entry={entry}
                handleRemove={() =>
                  handleRemove(entries.length - index - 1)
                }></EntryRow>
            ))
        ) : (
          <Text>No entries to show</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default EntriesScreen
