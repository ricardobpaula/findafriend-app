import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'

interface CardProps {
    data: Photo
}

const { width } = Dimensions.get('window')

const CardImage:React.FC<CardProps> = ({ data }) => {
  return (
        <View>
            <Image
                source={{ uri: data.path }}
                style={styles.photo}
                resizeMode='cover'
            />
        </View>
  )
}

export default CardImage

const styles = StyleSheet.create({
  photo: {
    height: width * 0.9,
    width: width * 0.9,
    borderRadius: width * 0.05,
    marginBottom: 5
  }
})
