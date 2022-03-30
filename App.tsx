import 'react-native-gesture-handler'

import React from 'react'
import { SafeAreaView } from 'react-native'
import AppLoading from 'expo-app-loading'

import { AuthProvider } from './src/contexts/auth'

import Routes from './src/routes'

import styles from './src/styles/GlobalStyles'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_100Thin,
  Roboto_300Light
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'
import colors from './src/styles/colors'
import { NavigationContainer } from '@react-navigation/native'

const App:React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_300Light
  })

  if (!fontsLoaded) {
    return (
      <AppLoading/>
    )
  }

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar
            backgroundColor={colors.status_bar}
          />
          <Routes/>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
