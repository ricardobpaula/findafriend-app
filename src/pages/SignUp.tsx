import { 
    useNavigation, 
    useRoute
} from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { 
    KeyboardAvoidingView, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native'

import { CheckBox } from 'react-native-elements'

import Button from '../components/Button'
import InputPassword from '../components/InputPassword'
import Input from '../components/Input'

import colors from '../styles/colors'

import fonts from '../styles/fonts'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

interface Params {
    type: 'adopter'|'donor'
}

export function SignUp() {
    
    const navigation = useNavigation()
    
    const routes = useRoute()
    const [isOng, setIsOng] = useState(false)

    const fieldValidationSchema = yup.object().shape({
        firstName: yup
            .string()
            .required('Nome é obrigatorio'),
        lastName: yup
            .string()
            .required('Sobrenome é obrigatorio'),
        phone: yup
            .number()
            .required('Celular é obrigatorio'),
        email: yup
            .string()
            .required('E-mail é obrigatorio')
            .email('E-mail invalido'),
        password: yup
            .string()
            .required('Senha é obrigatoria')
            .oneOf([yup.ref('confirmPassword'),null],'Senha e confirmação de senha não conferem'),
        confirmPassword: yup
            .string()
            .required('Confirmação de senha é obrigatoria')
            .oneOf([yup.ref('password'),null],'Senha e confirmação de senha não conferem'),
    })

    const { register, setValue, handleSubmit, formState:{errors } } = useForm({
        resolver: yupResolver(fieldValidationSchema)
    })

    const {type} = routes.params as Params
    
    function handleOpenTerm(){
        // Linking.openURL('http://google.com')
    }

    useEffect(()=>{
        register('firstName')
        register('lastName')
        register('phone')
        register('email')
        register('password')
        register('confirmPassword')
    },[register])

    function onSubmit(data: any){

    }

    return (
        <SafeAreaView style={styles.container}>
            
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}
                >
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                    >
                        <View  style={styles.body}>
                            <KeyboardAvoidingView
                                style={styles.body}
                                behavior='padding'
                            >
                                <Input 
                                    placeholder='Nome'
                                    onChangeText={text=>setValue('firstName',text)}
                                    error={errors?.firstName}
                                />
                                 <Input 
                                    placeholder='Sobrenome'
                                    onChangeText={text=>setValue('lastName',text)}
                                    error={errors?.lastName}
                                />
                                <Input 
                                    placeholder='Celular'
                                    keyboardType='phone-pad'
                                    onChangeText={text=>setValue('phone',text)}
                                    error={errors?.phone}
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
                                <InputPassword 
                                    placeholder='Confirmação da senha'
                                    onChangeText={text=>setValue('confirmPassword',text)}
                                    error={errors?.confirmPassword}
                                />
                                
                                <TouchableOpacity style={styles.checkBoxContainer}
                                    onPress={() => setIsOng(!isOng)}
                                    activeOpacity={0.7}
                                >
                                    <CheckBox 
                                        checked={isOng}
                                        onPress={() => setIsOng(!isOng)}
                                        containerStyle={{paddingHorizontal: 0}}
                                        checkedColor={colors.orange_dark}
                                    />
                                    <Text style={styles.text}>Quero receber notificações de denuncias</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.termContainer}
                                    onPress={handleOpenTerm}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.text}>Ao continuar, você concorda com os</Text>
                                    <Text style={styles.link}>Termos e Condições de Uso</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </View>
                    </ScrollView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    content: {
        flex: 1,
        width: '100%',
    },
    body: {
        flex:1 ,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    checkBoxContainer: {
        width: '100%',
        flexDirection:'row', 
        alignItems: 'center',
    },
    termContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.black,
        fontFamily: fonts.text
    },
    link: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.heading,
        fontFamily: fonts.text,
        textDecorationLine: 'underline'
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    
})
