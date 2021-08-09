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
    transparent: boolean,
    flex?: boolean,

}

const Button:React.FC<ButtonProps> = ({title,transparent,flex, ...rest}) =>{
    return (
        <TouchableOpacity 
            style={[
                styles.container,
                transparent ? styles.backgroundWhite :  styles.backgroundOrange,
                flex && styles.flexContainer
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

export default Button

const styles = StyleSheet.create({
    container: {
        height: 56,
        marginVertical: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexContainer: {
        flex: 1,
        margin: 5,
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