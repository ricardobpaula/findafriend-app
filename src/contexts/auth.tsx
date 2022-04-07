import React, { createContext, useState, useEffect, useContext } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import decode from 'jwt-decode'

import api from '../services/api'

import { getAuthStorage, setAuthStorage } from '../utils/storage'

interface AuthProps {
    user: User,
    avatar: Photo,
    refreshToken: RefreshToken,
    token: string
}

interface MeProps {
  user: User,
  avatar: Photo
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
    login(request: Request): Promise<void|string>,
    logout(): void,
    me(): Promise<MeProps>,
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider:React.FC = ({ children }) => {
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorage () {
      const storage = await getAuthStorage()

      if (!storage || new Date() >= storage.refreshToken.expiresIn) {
        setSigned(true)
        setLoading(false)
        return
      }

      const { token, expiresIn, refreshToken } = storage

      if (new Date() >= expiresIn) {
        try {
          const { data } = await api.post<RefreshTokenResponse>('/auth/refresh_token', {
            refreshToken: refreshToken.id
          })

          const { exp } = await decode(data.token) as any

          const expiresIn = new Date(Number(exp) * 1000)

          await setAuthStorage({
            refreshToken: data.refreshToken,
            token: data.token,
            expiresIn
          })

          setSigned(true)
          api.defaults.headers['x-access-token'] = data.token
        } catch (error) {
          setSigned(false)
        }
      } else {
        setSigned(true)
        api.defaults.headers['x-access-token'] = token
      }
      setLoading(false)
    }
    loadStorage()
  }, [])

  async function login (request:Request) {
    try {
      const response = await api.post<AuthProps>('/auth/login', {
        email: request.email,
        password: request.password
      })

      const { refreshToken, token } = response.data
      const { exp } = decode(token) as any

      setSigned(true)
      setAuthStorage({
        token,
        refreshToken,
        expiresIn: new Date(Number(exp) * 1000)
      })

      api.defaults.headers['x-access-token'] = token

      setLoading(false)
    } catch (error: any) {
      if (!error.response) {
        return 'Nos desculpe, não foi possivel conectar aos nossos servidores.'
      }

      const response = error.response

      let message
      switch (response.status) {
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
  async function me ():Promise<MeProps> {
    const { data } = await api.get<AuthProps>('/users/me')

    const { user, avatar } = data

    const photo = {
      id: avatar.id,
      path: avatar.path
    }

    return {
      user,
      avatar: photo
    }
  }

  async function logout () {
    await AsyncStorage.clear()
    api.defaults.headers['x-access-token'] = undefined
    setSigned(false)
  }

  return (
        <AuthContext.Provider value={{ signed, login, logout, me, loading }}>
            {children}
        </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)

  return context
}
