import React, { useEffect, useRef, useState } from 'react'
import { 
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
import InputPassword from '../../components/InputPassword'
import Input from '../../components/Input'

import CustomAlert, { AlertHandles } from '../../components/CustomAlert'

export function Login() {
    
    const {login} = useAuth()

    const [error,setError] = useState<string>()

    const modalRef = useRef<AlertHandles>(null)
    
    const fieldValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('E-mail é obrigatorio')
            .email('E-mail invalido'),
        password: yup
            .string()
            .min(6)
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
            duration: 500,
            useNativeDriver:false
        }).start()
    }

    function keyboardDidHide(){
        Animated.timing(keyBoardOpen,{
            toValue: width * 0.5,
            duration: 500,
            useNativeDriver:false
        }).start()
    }

    async function onSubmit(data: any){
        const response = await login(data)
        if (response){
            setError(response)
            modalRef.current?.openModal()
        }

    }

    function handleForgotPassword(){

    }

    return (
        <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback 
                    onPress={Keyboard.dismiss}
                    style={styles.container}
                >
                    <View style={styles.content}
                    >
                        <View style={styles.header}>
                            <Text style={styles.title}>Hey,</Text>
                            <Text style={styles.subTitle}>Aproveite agora!</Text>
                        </View>
                        <View style={styles.body}>
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
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity 
                                style={styles.forgotPassword}
                                onPress={handleForgotPassword}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.text}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                            <Button 
                                title='Entrar'
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
        </SafeAreaView>
    )
}