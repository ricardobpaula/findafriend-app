import React, { useState, useImperativeHandle, forwardRef } from 'react'

import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions
} from 'react-native'

import Button from './Button'

import LottieView from 'lottie-react-native'

import ErrorDogAnimation from '../assets/lottie/error_dog.json'
import fonts from '../styles/fonts'
import colors from '../styles/colors'

export interface AlertHandles {
    openModal: ()=> void
}

interface AlertProps {
    title: string,
    text: string|undefined,
    type: 'alert'|'confirm'
}

const CustomAlert:React.ForwardRefRenderFunction<AlertHandles, AlertProps> = (props, ref) => {
  const [visible, setVisible] = useState(false)

  function openModal () {
    setVisible(true)
  }

  function closeModal () {
    setVisible(false)
  }

  useImperativeHandle(ref, () => {
    return {
      openModal
    }
  })

  return (
        <Modal
            animationType='fade'
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textView}>
                        <Text style={styles.header}>
                            {props.title}
                        </Text>
                        <Text style={styles.text}>
                        {props.text}
                        </Text>
                    </View>

                    <LottieView
                        source={ErrorDogAnimation}
                        autoPlay
                        loop={true}
                        style={styles.gif}
                    />

                    <View style={styles.footer}>

                        {props.type === 'confirm' &&
                            <Button
                                title='Cancelar'
                                transparent={false}
                                onPress={closeModal}
                                flex
                            />
                        }
                        <Button
                            title='Confirmar'
                            transparent={false}
                            onPress={closeModal}
                            flex
                        />
                    </View>
                </View>
            </View>
        </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  content: {
    padding: 10,
    minHeight: 400,
    maxHeight: '80%',
    width: Dimensions.get('window').width - 80,
    backgroundColor: colors.white,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  gif: {
    margin: 10,
    height: Dimensions.get('window').width * 0.7
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  textView: {
    alignItems: 'center',
    paddingHorizontal: 10
  },
  header: {
    margin: 5,
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.heading,
    textAlign: 'center'
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.black,
    textAlign: 'center'
  }
})

export default forwardRef(CustomAlert)
