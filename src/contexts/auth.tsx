import  React, { createContext, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import signIn from '../services/auth'   
import { useEffect } from 'react'

interface AuthContextProps {
    signed: boolean,
    user: object,
    login(): Promise<void>,
    logout(): void,
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC = ({children}) => {
    const [user, setUser] = useState<Object|undefined>(undefined)
    const [loading, setLoading] = useState(true)
    
    // Get info async storage
    useEffect(()=>{
        async function loadStorage(){
            const response = await AsyncStorage.multiGet([
                '@FindAFriend:token',
                '@FindAFriend:user'
            ])

            if(response[1] && response[1]){
                setUser(JSON.parse(String(response[1])))
            }
        }
        
        loadStorage()
    },[])
     async function login(){
        const response = await signIn()
        
        setUser(response.user)

        await AsyncStorage.multiSet([
            ['@FindAFriend:token',response.token],
            ['@FindAFriend:user',JSON.stringify(response.user)]
        ])

    }

    async function logout(){
        await AsyncStorage.clear()
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user: {}, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext