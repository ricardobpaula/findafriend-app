import React, { useEffect, useRef, useState } from 'react'

import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import FormData from 'form-data'

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

import EditProfile, { EditProfileHandles } from '../../components/modals/EditProfile'
import FormPet, { FormPetHandles } from '../../components/modals/FormPet'
import PictureSelect, { Picture, PictureSelectHandles } from '../../components/modals/PictureSelect'
import NoResult from '../../components/NoResult'

const Profile:React.FC = () => {
  const editProfileRef = useRef<EditProfileHandles>(null)
  const formPetRef = useRef<FormPetHandles>(null)
  const pictureSelectRef = useRef<PictureSelectHandles>(null)

  const [profile, setProfile] = useState<User>()
  const [photo, setAvatar] = useState<Photo>()
  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState<Pet[]>([])
  const [offset, setOffset] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const { logout, avatar } = useAuth()

  async function fetchUser () {
    const data = await getAuthStorage()
    if (!data) {
      return setLoading(true)
    }
    setProfile(data.user)
    setAvatar(data.avatar)
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
    pictureSelectRef.current?.openModal()
  }

  async function updateAvatar (photo: Picture) {
    const data = new FormData()

    data.append('file', {
      uri: photo.uri,
      name: photo.name,
      type: photo.type
    })

    try {
      await api.post('users/avatar', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      const newAvatar = await avatar()
      console.log(newAvatar)
      setAvatar(newAvatar)
    } catch (e: any) {
      console.log(e.response)
    }
  }

  function handleLogout () {
    logout()
  }

  function handleEditProfile () {
    editProfileRef.current?.openModal()
  }

  function handleNewPet () {
    formPetRef.current?.openModal()
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchPets()
  }, [profile])

  if (!!loading || !profile) {
    return <Load/>
  }

  return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View
              style={styles.topSide}
            >
              <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleUpdateAvatar}
              >
                  <Image
                      source={photo?.path ? { uri: photo?.path } : avatarDefault}
                      resizeMode='cover'
                      style={styles.avatar}
                  />
              </TouchableOpacity>
              <View>
                  <Text style={styles.name}>
                      {`${profile.firstName} ${profile.lastName}`}
                  </Text>
                  <Text style={styles.since}>
                    {`Membro desde: ${DateFormat.mouthYear(profile.since)}`}
                  </Text>
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
            <View style={styles.middleSide}>
              <Text style={styles.title}>
                  Meus Pets:
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleNewPet}
              >
                <Feather
                  name='plus'
                  size={25}
                  color={colors.heading}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomSide}>
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
                        <NoResult
                        size={Dimensions.get('window').width * 0.2}
                        text='Você não possui pets cadastrados'
                      />
                    </View>
                }
            </View>
            <PictureSelect
              title='Foto de perfil'
              ref={pictureSelectRef}
              getPicture={avatar => updateAvatar(avatar)}
            />
            <EditProfile
              profile={profile}
              ref={editProfileRef}
            />
            <FormPet
              ref={formPetRef}
            />
          </View>
        </View>)
}

export default Profile
