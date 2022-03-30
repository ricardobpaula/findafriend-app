import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface HeaderModalProps {
  title: string,
  showSaveButton?:boolean,
  onClose: ()=>void,
  onSave?: ()=>void
}

const HeaderModal:React.FC<HeaderModalProps> = ({
  title,
  showSaveButton = false,
  onClose,
  onSave = () => {}
}) => {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.leftSide}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClose}
        >
          <Ionicons
            name='close-sharp'
            size={22}
            color={colors.black}
          />
        </TouchableOpacity>
      <Text style={styles.title}> {title} </Text>
      </View>
      {showSaveButton &&
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSave}
        >
          <Text style={styles.saveButton}> Salvar </Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  leftSide: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.black
  },
  saveButton: {
    fontFamily: fonts.heading,
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: colors.black
  }
})

export default HeaderModal
