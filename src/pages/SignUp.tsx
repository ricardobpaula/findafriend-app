import { 
    useNavigation, 
    useRoute
} from '@react-navigation/native'
import React, { useState } from 'react'
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
import Header from '../components/CustomHeader'

import colors from '../styles/colors'

import fonts from '../styles/fonts'

interface Params {
    type: 'adopter'|'donor'
}

export function SignUp() {
    
    const navigation = useNavigation()
    const routes = useRoute()
    const [isOng, setIsOng] = useState(false)

    const {type} = routes.params as Params
    
    function handleOpenTerm(){
        // Linking.openURL('http://google.com')
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
                                />
                                 <Input 
                                    placeholder='Sobrenome'
                                />
                                <Input 
                                    placeholder='Celular'
                                    textContentType='telephoneNumber'
                                />
                                <Input 
                                    placeholder='E-mail'
                                    autoCapitalize='none'
                                />
                                <InputPassword 
                                    placeholder='Senha'
                                />
                                <InputPassword 
                                    placeholder='Confirmação da senha'
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
    },
    content: {
        marginTop: 10,
        flex: 1,
        width: '100%',
    },
    
    title: {
        fontSize: 28,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    body: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10
    },
    checkBoxContainer: {
        width: '100%',
        flexDirection:'row', 
        alignItems: 'center',
    },
    termContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center'
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
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    
})
