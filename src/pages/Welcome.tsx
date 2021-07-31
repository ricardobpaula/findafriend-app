import React from 'react'
import { 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Image, 
    Dimensions, 
    TouchableOpacity 
} from 'react-native'

import { useNavigation } from '@react-navigation/core'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import Button from '../components/Button'

import friends from '../assets/friends.png'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export function Welcome(){
    const navigation = useNavigation()

    function handleSignUp(type:'adopter'|'donor'){
        navigation.navigate('SignUp', {type})
    }

    function handleLogin(){
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>

                <Text style={styles.title}>
                    Encontre aqui o seu melhor amigo
                </Text>

                <Image 
                    source={friends}
                    style={styles.image}
                    resizeMode='contain'
                />

                <View style={styles.footer}>

                    <Button 
                        title='Quero Adotar'
                        transparent={false}
                        onPress={()=>handleSignUp('adopter')}
                    ></Button>
                    <Button
                        title='Quero Doar'
                        transparent={true}
                        onPress={()=>handleSignUp('donor')}
                    ></Button>

                    <TouchableOpacity 
                    style={styles.ongButtonContainer}
                    onPress={handleLogin}
                    >
                        <Text style={styles.ongButton}>Já possui uma conta?</Text>
                    </TouchableOpacity>

                </View>                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title:{
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: getStatusBarHeight(),
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    footer:{
        width: '100%',
        paddingHorizontal: 40,
    },
    ongButtonContainer: {
        alignItems: 'center',
        marginTop: 10
       
    },
    ongButton: {
        textDecorationLine: 'underline',
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 16
    }
    
})