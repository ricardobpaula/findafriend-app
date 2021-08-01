import React, { useEffect, useState, useRef } from 'react'
import { 
    useNavigation, 
} from '@react-navigation/native'
import { 
    KeyboardAvoidingView, 
    SafeAreaView, 
    StyleSheet, 
    View,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    Animated

} from 'react-native'

import Button from '../components/Button'
import InputPassword from '../components/InputPassword'
import Input from '../components/Input'

import icon from '../assets/icon.png'
import fonts from '../styles/fonts'
import colors from '../styles/colors'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export function Login() {
    
    const navigation = useNavigation()
    const width = Dimensions.get('window').width
    const keyBoardOpen = useRef(new Animated.Value(width * 0.6)).current

    
    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',keyboardDidShow)
        Keyboard.addListener('keyboardDidHide',keyboardDidHide)
    },[])

    function keyboardDidShow(){
        Animated.timing(keyBoardOpen,{
            toValue: width * 0.4,
            duration: 200,
            useNativeDriver:false
        }).start()
    }

    function keyboardDidHide(){
        Animated.timing(keyBoardOpen,{
            toValue: width * 0.6,
            duration: 200,
            useNativeDriver:false
        }).start()
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
                            />

                            <InputPassword 
                                placeholder='Senha'
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
                            onPress={handleForgotPassword}
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
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        width: '100%',
    },
    header: {
        marginBottom: 50,
        paddingTop: 20
    },
    body: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: getStatusBarHeight(),
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    footer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.body_light,
        fontFamily: fonts.text
    }
})
