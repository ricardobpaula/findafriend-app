import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'
import Welcome from '../pages/Welcome'
import SignUp from '../pages/SignUp'
import { Login } from '../pages/Login'

const AuthStack = createStackNavigator()

export type AuthStackParamsList = {
  Welcome: undefined,
  SignUp: undefined,
  Login: undefined
}

const AuthRoutes: React.FC = () => {
  return (
        <AuthStack.Navigator
            screenOptions={{
              cardStyle: {
                backgroundColor: colors.white
              },
              headerMode: 'screen'
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
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
  )
}

export default AuthRoutes
