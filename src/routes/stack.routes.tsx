import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'
import { Welcome } from '../pages/Welcome'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'
import CustomHeader from '../components/CustomHeader'

const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode='screen'
        screenOptions={{
            cardStyle:{
                backgroundColor: colors.white
            },
        }}
    >
        <StackRoutes.Screen
            name='Welcome'
            component={Welcome}
            options={{
                headerShown: false
            }}
        />
        <StackRoutes.Screen
            name='SignUp'
            component={SignUp}
            options={CustomHeader('Vamos começar')}
        />
        <StackRoutes.Screen
            name='Login'
            component={Login}
            options={CustomHeader('Login')}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes

