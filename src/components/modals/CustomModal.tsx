import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  View,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import colors from '../../styles/colors'

export interface CustomModalHandles {
  open: () => void;
  close: () => void;
}

interface CustomModalProps {
  height?: number
  Header?: React.ReactNode
  children?: React.ReactNode
}

const CustomModal:React.ForwardRefRenderFunction<CustomModalHandles, CustomModalProps> = ({
  height = Dimensions.get('screen').height * 0.2,
  Header,
  children
}, ref) => {
  const [visible, setVisible] = useState(false)
  const [animatedHeight] = useState(new Animated.Value(0))

  function open () {
    setVisible(true)
    onOpenAnimate.start()
  }

  function close () {
    onCloseAnimate.start(() => setVisible(false))
  }

  const onOpenAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: height + 0,
    duration: 250
  })

  const onCloseAnimate = Animated.timing(animatedHeight, {
    useNativeDriver: false,
    toValue: 0,
    duration: 250
  })

  useImperativeHandle(ref, () => {
    return {
      open,
      close
    }
  })

  return (
    <Modal
      animationType='fade'
      visible={visible}
      transparent
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
      <TouchableOpacity
      style={styles.onDismiss}
      onPress={close}/>

        <Animated.View
          style={[styles.container, { height: animatedHeight }]}
        >
          {Header}
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  onDismiss: {
    flex: 1
  },
  container: {
    backgroundColor: colors.white,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  }
})

export default forwardRef(CustomModal)
