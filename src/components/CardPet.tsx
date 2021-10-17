import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import DateFormat from '../utils/date.format'

interface PetProps {
    data: {
        id: number,
        description: string,
        size: string,
        adopted: boolean,
        createdAt: Date,
        specie: {
            id: number,
            name: string
        },
        photos: {url: string}[]
    }
}

const CardPet:React.FC<PetProps> = ({data}) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{uri: data.photos[0].url}}
                style={styles.photo}
                resizeMode='cover'
            />
            <View style={styles.infoContainer}>
                <Text style={styles.text}>Aproximadamente à 10 KM</Text>
                <Text 
                    style={[styles.text, styles.specie]}
                >
                    {data.specie.name}
                </Text>
                <Text 
                style={[styles.text, styles.size]}
                >
                    Porte: {data.size}
                </Text>
                <Text 
                style={[styles.text, styles.date]}
                >
                    {DateFormat.dateWithMouth(data.createdAt)}
                </Text>
            </View>
        </View>
    )
            
}

export default CardPet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        maxHeight: Dimensions.get('window').width * 0.4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: colors.shape,
        marginVertical: 10,
        flexDirection: 'row',
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    photo: {
        height: Dimensions.get('window').width * 0.3,
        width: Dimensions.get('window').width * 0.3,
        borderRadius: 100,
        
    },
    infoContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 15,
        textAlign: 'justify',
        color: colors.black,
        fontFamily: fonts.text,
        marginBottom: 5
    },
    specie: {
        fontSize: 16,
        fontFamily: fonts.heading,
        textTransform:'capitalize',
    },
    size: {
        textTransform: 'capitalize'
    },
    date: {
        fontFamily: fonts.heading,
        fontSize: 13,
        textAlign: 'right'
    }
    
})