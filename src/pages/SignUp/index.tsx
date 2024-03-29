import React, { useState, useEffect, useRef } from 'react'
import {
} from '@react-navigation/native'
import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity

} from 'react-native'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import api from '../../services/api'

import styles from './styles'

import Button from '../../components/buttons/Button'
import InputPassword from '../../components/inputs/InputPassword'
import Input from '../../components/inputs/Input'
import { useAuth } from '../../contexts/auth'
import CustomAlert, { AlertHandles } from '../../components/modals/CustomAlert'

interface Form {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp:React.FC = () => {
  // const navigation = useNavigation()

  const { login } = useAuth()

  // const routes = useRoute()
  const modalRef = useRef<AlertHandles>(null)
  const [error, setError] = useState<string>()

  const fieldValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('Nome é obrigatorio'),
    lastName: yup
      .string()
      .required('Sobrenome é obrigatorio'),
    phone: yup
      .string()
      .min(11)
      .max(11)
      .required('Celular é obrigatorio'),
    email: yup
      .string()
      .required('E-mail é obrigatorio')
      .email('E-mail invalido'),
    password: yup
      .string()
      .required('Senha é obrigatoria')
      .oneOf([yup.ref('confirmPassword'), null], 'Senha e confirmação de senha não conferem'),
    confirmPassword: yup
      .string()
      .required('Confirmação de senha é obrigatoria')
      .oneOf([yup.ref('password'), null], 'Senha e confirmação de senha não conferem')
  })

  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(fieldValidationSchema)
  })

  function handleOpenTerm () {
    // Linking.openURL('http://google.com')
  }

  useEffect(() => {
    register('firstName')
    register('lastName')
    register('phone')
    register('email')
    register('password')
    register('confirmPassword')
  }, [register])

  async function onSubmit (user: Form) {
    try {
      const request = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        password: user.password
      }
      const response = await api.post('/users', request)

      if (response.status === 201) {
        await login({
          email: user.email,
          password: user.password
        })
      } else {
        setError('Nos desculpe, não foi se conectar com nossos servidores.')
        modalRef.current?.openModal()
      }
    } catch (e: any) {
      if (e?.response?.data?.status === 'error') {
        setError(e.response.data.message)
        modalRef.current?.openModal()
      } else {
        setError('Nos desculpe, não foi se conectar com nossos servidores.')
        modalRef.current?.openModal()
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Hey,</Text>
            <Text style={styles.subTitle}>Vamos criar sua conta?</Text>
          </View>
          <View style={styles.body}>
            <Input
              placeholder='Nome'
              onChangeText={text => setValue('firstName', text)}
              error={errors?.firstName}
            />
            <Input
              placeholder='Sobrenome'
              onChangeText={text => setValue('lastName', text)}
              error={errors?.lastName}
            />
            <Input
              placeholder='Celular'
              keyboardType='phone-pad'
              onChangeText={text => setValue('phone', text)}
              error={errors?.phone}
            />
            <Input
              placeholder='E-mail'
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={text => setValue('email', text)}
              error={errors?.email}
            />
            <InputPassword
              placeholder='Senha'
              onChangeText={text => setValue('password', text)}
              error={errors?.password}
            />
            <InputPassword
              placeholder='Confirmação da senha'
              onChangeText={text => setValue('confirmPassword', text)}
              error={errors?.confirmPassword}
            />
            <TouchableOpacity
              style={styles.termContainer}
              onPress={handleOpenTerm}
              activeOpacity={0.7}
            >
              <Text style={styles.text}>Ao continuar, você concorda com os</Text>
              <Text style={styles.link}>Termos e Condições de Uso</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Button
              title='Cadastrar'
              transparent={false}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <CustomAlert
            ref={modalRef}
            title='Oops! =('
            text={error}
            type='alert'
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default SignUp
