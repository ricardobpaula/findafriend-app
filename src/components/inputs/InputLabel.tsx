import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps
} from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface InputLabelProps extends TextInputProps {
  title: string;
  error?: any;
}

const InputLabel: React.FC<InputLabelProps> = ({ title, error, ...rest }) => {
  const [focus, setFocus] = useState(false)

  return (
    <View style={styles.container}>
      <View style={[
        styles.content

      ]}>
        <View
          style={[styles.input,
            focus && styles.onFocus,
            error && styles.borderError]}
        >
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.text}
            {...rest}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20
  },
  content: {
    flex: 1
  },
  input: {
    borderColor: colors.shape,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  },
  onFocus: {
    borderColor: colors.orange
  },
  borderError: {
    borderColor: colors.red
  },
  title: {
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.complement
  },
  text: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.sub
  }
})

export default InputLabel
