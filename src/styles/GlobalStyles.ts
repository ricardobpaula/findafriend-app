import { StyleSheet, Platform, StatusBar } from 'react-native'
import colors from './colors'

const paddingTop = StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? paddingTop : 0
  }
})

export default styles
