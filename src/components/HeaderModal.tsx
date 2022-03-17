import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface HeaderModalProps extends TouchableOpacityProps {
  title: string
}

const HeaderModal:React.FC<HeaderModalProps> = ({ title, ...rest }) => {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}> {title} </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        {...rest}
      >
        <Ionicons
          name='close-sharp'
          size={22}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.black
  }
})

export default HeaderModal
