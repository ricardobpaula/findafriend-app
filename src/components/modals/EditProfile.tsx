import React, { useImperativeHandle, forwardRef, useEffect, useRef } from 'react'

import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native'

import { Modalize } from 'react-native-modalize'
import HeaderModal from '../HeaderModal'
import Label from '../Label'

export interface Handles {
  openModal: ()=>void
}

interface Props {
  profile: User
}

const SpecieFilter:React.ForwardRefRenderFunction<Handles, Props> = ({ profile }, ref) => {
  const modalizeRef = useRef<Modalize>(null)

  function openModal () {
    modalizeRef.current?.open()
  }

  function closeModal () {
    modalizeRef.current?.close()
  }

  useImperativeHandle(ref, () => {
    return {
      openModal
    }
  })

  useEffect(() => {

  }, [])

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={Dimensions.get('window').height * 0.7}
      modalStyle={styles.container}
      HeaderComponent={
      <HeaderModal
        title='Editar Perfil'
        onPress={closeModal}
      />}
    >
      <View style={styles.content}>
        <Label
          title='Nome'
          text={profile.firstName}
        />
        <Label
          title='Sobrenome'
          text={profile.lastName}
        />
        <Label
          title='Celular'
          text={profile.phone}
        />
        <Label
          title='E-mail'
          text={profile.email}
        />
        <Label
          title='Senha'
          text={'*'.repeat(10)}
        />
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
  }
})
export default forwardRef(SpecieFilter)
