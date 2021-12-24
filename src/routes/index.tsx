import React from 'react'

import AppLoading from 'expo-app-loading'


import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { useAuth } from '../contexts/auth'

const Routes = () => {
    
    const {signed, loading} = useAuth()

    if(loading){
        return <AppLoading />
    }
    return signed ? <AppRoutes /> : <AuthRoutes/>
    
}

export default Routes