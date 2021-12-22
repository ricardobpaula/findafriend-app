import React from 'react'
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import DateFormat from '../utils/date.format'
import CardImage from './CardImage'

export interface Photo {
    path: string,
    id: number,
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


const { width } = Dimensions.get('window')

const CardPetCarousel:React.FC<ComponentProps> = ({data}) => {

    const scrollX = React.useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={data.photos}
                keyExtractor={(photo) => photo.id.toString()}
                horizontal
                pagingEnabled
                scrollEventThrottle={32}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true}
                    )}
                renderItem={({item}) => (
                    <View style={styles.carousel}>
                        <CardImage 
                            data={item}
                        />
                    </View>
                )
                }
            />
            <View style={styles.pagination}>
                {data.photos.map((_,index)=> {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8,1.4,0.8],
                        extrapolate: 'clamp'
                    })
                    return (<Animated.View
                            key={`indicator-${index}`}
                            style={[styles.dot,{ transform: [ { scale }]}]}
                        />)

                })}
            </View>
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
    
    infoContainer: {
        flex: 1,
    },
    row: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    carousel: {
        flex: 1,
        alignItems: 'center',
    },
    pagination: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        bottom: width * 0.2,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.shape,
        marginRight: 10
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