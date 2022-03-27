import { StyleSheet } from 'react-native'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  body: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 25,
    color: colors.heading
  },
  subTitle: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  termContainer: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text
  },
  link: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.orange_dark,
    fontFamily: fonts.text,
    textDecorationLine: 'underline'
  }
})

export default styles
