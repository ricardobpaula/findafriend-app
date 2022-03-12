import React, { useState, useEffect } from 'react'

import {
  ActivityIndicator,
  FlatList,
  View
} from 'react-native'

import styles from './styles'

import CardPetCarousel from '../../components/CardPetCarousel'
import Load from '../../components/Load'
import NoResult from '../../components/NoResult'
import TextButton from '../../components/TextButton'

import api from '../../services/api'
import colors from '../../styles/colors'

const Dashboard:React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([])

  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  async function fetchPets () {
    const limit = 2
    const { data } = await api.get<Pet[]>(`pets?adopted=false&offset=${offset}&limit=${limit}`)
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

  function handleFetchMore (distance: number) {
    if (distance < -1) {
      return
    }
    setLoadingMore(true)
    fetchPets()
  }

  useEffect(() => {
    fetchPets()
  }, [])

  if (loading) {
    return <Load/>
  }

  return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                  <TextButton
                    title='Tamanho'
                  />
                  <TextButton
                    title='Distância'
                  />
                  <TextButton
                    title='Espécies'
                  />
                </View>
                { pets.length > 0
                  ? <FlatList
                    data={pets}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <CardPetCarousel
                        data={item}
                      />
                    )}
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
                  >
                  </FlatList>
                  : <NoResult/>
                  }
            </View>
        </View>
  )
}

export default Dashboard
