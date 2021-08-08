import React, { useState, useRef, useCallback } from 'react'

import {
    View,
    Text,
} from 'react-native'

import styles from './styles'

import Button from '../../components/Button'

import { useAuth } from '../../contexts/auth'

import CustomAlert, { AlertHandles } from '../../components/CustomAlert'

const Dashboard:React.FC = () => {
    const { logout } = useAuth()
    const modalRef = useRef<AlertHandles>(null)
    
    const handleLogout = useCallback(() => {
        logout()
    },[])

    const handleOpenModal = useCallback(()=>{
        modalRef.current?.openModal()
    },[])

    return (
        <View style={styles.container}>
            <Text>
                Dashboard
            </Text>
            <Button title='Logout' transparent={true} onPress={handleLogout}/>
            <Button title='Open Modal' transparent={false} onPress={handleOpenModal}/>
            <CustomAlert
            ref={modalRef}
            />

        </View>
    )

}

export default Dashboard