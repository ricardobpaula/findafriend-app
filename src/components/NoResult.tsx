import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import LottieView from 'lottie-react-native'

import NotFoundAnimation from '../assets/lottie/no_results.json'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface NoResultProps {
  size: number,
  text: string
}

const NoResult:React.FC<NoResultProps> = ({ size, text }) => {
  return (
        <View style={styles.container}>
            <LottieView
                source={NotFoundAnimation}
                autoPlay
                loop={true}
                style={{ width: size }}
            />
            <Text style={styles.text}> {text} </Text>
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
  text: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 16,
    padding: 10
  }
})
