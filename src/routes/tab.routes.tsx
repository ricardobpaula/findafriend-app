import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import colors from '../styles/colors'
import Explorer from '../pages/Explorer'
import { Feather } from '@expo/vector-icons'
import Messenger from '../pages/Messenger'

const AppTab = createBottomTabNavigator()

const TabRoutes = () => {
    return (
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: colors.orange_light,
                tabBarInactiveBackgroundColor: colors.heading,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingVertical: 20,
                    height: 88
                }
            }}
        >
            <AppTab.Screen 
                name='Explorer'            
                component={Explorer}
                options={{
                    tabBarIcon:(({size,color})=>(
                        <Feather 
                            name='home'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTab.Screen 
                name='Messenger'            
                component={Messenger}
                options={{
                    tabBarIcon:(({size,color})=>(
                        <Feather 
                            name='message-circle'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

        </AppTab.Navigator>
    )
}

export default TabRoutes