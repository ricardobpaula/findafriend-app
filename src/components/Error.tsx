import React from 'react'
import { Dimensions } from 'react-native'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ErrorProps {
    title: string,
    message: string
}

const HEIGHT = 150
const WIDTH = Dimensions.get('window').width

export default function Error({title, message}:ErrorProps) {
    
    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={styles.header}>
                        {title}
                    </Text>

                    <Text style={styles.text}>
                        {message}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    modal: {
        height: HEIGHT,
        width: WIDTH-80,
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    textView: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        margin: 5,
        fontSize: 18,
        fontFamily: fonts.heading,
        color: colors.heading
    },
    text: {
         margin: 5,
         fontSize: 16,
         fontFamily: fonts.text,
         color: colors.black
    }
})