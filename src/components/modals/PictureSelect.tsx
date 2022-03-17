import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { Modalize } from 'react-native-modalize'
import Button from '../buttons/Button'
import HeaderModal from '../HeaderModal'

export interface PictureSelectHandles {
  openModal: ()=>void
}

interface PictureSelectProps {
  title: string,
  getPicture: (picture: string)=>void
}

const PictureSelect:React.ForwardRefRenderFunction<PictureSelectHandles, PictureSelectProps> = ({ title, getPicture }, ref) => {
  const modalizeRef = useRef<Modalize>(null)
  const [image, setImage] = useState<string>()
  const [status, request] = ImagePicker.useCameraPermissions()

  function openModal () {
    modalizeRef.current?.open()
  }

  function closeModal () {
    modalizeRef.current?.close()
    if (image) {
      getPicture(image)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      openModal
    }
  })

  async function takePicture () {
    if (!status || status.status !== ImagePicker.PermissionStatus.GRANTED) {
      request()
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }

    closeModal()
  }

  async function openGalery () {
    if (!status || status.status !== ImagePicker.PermissionStatus.GRANTED) {
      request()
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }

    closeModal()
  }

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={Dimensions.get('window').height * 0.45}
      modalStyle={styles.container}
      HeaderComponent={
      <HeaderModal
        title={title}
        onPress={closeModal}
      />}
    >
      <View style={styles.content}>
        <View style={styles.buttons}>
          <Button
            title='Câmera'
            transparent={false}
            onPress={takePicture}
          />
          <Button
            title='Galeria'
            transparent={false}
            onPress={openGalery}
          />
          <Button
            title='Cancelar'
            transparent={true}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modalize>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    width: Dimensions.get('window').width * 0.8
  }
})

export default forwardRef(PictureSelect)
