import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import styles from './styles'
import friends from '../../assets/friends.png'

import Button from '../../components/buttons/Button'

import { AuthStackParamsList } from '../../routes/auth.routes'

type WelcomeScreenProp = StackNavigationProp<AuthStackParamsList, 'Welcome'>

const Welcome:React.FC = () => {
  const navigation = useNavigation<WelcomeScreenProp>()

  function handleSignUp () {
    navigation.navigate('SignUp')
  }

  function handleLogin () {
    navigation.navigate('Login')
  }

  return (
        <View style={styles.container}>
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
                        title='Vamos começar'
                        transparent={false}
                        onPress={() => handleSignUp()}
                    />

                    <TouchableOpacity
                    style={styles.loginButtonContainer}
                    onPress={handleLogin}
                    >
                        <Text style={styles.loginButton}>Já possui uma conta?</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
  )
}

export default Welcome
