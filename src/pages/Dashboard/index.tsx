import React, { useState } from 'react'

import {
    View,
    Text,
    Modal,
    Alert,
} from 'react-native'

import styles from './styles'

import Button from '../../components/Button'

import { useAuth } from '../../contexts/auth'

import CustomAlert from '../../components/CustomAlert'

const Dashboard:React.FC = () => {
    const { logout } = useAuth()
    
    function handleLogout(){
        
        logout()
    }

    return (
        <View style={styles.container}>
            <Text>
                Dashboard
            </Text>
            <Button title='Logout' transparent={true} onPress={handleLogout}/>
            <Button title='Open Modal' transparent={false} onPress={()=>{}}/>
            <CustomAlert
                title='Erro'
                message="E-mail/Senha estão incorretos."
                type="confirm"
            />

        </View>
    )

}

export default Dashboard