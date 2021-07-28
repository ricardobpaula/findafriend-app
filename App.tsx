import React from 'react'
import AppLoading from 'expo-app-loading'

import Routes from './src/routes'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import {
  RobotoMono_400Regular,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold
}
from '@expo-google-fonts/roboto-mono'
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    RobotoMono_400Regular,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold
  })

  if(!fontsLoaded){
    return (
      <AppLoading/>
    ) 
  }

  return (
    <Routes/>
  )


}