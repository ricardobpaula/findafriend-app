import React, { useState, useEffect, useRef } from 'react'

import {
  ActivityIndicator,
  FlatList,
  View
} from 'react-native'

import styles from './styles'

import CardPetCarousel from '../../components/CardPetCarousel'
import Load from '../../components/Load'
import NoResult from '../../components/NoResult'
import TextButton from '../../components/buttons/TextButton'

import api from '../../services/api'
import colors from '../../styles/colors'
import SpecieFilter, { Handles } from '../../components/modals/SpecieFilter'

const Dashboard:React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([])

  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const [species, setSpecies] = useState<Specie[]|undefined>(undefined)
  // const [sizes, setSizes] = useState<string[]|undefined>(undefined)

  const specieFilterRef = useRef<Handles>(null)

  async function fetchPets () {
    const limit = 2
    const specieFilter = species
      ? `&species=${species.map((specie, index, arr) => index === arr.length - 1 ? specie : specie + ',')}`
      : ''

    /*
    const sizeFilter = sizes
      ? `&sizes=${sizes.map((size, index, arr) => index === arr.length - 1 ? size : size + ',')}`
      : ''
    */
    const filter = `?adopted=false&offset=${offset}&limit=${limit}${specieFilter}`
    const { data } = await api.get<Pet[]>(`pets${filter}`)
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

  function handleSpecieFilter () {
    specieFilterRef.current?.openModal()
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
                    onPress={handleSpecieFilter}
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
                <SpecieFilter
                  ref={specieFilterRef}
                  changeFilter={value => setSpecies(value)}
                />
            </View>
        </View>
  )
}

export default Dashboard
