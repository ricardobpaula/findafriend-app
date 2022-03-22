import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStorageProps{
    user: User,
    token: string,
    expiresIn: Date,
    refreshToken: RefreshToken,
    avatar: Photo
}

interface RefreshTokenProps {
    token: string,
    refreshToken: RefreshToken,
    expiresIn: Date
}

export async function getAuthStorage ():Promise<AuthStorageProps|undefined> {
  const response = await AsyncStorage.multiGet([
    '@FindAFriend:token',
    '@FindAFriend:user',
    '@FindAFriend:refreshToken',
    '@FindAFriend:expiresIn',
    '@FindAFriend:avatar'
  ])

  if (!response[0][1] && !response[1][1] && !response[2][1] && !response[3][1] && !response[4][1]) {
    return undefined
  }

  const refreshToken = JSON.parse(String(response[2][1]))

  const storaged = {
    token: String(response[0][1]),
    user: JSON.parse(String(response[1][1])),
    refreshToken: {
      expiresIn: new Date(refreshToken.expiresIn),
      id: String(refreshToken.id)
    },
    expiresIn: new Date(JSON.parse(String(response[3][1]))),
    avatar: JSON.parse(String(response[4][1]))
  }
  return storaged
}

export async function setAuthStorage ({ user, token, refreshToken, expiresIn, avatar }: AuthStorageProps):Promise<void> {
  await AsyncStorage.multiSet([
    ['@FindAFriend:token', String(token)],
    ['@FindAFriend:user', JSON.stringify(user)],
    ['@FindAFriend:refreshToken', JSON.stringify(refreshToken)],
    ['@FindAFriend:expiresIn', JSON.stringify(expiresIn)],
    ['@FindAFriend:avatar', JSON.stringify(avatar)]
  ])

  console.log(avatar)
}

export async function setRefreshTokenStorage ({ token, refreshToken, expiresIn }: RefreshTokenProps): Promise<void> {
  await AsyncStorage.multiMerge([
    ['@FindAFriend:token', String(token)],
    ['@FindAFriend:refreshToken', JSON.stringify(refreshToken)],
    ['@FindAFriend:expiresIn', JSON.stringify(expiresIn)]
  ])
}

export async function updataAvatarStorage (avatar:Photo): Promise<void> {
  await AsyncStorage.mergeItem('@FindAFriend:avatar', JSON.stringify(avatar))
}
