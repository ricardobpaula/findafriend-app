import React from 'react'

import {
    View,
    Text,
    Modal,
} from 'react-native'

import styles from './styles'

import Button from '../../components/Button'

import { useAuth } from '../../contexts/auth'
import { useState } from 'react'
import Error from '../../components/Error'

const Dashboard:React.FC = () => {
    const [hasError, setHasError] = useState(false)
    const { logout } = useAuth()
    
    function handleLogout(){
        
        logout()
    }

    function handleModal(){
        setHasError(!hasError)
    }
    return (
        <View style={styles.container}>
            <Text>
                Dashboard
            </Text>
            <Button title='Logout' transparent={true} onPress={handleLogout}/>
            <Button title='Open Modal' transparent={false} onPress={handleModal}/>
            <Modal
                transparent={true}
                animationType='fade'
                visible={hasError}
                onRequestClose={handleModal}
            >
                <Error
                    title='Teste'
                    message='Teste 123'
                />
            </Modal>

        </View>
    )

}

export default Dashboard