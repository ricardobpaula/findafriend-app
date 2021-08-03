import React, {useContext} from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Button from '../components/Button'
import { useAuth } from '../contexts/auth'

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    }
})

export default Dashboard