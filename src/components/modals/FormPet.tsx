import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import { Modalize } from 'react-native-modalize'
import HeaderModal from '../HeaderModal'
import Label from '../Label'

export interface FormPetHandles {
  openModal: (pet?: Pet)=>void
}

const FormPet:React.ForwardRefRenderFunction<FormPetHandles> = (props, ref) => {
  const modalizeRef = useRef<Modalize>(null)
  const [pet, setPet] = useState<Pet>()

  function openModal (pet?: Pet) {
    modalizeRef.current?.open()
    setPet(pet)
  }

  function closeModal () {
    modalizeRef.current?.close()
  }

  useImperativeHandle(ref, () => {
    return {
      openModal
    }
  })

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={Dimensions.get('window').height * 0.5}
      modalStyle={styles.container}
      HeaderComponent={
      <HeaderModal
        title={pet ? 'Editar Pet' : 'Novo Pet'}
        onPress={closeModal}
      />}
    >
      <View style={styles.content}>
        <Label
          title='Descrição'
          text={
            pet
              ? pet.description
              : 'Insira uma descrição sobre o pet'
            }
        />
        <Label
          title='Especie'
          text={
            pet
              ? pet.description
              : 'Insira a Especie do pet'
            }
        />
        <Label
          title='Porte'
          text={
            pet
              ? pet.description
              : 'Insira o porte do pet'
            }
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

export default forwardRef(FormPet)
