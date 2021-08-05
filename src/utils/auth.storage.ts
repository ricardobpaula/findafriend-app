import AsyncStorage from "@react-native-async-storage/async-storage"

interface AuthStorageProps{
    user: User,
    token: string
}

export async function getAuthStorage():Promise<AuthStorageProps|undefined> {
    const response = await AsyncStorage.multiGet([
        '@FindAFriend:token',
        '@FindAFriend:user'
    ])

    if(!response){
        return undefined
    }
    const storaged = {
        user: JSON.parse(String(response[1][1])),
        token: String(response[0][1])
    }

    return storaged
    
}

export async function setAuthStorage(auth: AuthStorageProps):Promise<void> {
    await AsyncStorage.multiSet([
        ['@FindAFriend:token',auth.token],
        ['@FindAFriend:user',JSON.stringify(auth.user)]
    ])
}