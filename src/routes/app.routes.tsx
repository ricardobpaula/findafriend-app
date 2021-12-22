import React from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'

const Tab = createBottomTabNavigator()

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
                name='Profile'
                component={Profile}
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