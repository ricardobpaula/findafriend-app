import React from 'react'
import {
    StyleSheet
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { ButtonBack } from "./ButtonBack"

export default function CustomHeader(title: string):Object {
    return {
        headerBackImage: () => <ButtonBack />,
        headerTitle: title,
        headerStyle: styles.container,
        headerTitleStyle: styles.title
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.orange_dark,
    },
    title: {
        fontSize: 20,
        lineHeight: 32,
        color: colors.white,
        fontFamily: fonts.heading
    },
    
})