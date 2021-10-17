import React, { useState, useRef } from 'react'

import {
    View,
    Text,
} from 'react-native'

import styles from './styles'

import Button from '../../components/Button'

import { useAuth } from '../../contexts/auth'
import CardPet from '../../components/CardPet'

const Dashboard:React.FC = () => {
    const { logout } = useAuth()
    
    function handleLogout() {
        logout()
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <CardPet data={pets[0]} />
                <CardPet data={pets[1]} />
                </View>
        </View>
    )

}

export default Dashboard

const pets = [
    {
        id: 1,
        description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        size: 'medio',
        adopted: false,
        createdAt: new Date(),
        specie: {
            id: 1,
            name: 'cachorro'
        },
        photos: [
            {url: 'https://skycms.s3.amazonaws.com/images/5495100/cachorro-card-1.png'}
        ]
    },
    {
        id: 2,
        description: 's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        size: 'pequeno',
        adopted: false,
        createdAt: new Date(),
        specie: {
            id: 2,
            name: 'gato'
        },
        photos: [
            {url: 'https://www.dicaspetz.com.br/wp-content/uploads/2020/08/cat-cafe-pet.jpg'}
        ]
    }
]