import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import LottieView from 'lottie-react-native'

import NotFoundAnimation from '../assets/lottie/no_results.json'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

const NoResult:React.FC = () => {
  return (
        <View style={styles.container}>
            <LottieView
                source={NotFoundAnimation}
                autoPlay
                loop={true}
                style={styles.gif}
            />
            <Text style={styles.text}> Não encontramos pets próximos a você =(</Text>
        </View>
  )
}

export default NoResult

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gif: {
    width: Dimensions.get('window').width * 0.6
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 16,
    padding: 10
  }
})
