import React from 'react'

import { MaterialIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from '../pages/Dashboard'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import Profile from '../pages/Profile'
// import Test from '../pages/Test/Test'

const Tab = createBottomTabNavigator()

export type AppStackParamsList = {
  Dashboard: undefined,
  Profile: undefined
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
              name='Profile'
              component={Profile}
              options={{
                headerShown: false,
                tabBarIcon: () => <MaterialIcons name='person' size={20} />,
                title: 'Perfil'
              }}
            />
            {/*
            <Tab.Screen
                name='Test'
                component={Test}
                options={{
                  headerShown: false,
                  tabBarIcon: () => <MaterialIcons name='code' size={20} />,
                  title: 'Teste'
                }}
            />
            */}
        </Tab.Navigator>
  )
}

export default AppRoutes
