import  React, { createContext, useState, useEffect, useContext, useRef } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import decode from 'jwt-decode'

import api from '../services/api'

import { getAuthStorage, setAuthStorage, setRefreshTokenStorage } from '../utils/auth.storage'

interface AuthProps {
    user: User,
    refreshToken: RefreshToken,
    token: string
}

interface Request {
    email: string,
    password: string
}

interface RefreshTokenResponse {
    refreshToken: RefreshToken,
    token: string
}

interface AuthContextProps {
    signed: boolean,
    user: User | undefined,
    login(request: Request): Promise<void|string>,
    logout(): void,
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC = ({children}) => {
    const [user, setUser] = useState<User|undefined>(undefined)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        async function loadStorage(){
            const storage = await getAuthStorage()
            
            if(!storage || new Date() >= storage.refreshToken.expiresIn){
                setUser(undefined)
                setLoading(false)
                return
            }

            const {user, token, expiresIn, refreshToken} = storage

            if(new Date() >= expiresIn){
                try {
                    const { data } = await api.post<RefreshTokenResponse>('/auth/refresh_token', {
                        refreshToken: refreshToken.id
                    })
                    
                    const { exp } = await decode(data.token) as any
                    
                    const expiresIn = new Date(Number(exp) * 1000)

                    await setAuthStorage({
                        user,
                        refreshToken: data.refreshToken,
                        token: data.token,
                        expiresIn 
                    })
                    
                    setUser(user)
                    api.defaults.headers['x-access-token'] = data.token
                
                }catch (error) {
                    setUser(undefined)
                }

            }else {
                setUser(user)
                api.defaults.headers['x-access-token'] = token
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
            
            const {user, refreshToken, token} = response.data
            const { exp } = decode(token) as any

            setUser(user)
            
            setAuthStorage({
                user,
                token,
                refreshToken,
                expiresIn: new Date(Number(exp) * 1000),
            })
            
            api.defaults.headers['x-access-token'] = token
            
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