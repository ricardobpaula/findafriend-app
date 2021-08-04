import React from 'react'

import {
    View,
    Text,
} from 'react-native'

import styles from './styles'

import Button from '../../components/Button'

import { useAuth } from '../../contexts/auth'

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
        </View>
    )

}

export default Dashboard