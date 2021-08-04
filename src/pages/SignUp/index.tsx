import React, { useState, useEffect } from 'react'
import { 
    useNavigation, 
    useRoute
} from '@react-navigation/native'
import { 
    KeyboardAvoidingView, 
    SafeAreaView, 
    Text, 
    View,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native'

import { CheckBox } from 'react-native-elements'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import styles from './styles'

import Button from '../../components/Button'
import InputPassword from '../../components/InputPassword'
import Input from '../../components/Input'

import colors from '../../styles/colors'

interface Params {
    type: 'adopter'|'donor'
}

const SignUp:React.FC = () => {
    
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

export default SignUp