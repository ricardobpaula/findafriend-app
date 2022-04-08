import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native'

import { Modalize } from 'react-native-modalize'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import HeaderModal from '../HeaderModal'

export interface InputModalHandles {
  openModal: ()=>void
}

interface InputModalProps extends TextInputProps {
  title: string;
  text?: string;
}

const InputLargeText:React.ForwardRefRenderFunction<InputModalHandles, InputModalProps> = ({ title, ...rest }, ref) => {
  const modalizeRef = useRef<Modalize>(null)

  function openModal () {
    modalizeRef.current?.open()
  }

  function closeModal () {
    modalizeRef.current?.close()
  }

  useImperativeHandle(ref,
    () => ({
      openModal: openModal
    })
  )
  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={Dimensions.get('screen').height * 0.2}
      modalStyle={styles.container}
      HeaderComponent={
        <HeaderModal
        title=''
        onClose={closeModal}
        onSave={closeModal}
        showSaveButton={true}
      />}
    >
      <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            {...rest}
          />
      </View>
    </Modalize>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  content: {
    padding: 20
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: colors.black
  },
  input: {
    paddingTop: 10,
    fontFamily: fonts.text,
    fontSize: 22,
    color: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: Dimensions.get('window').height * 0.1
  }
})

export default forwardRef(InputLargeText)
