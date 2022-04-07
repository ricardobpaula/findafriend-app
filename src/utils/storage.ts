import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStorageProps{
    token: string,
    expiresIn: Date,
    refreshToken: RefreshToken,
}

export async function getAuthStorage ():Promise<AuthStorageProps|undefined> {
  const response = await AsyncStorage.multiGet([
    '@FindAFriend:token',
    '@FindAFriend:refreshToken',
    '@FindAFriend:expiresIn'
  ])

  if (!response[0][1] && !response[1][1] && !response[2][1]) {
    return undefined
  }

  const refreshToken = JSON.parse(String(response[1][1]))

  const storaged = {
    token: String(response[0][1]),
    refreshToken: {
      expiresIn: new Date(refreshToken.expiresIn),
      id: String(refreshToken.id)
    },
    expiresIn: new Date(JSON.parse(String(response[2][1])))
  }
  return storaged
}

export async function setAuthStorage ({ token, refreshToken, expiresIn }: AuthStorageProps):Promise<void> {
  await AsyncStorage.multiSet([
    ['@FindAFriend:token', String(token)],
    ['@FindAFriend:refreshToken', JSON.stringify(refreshToken)],
    ['@FindAFriend:expiresIn', JSON.stringify(expiresIn)]
  ])
}
