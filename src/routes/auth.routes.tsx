import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'
import Welcome from '../pages/Welcome'
import SignUp from '../pages/SignUp'
import { Login } from '../pages/Login'
import CustomHeader from '../components/CustomHeader'

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator
            headerMode='screen'
            screenOptions={{
                cardStyle:{
                    backgroundColor: colors.white
                },
            }}
        >
            <AuthStack.Screen
                name='Welcome'
                component={Welcome}
                options={{
                    headerShown: false
                }}
            />
            <AuthStack.Screen
                name='SignUp'
                component={SignUp}
                options={CustomHeader()}
            />
            <AuthStack.Screen
                name='Login'
                component={Login}
                options={CustomHeader()}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes

