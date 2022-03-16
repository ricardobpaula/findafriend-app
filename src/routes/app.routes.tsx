import React from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from '../pages/Dashboard'
import ProfileRoutes from './profile.routes'

const Tab = createBottomTabNavigator()

export type AppStackParamsList = {
  Dashboard: undefined,
  ProfileRoutes: undefined
}

const AppRoutes: React.FC = () => {
  return (
        <Tab.Navigator>
            <Tab.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                  headerShown: false,
                  tabBarIcon: () => <MaterialIcons name='pets' size={20} />,
                  title: 'Pets'
                }}
            />

            <Tab.Screen
                name='ProfileRoutes'
                component={ProfileRoutes}
                options={{
                  headerShown: false,
                  tabBarIcon: () => <MaterialIcons name='person' size={20} />,
                  title: 'Perfil'
                }}
            />
        </Tab.Navigator>
  )
}

export default AppRoutes
