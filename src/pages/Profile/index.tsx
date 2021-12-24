import React, { useEffect, useState } from 'react'

import { SafeAreaView, View, Text, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import Button from '../../components/Button'
import CardPet from '../../components/CardPet'

import Load from '../../components/Load'
import api from '../../services/api'
import colors from '../../styles/colors'

import { getAuthStorage } from '../../utils/auth.storage'
import DateFormat from '../../utils/date.format'

import styles from './styles'
const Profile:React.FC = () => {

    const [profile, setProfile] = useState<User>()
    const [loading, setLoading] = useState(true)
    const [pets, setPets] = useState<Pet[]>([])
    const [offset, setOffset] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)

    async function fetchUser(){
        const data = await getAuthStorage()
        if(!data){
            return setLoading(true)
        }
        setProfile(data.user)
        // console.log(!!profile)
        
    }

    async function fetchPets(){
        if(!profile){
            return setLoading(true)
        }
        
        const limit = 2
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
                    <Image 
                        source={{uri: profile?.avatar?.path}}
                        resizeMode='cover'
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.name}> 
                            {`${profile?.firstName} ${profile?.lastName}`} 
                        </Text>
                        { profile?.since ?
                            (
                                <Text style={styles.since}> 
                                    {`Desde: ${DateFormat.dateWithMouth(new Date(profile?.since))}`} 
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