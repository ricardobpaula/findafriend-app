import 'react-native-gesture-handler'

import React from 'react'
import AppLoading from 'expo-app-loading'

import {AuthProvider} from './src/contexts/auth'

import Routes from './src/routes'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'
import colors from './src/styles/colors'
import { NavigationContainer } from '@react-navigation/native'

const App:React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if(!fontsLoaded){ 
    return (
      <AppLoading/>
    ) 
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor={colors.statusBar}
        />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  )

}

export default App