import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import TabRoutes from './tab.routes'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen 
                name='TabRoutes'
                component={TabRoutes}
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
    )
}

export default AppRoutes