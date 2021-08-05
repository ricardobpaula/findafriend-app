import  React, { createContext, useState, useEffect, useContext } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'
import { getAuthStorage, setAuthStorage } from '../utils/auth.storage'

interface Response {
    user: User,
    token: string
}

interface Request {
    email: string,
    password: string
}

interface AuthContextProps {
    signed: boolean,
    user: User | undefined,
    login(request: Request): Promise<void>,
    logout(): void,
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC = ({children}) => {
    const [user, setUser] = useState<User|undefined>(undefined)
    const [loading, setLoading] = useState(true)
    
    // Get info async storage
    useEffect(()=>{
        async function loadStorage(){
            const response = await getAuthStorage()

            if(response){
                setUser(response.user)
                api.defaults.headers['Authorization'] = `Bearer ${response.token}`
            }
            setLoading(false)
        }
        loadStorage()
    },[])

     async function login(request:Request ){
        
        try {
            const {data} = await api.post<Response>('login',{
                email: request.email,
                password: request.password
            })
            setUser(data.user)

            setAuthStorage(data)

            api.defaults.headers['Authorization'] = `Bearer ${data.token}`

            setLoading(false)
        }catch(e){
            // TODO tratar erros 401 e 500 com modal
        }
    }

    async function logout(){
        await AsyncStorage.clear()
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)

    return context
}