import React, {useContext} from 'react'

import AppLoading from 'expo-app-loading'

import AuthContext from '../contexts/auth'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes = () => {
    
    const {signed, loading} = useContext(AuthContext)

    if(loading){
        return <AppLoading />
    }
    return signed ? <AppRoutes /> : <AuthRoutes/>
    
}

export default Routes