import React from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from '../pages/Dashboard'
import ProfileRoutes from './profile.routes'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

const Tab = createBottomTabNavigator()

export type AppStackParamsList = {
  Dashboard: undefined,
  ProfileRoutes: undefined
}

const AppRoutes: React.FC = () => {
  return (
        <Tab.Navigator
          screenOptions={ {
            headerTitleAlign: 'center',
            headerTintColor: colors.heading,
            headerTitleStyle: {
              fontFamily: fonts.heading,
              fontSize: 18,
              color: colors.heading
            },
            tabBarActiveTintColor: colors.heading,
            tabBarInactiveTintColor: colors.text_gray,
            tabBarLabelStyle: {
              fontFamily: fonts.heading,
              fontSize: 12
            }
          }
        }
        >
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
