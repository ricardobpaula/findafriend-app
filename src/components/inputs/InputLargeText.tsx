import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import HeaderModal from '../HeaderModal'
import CustomModal, { CustomModalHandles } from '../modals/CustomModal'

export interface InputLargeTextHandles {
  openModal: ()=>void
}

interface InputLargeTextProps extends TextInputProps {
  title: string;
  text?: string;
}

const InputLargeText:React.ForwardRefRenderFunction<InputLargeTextHandles, InputLargeTextProps> = ({ title, ...rest }, ref) => {
  const customModalRef = useRef<CustomModalHandles>(null)

  function openModal () {
    customModalRef.current?.open()
  }

  function closeModal () {
    customModalRef.current?.close()
  }

  useImperativeHandle(ref,
    () => ({
      openModal: openModal
    })
  )
  return (
    <CustomModal
      height={Dimensions.get('screen').height * 0.6}
      ref={customModalRef}
      Header={
        <HeaderModal
          title=''
          onClose={closeModal}
          onSave={closeModal}
          showSaveButton={true}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              {...rest}
            />
        </View>
      </View>
    </CustomModal>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginTop: 10,
    fontFamily: fonts.text,
    fontSize: 22,
    color: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: Dimensions.get('window').height * 0.2
  }
})

export default forwardRef(InputLargeText)
