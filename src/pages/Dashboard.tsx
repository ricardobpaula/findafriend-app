import React, {useContext} from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Button from '../components/Button'
import AuthContext from '../contexts/auth'

const Dashboard:React.FC = () => {
    const { logout } = useContext(AuthContext)
    
    function handleLogout(){
        
        logout()
    }
    return (
        <View style={styles.container}>
            <Text>
                Dashboard

            <Button title='Logout' transparent={true} onPress={handleLogout}/>
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
    }
})

export default Dashboard