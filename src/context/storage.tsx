import React, {useEffect, useState} from 'react'
import {Entry} from '../data/entry'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {STORAGE_KEY} from '../data/storage'

const StorageContext = React.createContext<Entry[]>([])

interface DataProviderProps {
  children: React.ReactNode
}

const StorageProvider: React.FC<DataProviderProps> = ({children}) => {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
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

    fetchData()
  }, [])

  return (
    <StorageContext.Provider value={entries}>
      {children}
    </StorageContext.Provider>
  )
}

export {StorageContext, StorageProvider}
