import React from 'react'
import { 
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
    Text
 } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
    title: string,
    transparent: boolean

}

export default function Button({title,transparent, ...rest}: ButtonProps){
    return (
        <TouchableOpacity 
            style={[
                styles.container,
                transparent ? styles.backgroundWhite :  styles.backgroundOrange
            ]}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={[styles.text, 
                transparent ? styles.textOrange : styles.textWhite
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        marginVertical: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundWhite: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.orange
    },
    backgroundOrange: {
        backgroundColor: colors.orange_light,
    },
    text:{
        fontSize: 16,
        fontFamily: fonts.heading
    },
    textOrange: {
        color: colors.orange_light,
    },
    textWhite: {
        color: colors.white,
    }
})