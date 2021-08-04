import  React, { createContext, useState, useEffect, useContext } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'

interface User {
        id: string,
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        isFinding: boolean,
        isOng: boolean,
        avatar?: string
}

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
            const response = await AsyncStorage.multiGet([
                '@FindAFriend:token',
                '@FindAFriend:user'
            ])

            const storagedToken = response[0][1]
            const storagedUser = response[1][1]

            if(storagedUser && storagedToken){
                setUser(JSON.parse(String(storagedUser)))
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
            }
            setLoading(false)
        }
        loadStorage()
    },[])

     async function login(request:Request ){
        
        const {data} = await api.post<Response>('login',{
            email: request.email,
            password: request.password
        })

        setUser(data.user)

        await AsyncStorage.multiSet([
            ['@FindAFriend:token',data.token],
            ['@FindAFriend:user',JSON.stringify(data.user)]
        ])

        api.defaults.headers['Authorization'] = `Bearer ${data.token}`

        setLoading(false)

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