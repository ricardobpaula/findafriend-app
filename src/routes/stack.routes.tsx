import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'
import { Welcome } from '../pages/Welcome'
import { SignUp } from '../pages/SignUp'
import { Login } from '../pages/Login'

const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle:{
                backgroundColor: colors.white
            },
        }}
    >
        <StackRoutes.Screen
            name='Welcome'
            component={Welcome}
        />
        <StackRoutes.Screen
            name='SignUp'
            component={SignUp}
        />
        <StackRoutes.Screen
            name='Login'
            component={Login}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes