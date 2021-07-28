import React from 'react'

import {
    Text,
    View,
    StyleSheet
} from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Props {
    title: string
}

export default function Header({title}:Props){

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
        borderRadius: 10,
    },
    title:{
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 32,
    }
})