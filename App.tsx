import 'react-native-gesture-handler'

import React from 'react'
import AppLoading from 'expo-app-loading'

import Routes from './src/routes'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'
import colors from './src/styles/colors'
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if(!fontsLoaded){
    return (
      <AppLoading/>
    ) 
  }

  return (<>
    <StatusBar
        backgroundColor={colors.statusBar}
         />
    <Routes/>
    </>
  )


}