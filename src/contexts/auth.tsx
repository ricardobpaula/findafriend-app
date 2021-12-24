import  React, { createContext, useState, useEffect, useContext, useRef } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'
import { getAuthStorage, setAuthStorage } from '../utils/auth.storage'

interface AuthProps {
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
    login(request: Request): Promise<void|string>,
    logout(): void,
    signIn(auth:AuthProps): Promise<void>,
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC = ({children}) => {
    const [user, setUser] = useState<User|undefined>(undefined)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        async function loadStorage(){
            const response = await getAuthStorage()

            if(response){
                setUser(response.user)
                api.defaults.headers['x-access-token'] = response.token
            }
            setLoading(false)
        }
        loadStorage()
    },[])

     async function login(request:Request ){
        try {
            const response = await api.post<AuthProps>('/auth/login',{
                email: request.email,
                password: request.password
            })
            const data = response.data
            setUser(data.user)
            setAuthStorage(data)
            
            api.defaults.headers['x-access-token'] = data.token
            
            setLoading(false)
        }catch(error: any){
            if (!error.response){
                return 'Nos desculpe, não foi possivel conectar aos nossos servidores.'
            }

            const response = error.response

            let message
            switch (response.status){
                case 400:
                    message = 'E-mail/Senha estão incorretos.'
                    break
                case 500:
                    message = 'Nos desculpe, não foi possivel conectar aos nossos servidores.'
                    break
                default:
                    message = 'Oops, algo de errado não está certo.'
                    break
            }
            return message
        }
    }

    async function logout(){
        await AsyncStorage.clear()
        api.defaults.headers['x-access-token'] = undefined
        setUser(undefined)
    }

    async function signIn(data:AuthProps){
        
        setUser(data.user)

        setAuthStorage(data)

        api.defaults.headers['Authorization'] = `Bearer ${data.token}`

    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, login, logout,signIn, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)

    return context
}