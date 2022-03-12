import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile/EditProfile'

const Stack = createStackNavigator()

const ProfileRoutes:React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ProfileRoutes
