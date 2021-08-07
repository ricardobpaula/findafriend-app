import React, { useEffect, useRef } from 'react'
import { 
    KeyboardAvoidingView, 
    SafeAreaView, 
    View,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Text,
    Animated

} from 'react-native'

import { useForm } from 'react-hook-form'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '../../contexts/auth'

import styles from './styles'

import Button from '../../components/Button'
import {InputPassword} from '../../components/InputPassword'
import {Input} from '../../components/Input'

import icon from '../../assets/icon.png'

export function Login() {
    
    const {login} = useAuth()
    
    const fieldValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('E-mail é obrigatorio')
            .email('E-mail invalido'),
        password: yup
            .string()
            .required('Senha é obrigatoria')
    })
    
    const { register, setValue, handleSubmit,formState:{errors} } = useForm({
        resolver: yupResolver(fieldValidationSchema)
    })

    const width = Dimensions.get('window').width
    const keyBoardOpen = useRef(new Animated.Value(width * 0.5)).current

    // adding listeners keyboard
    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',keyboardDidShow)
        Keyboard.addListener('keyboardDidHide',keyboardDidHide)
    },[])

    // adding registers react-hook-form
    useEffect(()=>{
        register('email')
        register('password')
    },[register])

    function keyboardDidShow(){
        Animated.timing(keyBoardOpen,{
            toValue: width * 0.2,
            duration: 200,
            useNativeDriver:false
        }).start()
    }

    function keyboardDidHide(){
        Animated.timing(keyBoardOpen,{
            toValue: width * 0.5,
            duration: 200,
            useNativeDriver:false
        }).start()
    }

    async function onSubmit(data: any){
        await login(data)
    }

    function handleForgotPassword(){

    }

    return (
        <SafeAreaView style={styles.container}>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}
                >   
                    <View style={styles.header}>
                        <Text style={styles.title}> Bem vindo de volta</Text>
                    </View>
                    <View  style={styles.body}>
                        <KeyboardAvoidingView
                            style={styles.body}
                            behavior='padding'
                        >
                            <Animated.Image
                                source={icon}
                                style={{
                                    height: keyBoardOpen,
                                    marginBottom: 10
                                }}
                                resizeMode='contain'

                            />
                            <Input 
                                placeholder='E-mail'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                onChangeText={text=>setValue('email',text)}
                                error={errors?.email}
                            />

                            <InputPassword 
                                placeholder='Senha'
                                onChangeText={text=>setValue('password',text)}
                                error={errors?.password}
                            />

                            <TouchableOpacity
                                style={styles.forgotPassword}
                                onPress={handleForgotPassword}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.text}>Esqueci minha senha</Text>
                            
                            </TouchableOpacity>
                            
                        </KeyboardAvoidingView>
                    </View>
                    <View style={styles.footer}>
                        <Button 
                            title='Confirmar'
                            transparent={false}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>

                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}