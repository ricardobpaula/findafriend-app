import React from 'react'

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet
} from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface Props extends TouchableOpacityProps {
  title: string
}

const TextButton:React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 16
  }
})

export default TextButton
