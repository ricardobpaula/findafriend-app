import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import * as yup from 'yup'

import { Modalize } from 'react-native-modalize'
import HeaderModal from '../HeaderModal'
import Label from '../Label'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputLargeText, { InputLargeTextHandles } from '../inputs/InputLargeText'
import InputSpecie, { InputSpecieHandles } from '../inputs/InputSpecie'

export interface FormPetHandles {
  openModal: (pet?: Pet)=>void
}

interface PetForm {
  description?: string;
  specie?: string;
  size?: string
}

const FormPet:React.ForwardRefRenderFunction<FormPetHandles> = (props, ref) => {
  const modalizeRef = useRef<Modalize>(null)
  const exampleRef = useRef<Modalize>(null)
  const inputDescriptionRef = useRef<InputLargeTextHandles>(null)
  const inputSpecieRef = useRef<InputSpecieHandles>(null)
  const [pet, setPet] = useState<Pet>()

  const fieldValidationSchema = yup.object().shape({
    description: yup
      .string()
      .required(),
    specie: yup
      .string()
      .required(),
    size: yup
      .string()
      .required()
  })

  const { register, handleSubmit, control, reset, setValue, formState, formState: { isDirty } } = useForm({
    resolver: yupResolver(fieldValidationSchema)
  })

  function openModal (pet?: Pet) {
    modalizeRef.current?.open()
    setPet(pet)
    setDefaultValues()
  }

  function closeModal () {
    modalizeRef.current?.close()
  }

  function handleEditDescription () {
    inputDescriptionRef.current?.openModal()
  }

  function handleEditSpecie () {
    inputSpecieRef.current?.openModal()
  }

  async function onSubmit (pet: PetForm) {
    console.log('Description: ', formState)
  }

  function setDefaultValues () {
    reset()
    setValue('description', pet?.description)
    setValue('specie', pet?.specie)
    setValue('size', pet?.size)
  }

  useEffect(() => {
    setDefaultValues()
  }, [pet])

  useEffect(() => {
    register('description')
    register('specie')
    register('size')
  }, [register])

  useImperativeHandle(ref, () => {
    return {
      openModal
    }
  })

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={Dimensions.get('screen').height * 0.8}
      snapPoint={Dimensions.get('screen').height * 0.6}
      modalStyle={styles.container}
      HeaderComponent={
      <HeaderModal
        title={pet ? 'Editar Pet' : 'Novo Pet'}
        onClose={closeModal}
        onSave={handleSubmit(onSubmit)}
        showSaveButton={isDirty}
      />}
    >
      <View style={styles.content}>
        <Controller
          control={control}
          name='description'
          render={({ field: { value, onChange } }) =>
             <>
              <Label
                title='Descrição'
                onPress={handleEditDescription}
                text={value || 'Insira uma descrição sobre o pet'}
              />
            <InputLargeText
              title='Descrição'
              value={value}
              onChangeText={onChange}
              ref={inputDescriptionRef}
            />
          </>
        }
        />
        <Controller
          control={control}
          name='specie'
          render={({ field: { value, onChange } }) =>
             <>
              <Label
                title='Especie'
                onPress={handleEditSpecie}
                text={value || 'Selecione a especie do pet'}
              />
              <InputSpecie
              title='Especie'
              ref={inputSpecieRef}
              />
          </>
        }
        />
        <Controller
          control={control}
          name='size'
          render={({ field: { value, onChange } }) =>
             <>
              <Label
                title='Tamanho'
                onPress={() => exampleRef.current?.open()}
                text={value || 'Selecione o tamanho do pet'}
              />
          </>
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
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default forwardRef(FormPet)
