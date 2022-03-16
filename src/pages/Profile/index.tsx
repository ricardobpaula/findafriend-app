import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Button from '../../components/buttons/Button'
import CardPet from '../../components/CardPet'
import Load from '../../components/Load'

import api from '../../services/api'
import { useAuth } from '../../contexts/auth'
import DateFormat from '../../utils/date.format'
import { getAuthStorage } from '../../utils/auth.storage'

import styles from './styles'
import colors from '../../styles/colors'
import avatarDefault from '../../assets/user.png'

import { AuthStackParamsList } from '../../routes/profile.routes'

type ProfileScreenProps = StackNavigationProp<AuthStackParamsList, 'Profile'>

const Profile:React.FC = () => {
  const navigation = useNavigation<ProfileScreenProps>()

  const [profile, setProfile] = useState<User>()
  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState<Pet[]>([])
  const [offset, setOffset] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const { logout } = useAuth()

  async function fetchUser () {
    const data = await getAuthStorage()
    if (!data) {
      return setLoading(true)
    }
    setProfile(data.user)
  }

  async function fetchPets () {
    if (!profile) {
      return setLoading(true)
    }

    const limit = 10
    const { data } = await api.get<Pet[]>(`pets?owner=${profile?.id}&offset=${offset}&limit=${limit}`)
    if (!data) {
      return setLoading(true)
    }

    if (offset / limit > 0) {
      setPets(oldValue => [...oldValue, ...data])
    } else {
      setPets(data)
    }

    if (data.length > 0) {
      setOffset(oldValue => oldValue + limit)
    }

    setLoadingMore(false)
    setLoading(false)
  }

  function handleFetchMore (distance:number) {
    if (distance < -1) {
      return
    }
    setLoadingMore(true)
    fetchPets()
  }

  function handleUpdateAvatar () {
  }

  function handleLogout () {
    logout()
  }

  function handleEditProfile () {
    navigation.navigate('EditProfile')
  }

  function handleNewPet () {
    navigation.navigate('FormPet')
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchPets()
  }, [profile])

  if (!!loading && !profile) {
    return <Load/>
  }

  return (
        <View style={styles.container}>
            <View style={styles.content}>
                    <View
                        style={styles.topSize}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleUpdateAvatar}
                        >
                            <Image
                                source={profile?.avatar?.path ? { uri: profile?.avatar?.path } : avatarDefault}
                                resizeMode='cover'
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.name}>
                                {`${profile?.firstName} ${profile?.lastName}`}
                            </Text>
                            { profile?.since
                              ? (
                                    <Text style={styles.since}>
                                        {`Membro desde: ${DateFormat.mouthYear(profile?.since)}`}
                                    </Text>
                                )
                              : <></>
                            }
                        </View>
                        <View style={styles.edit}>
                            <Button
                                title='Editar Perfil'
                                transparent={true}
                                onPress={handleEditProfile}
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
                        {
                        pets.length > 0

                          ? <FlatList
                                data={pets}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => String(item.id)}
                                onEndReachedThreshold={0.001}
                                onEndReached={({ distanceFromEnd }) => {
                                  handleFetchMore(distanceFromEnd)
                                }}
                                ListFooterComponent={ (
                                    loadingMore
                                      ? <ActivityIndicator
                                        color={colors.black}
                                        size={25}
                                        style={styles.loading}
                                    />
                                      : <></>
                                ) }
                                renderItem={({ item }) => (
                                    <CardPet data={item}/>
                                )}
                            />

                          : <View>
                              <View style={styles.noResult}>
                                <Text style={styles.textNoResult}> Você não possui pets cadastrados </Text>
                              </View>
                                <Button
                                  flex={false}
                                  title='Novo Pet'
                                  transparent={false}
                                  onPress={handleNewPet}
                                />
                            </View>

                        }
                    </View>
            </View>
        </View>)
}

export default Profile
