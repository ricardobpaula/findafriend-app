import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'

import {
  Dimensions,
  View,
  StyleSheet,
  Platform
} from 'react-native'

import { Modalize } from 'react-native-modalize'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import HeaderModal from '../HeaderModal'
import InputLabel from '../inputs/InputLabel'
import api from '../../services/api'

export interface EditProfileHandles {
  openModal: ()=>void;
}

interface EditProfileProps {
  profile: User;
  handleUpdate: (changed: boolean)=> void;
}

interface Form {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

const SpecieFilter:React.ForwardRefRenderFunction<EditProfileHandles, EditProfileProps> = ({ profile, handleUpdate }, ref) => {
  const modalizeRef = useRef<Modalize>(null)

  function openModal () {
    modalizeRef.current?.open()
  }

  function closeModal (changed: boolean = false) {
    handleUpdate(changed)
    setDefaultValues()
    modalizeRef.current?.close()
  }

  const fieldValidationSchema = yup.object().shape({
    firstName: yup
      .string(),
    lastName: yup
      .string(),
    phone: yup
      .string()
      .min(11)
      .max(11),
    email: yup
      .string()
      .email('E-mail invalido')
  })

  const { register, handleSubmit, control, reset, setValue, formState: { isDirty } } = useForm({
    resolver: yupResolver(fieldValidationSchema) /*,
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      phone: profile?.phone,
      email: profile?.email
    } */

  })

  useImperativeHandle(ref, () => {
    return {
      openModal
    }
  })

  async function onSubmit (user: Form) {
    try {
      const { status } = await api.put('/users', user)

      if (status !== 200) {
        return
      }

      closeModal(true)
    } catch (e) {
      console.log(e)
    }
  }

  function setDefaultValues () {
    reset()
    setValue('firstName', profile.firstName)
    setValue('lastName', profile.lastName)
    setValue('email', profile.email)
    setValue('phone', profile.phone)
  }
  useEffect(() => {
    setDefaultValues()
  }, [profile])

  useEffect(() => {
    register('firstName')
    register('lastName')
    register('phone')
    register('email')
  }, [register])

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={Dimensions.get('window').height * 0.6}
      modalStyle={styles.container}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardAvoidingOffset={Platform.OS === 'ios' ? 64 : 0}
      HeaderComponent={
      <HeaderModal
        title='Editar Perfil'
        showSaveButton={isDirty}
        onSave={handleSubmit(onSubmit)}
        onClose={() => closeModal()}
      />}
    >
      <View style={styles.content}>
        <Controller
          control={control}
          name='firstName'
          render={({ field: { value, onChange } }) =>
            <InputLabel
              title='Nome'
              value={value}
              onChangeText={onChange}
            />
        }/>
        <Controller
          control={control}
          name='lastName'
          render={({ field: { value, onChange } }) =>
            <InputLabel
              title='Sobrenome'
              value={value}
              onChangeText={onChange}
            />
        }/>
        <Controller
          control={control}
          name='phone'
          render={({ field: { value, onChange } }) =>
            <InputLabel
              title='Celular'
              value={value}
              onChangeText={onChange}
            />
        }/>
        <Controller
          control={control}
          name='email'
          render={({ field: { value, onChange } }) =>
            <InputLabel
              title='E-mail'
              value={value}
              onChangeText={onChange}
            />
        }/>
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
    alignItems: 'center'
  }
})

export default forwardRef(SpecieFilter)
