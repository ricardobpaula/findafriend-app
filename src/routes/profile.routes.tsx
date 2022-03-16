import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile/EditProfile'
import FormPet from '../pages/FormPet/FormPet'

const Stack = createStackNavigator()

export type AuthStackParamsList = {
  Profile: undefined,
  EditProfile: undefined,
  FormPet: undefined
}
const ProfileRoutes:React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='Profile'
        component={Profile}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
      />
      <Stack.Screen
        name='FormPet'
        component={FormPet}
      />
    </Stack.Navigator>
  )
}

export default ProfileRoutes
