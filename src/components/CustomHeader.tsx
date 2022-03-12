import React from 'react'
import {
  StyleSheet
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { ButtonBack } from './ButtonBack'

export default function CustomHeader ():Object {
  return {
    headerBackImage: () => <ButtonBack />,
    headerTitle: '',
    headerStyle: styles.container,
    headerTitleStyle: styles.title
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0
  },
  title: {
    fontSize: 23,
    lineHeight: 32,
    color: colors.heading,
    fontFamily: fonts.heading
  }

})
