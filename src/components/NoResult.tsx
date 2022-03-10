import React from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native'

import LottieView from 'lottie-react-native'

import NotFoundAnimation from '../assets/lottie/no_results.json'

// TODO estilizar no results
const NoResult:React.FC = () => {
    return (
        <>
            <LottieView 
                source={NotFoundAnimation}
                autoPlay
                loop={true}
                style={styles.gif}
            />
        </>
    )
}

export default NoResult

const styles = StyleSheet.create({
    gif: {
        width: Dimensions.get('window').width * 0.7
    }
})