import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import DateFormat from '../utils/date.format'

export interface Photo {
    path: string
}

export interface PetProps {
        id: string,
        description: string,
        size: string,
        adopted: boolean,
        createdAt: Date,
        specie: {
            id: string,
            name: string
        },
        photos: Photo[]
}

interface ComponentProps {
    data: PetProps
}

const CardPet:React.FC<ComponentProps> = ({data}) => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri: data.photos[0].path}}
                style={styles.photo}
                resizeMode='cover'
            />
            <View style={styles.infoContainer}>
                <View>
                    <Text 
                        style={[styles.text, styles.specie]}
                    >
                        Cachorro
                    </Text>
                    <Text 
                    style={[styles.text, styles.size]}
                    >
                        Pequeno
                    </Text>
                </View>
                <View>
                    <Text 
                    style={[styles.text, styles.date]}
                    >
                        {DateFormat.dateWithMouth(new Date(data.createdAt))}
                    </Text>
                </View>
            </View>
        </View>
    )

}

export default CardPet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        maxHeight: Dimensions.get('window').width * 0.2,
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
        height: Dimensions.get('window').width * 0.15,
        width: Dimensions.get('window').width * 0.15,
        borderRadius: 100,
        
    },
    infoContainer: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
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