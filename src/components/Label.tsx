import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface LabelProps extends TouchableOpacityProps {
  title: string,
  text: string
}

const Label:React.FC<LabelProps> = ({ title, text, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <View>
        <Text style={styles.title}> {title} </Text>
        <Text style={styles.text}> {text} </Text>
      </View>
      <View style={styles.buttonContainer}>
          <Text style={styles.textButton}> Editar </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: colors.shape,
    borderBottomWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  title: {
    fontFamily: fonts.text,
    fontSize: 16,
    marginBottom: 5,
    color: colors.black
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 14,
    marginBottom: 5,
    color: colors.text_gray
  },
  buttonContainer: {

  },
  textButton: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  }
})

export default Label
