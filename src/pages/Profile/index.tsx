import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'

import { 
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity 
} from 'react-native'
import Button from '../../components/Button'
import CardPet from '../../components/CardPet'

import Load from '../../components/Load'
import api from '../../services/api'
import colors from '../../styles/colors'

import { getAuthStorage } from '../../utils/auth.storage'
import DateFormat from '../../utils/date.format'

import { useAuth } from '../../contexts/auth'

import styles from './styles'
const Profile:React.FC = () => {

    const [profile, setProfile] = useState<User>()
    const [loading, setLoading] = useState(true)
    const [pets, setPets] = useState<Pet[]>([])
    const [offset, setOffset] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    const {logout} = useAuth()

    async function fetchUser(){
        const data = await getAuthStorage()
        if(!data){
            return setLoading(true)
        }
        setProfile(data.user)
        
    }

    async function fetchPets(){
        if(!profile){
            return setLoading(true)
        }
        
        const limit = 10
        const { data } = await api.get<Pet[]>(`pets?owner=${profile?.id}&offset=${offset}&limit=${limit}`)
        if (!data){
        return setLoading(true)
        }

        if(offset/ limit > 0){
        setPets(oldValue=>[...oldValue,...data])
        }else {
        setPets(data)
        }

        if(data.length > 0){
            setOffset(oldValue=>oldValue + limit)
        }

        setLoadingMore(false)
        setLoading(false)
  }

  function handleFetchMore(distance:number){
    if(distance < - 1){
        return
    }
    setLoadingMore(true)
    fetchPets()
  }

  function handleUpdateAvatar(){
  }

  function handleLogout(){
       logout()
  }

    useEffect(() => {
        fetchUser()
    },[])

    useEffect(()=> {
        fetchPets()
    },[profile])

    if(!!loading && !profile){
        return <Load/>
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                    <View 
                        style={styles.topSize}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleUpdateAvatar}
                        >
                            <Image 
                                source={{uri: profile?.avatar?.path}}
                                resizeMode='cover'
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.name}> 
                                {`${profile?.firstName} ${profile?.lastName}`} 
                            </Text>
                            { profile?.since ?
                                (
                                    <Text style={styles.since}> 
                                        {`Membro desde: ${DateFormat.mouthYear(new Date(profile?.since))}`} 
                                    </Text>
                                )
                                : <></>
                            }
                        </View>
                        <View style={styles.edit}>
                            <Button
                                title='Editar Perfil'
                                transparent={true}
                            />
                        </View>
                        <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleLogout}
                                style={styles.logout}
                            >
                                <Feather
                                    name='log-out'
                                    size={28}
                                />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomSize}>
                        <Text style={styles.title}>
                            Meus Pets:
                        </Text>
                        <FlatList
                            data={pets}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item)=>String(item.id)}
                            onEndReachedThreshold={0.001}
                            onEndReached={({distanceFromEnd}) => {
                                handleFetchMore(distanceFromEnd)
                            }}
                            ListFooterComponent={ (
                                loadingMore ? 
                                <ActivityIndicator
                                    color={colors.black}
                                    size={25}
                                    style={styles.loading}
                                />
                                :
                                <></>
                            ) }
                            renderItem={({item})=> (
                                <CardPet data={item}/>
                            )}
                        />
                    </View>
            </View>
        </SafeAreaView>)
}

export default Profile