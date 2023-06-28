import React, {useEffect, useState} from 'react'
import {Entry} from '../data/entry'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEY} from '../data/storage'

const StorageContext = React.createContext<{
  entries: Entry[]
  saveEntries: (entries: Entry[]) => void
}>({
  entries: [],
  saveEntries: _entries => {
    console.error('This placeholder should not be called')
  },
})

interface DataProviderProps {
  children: React.ReactNode
}

const StorageProvider: React.FC<DataProviderProps> = ({children}) => {
  const [entries, setEntries] = useState<Entry[]>([])

  // Load data from async storage
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedData) {
        setEntries(JSON.parse(storedData))
      }
    } catch (error) {
      console.log('Error retrieving data from async storage:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const saveEntries = async (updatedData: Entry[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
      setEntries(updatedData)
    } catch (error) {
      console.log('Error saving data to async storage', error)
    }
  }

  return (
    <StorageContext.Provider value={{entries, saveEntries}}>
      {children}
    </StorageContext.Provider>
  )
}

export {StorageContext, StorageProvider}
