import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile/EditProfile'
import FormPet from '../pages/FormPet/FormPet'

import CustomHeader from '../components/CustomHeader'

const Stack = createStackNavigator()

export type AuthStackParamsList = {
  Profile: undefined,
  EditProfile: undefined,
  FormPet: undefined
}
const ProfileRoutes:React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={CustomHeader}
    >
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{ title: 'Editar Perfil' }}
      />
      <Stack.Screen
        name='FormPet'
        component={FormPet}
        options={{ title: 'Pet' }}
      />
    </Stack.Navigator>
  )
}

export default ProfileRoutes
