import React from 'react'
import { 
    Text, 
    SafeAreaView, 
    View, 
    Image, 
    TouchableOpacity 
} from 'react-native'

import { useNavigation } from '@react-navigation/core'

import styles from './styles'

import Button from '../../components/Button'

import friends from '../../assets/friends.png'

const Welcome:React.FC = () => {
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

export default Welcome