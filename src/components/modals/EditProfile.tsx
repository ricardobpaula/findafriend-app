import React, { useImperativeHandle, useState, forwardRef, useEffect } from 'react'

import {
  Modal,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import colors from '../../styles/colors'

import Button from '../buttons/Button'

export interface Handles {
  openModal: ()=>void
}

interface Props {
  profile: User
}

const SpecieFilter:React.ForwardRefRenderFunction<Handles, Props> = ({ profile }, ref) => {
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

  useEffect(() => {
  }, [])

  return (
    <Modal
      visible={visible}
      animationType='slide'
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Button
            title='close modal'
            transparent={false}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})

export default forwardRef(SpecieFilter)
