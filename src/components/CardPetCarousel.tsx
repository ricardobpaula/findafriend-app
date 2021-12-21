import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import DateFormat from '../utils/date.format'

export interface Photo {
    path: string
}

export interface PetProps {
        id: number,
        description: string,
        size: string,
        adopted: boolean,
        createdAt: Date,
        specie: {
            id: number,
            name: string
        },
        photos: Photo[]
}

interface ComponentProps {
    data: PetProps
}

const CardPetCarousel:React.FC<ComponentProps> = ({data}) => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri: data.photos[0].path}}
                style={styles.photo}
                resizeMode='cover'
            />
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text 
                    style={[styles.text, styles.size]}
                    >
                        Pequeno
                    </Text>
                    <Text
                        style={[styles.text,styles.date]}
                    >
                        {DateFormat.dateWithMouth(new Date(data.createdAt))}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.text, styles.subText]}>
                        Cachorro
                    </Text>
                    <Text style={[styles.text, styles.subText]}>
                        Aproximadamente à 10 KM
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default CardPetCarousel

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10,
        marginTop: 10,
    },
    photo: {
        alignSelf: 'center',
        height: Dimensions.get('window').width * 0.9,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: Dimensions.get('window').width * 0.05,
        marginBottom: 5,
    },
    infoContainer: {
        flex: 1,
    },
    row: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 17,
        color: colors.black,
        fontFamily: fonts.text,
        marginBottom: 5
    },
    date: {
        fontFamily: fonts.heading,
    },
    size: {
        fontFamily: fonts.heading,
        textTransform: 'capitalize'
    },
    subText: {
        fontSize: 15,
        color: colors.text_gray
    }
})