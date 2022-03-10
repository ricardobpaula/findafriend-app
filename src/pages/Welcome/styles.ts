import { Dimensions, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: colors.background
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: getStatusBarHeight(),
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40
  },
  loginButtonContainer: {
    alignItems: 'center',
    padding: 10

  },
  loginButton: {
    textDecorationLine: 'underline',
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 16
  }

})

export default styles
