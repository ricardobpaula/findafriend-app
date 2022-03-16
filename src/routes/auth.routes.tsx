import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Welcome from '../pages/Welcome'
import SignUp from '../pages/SignUp'
import { Login } from '../pages/Login'
import CustomHeader from '../components/CustomHeader'

const AuthStack = createStackNavigator()

export type AuthStackParamsList = {
  Welcome: undefined,
  SignUp: undefined,
  Login: undefined
}

const AuthRoutes: React.FC = () => {
  return (
        <AuthStack.Navigator
            screenOptions={CustomHeader}
        >
            <AuthStack.Screen
                name='Welcome'
                component={Welcome}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='SignUp'
                component={SignUp}
                options={{
                  title: 'Criar sua conta'
                }}
            />
            <AuthStack.Screen
                name='Login'
                component={Login}
                options={{
                  title: 'Entrar'
                }}
            />
        </AuthStack.Navigator>
  )
}

export default AuthRoutes
