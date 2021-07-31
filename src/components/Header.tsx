import React from 'react'

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/core'


import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { Feather } from '@expo/vector-icons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Props {
    title: string,
    previousScreen: string
}

export default function Header({title, previousScreen}:Props){

    function handleBack(){
        const navigate = useNavigation()

        navigate.navigate(previousScreen)
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.icon}
                activeOpacity={0.7}
            >
                <Feather 
                    name={'arrow-left'}
                    size={28} 
                    color={colors.heading}
                    
                    onPress={() => handleBack}
                />
            </TouchableOpacity>

            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.black,
        marginTop: getStatusBarHeight()+10,
    },
    title:{
        fontSize: 28,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading
    },
    icon: {
        paddingHorizontal: 10,
        // backgroundColor: 'red'
    }
})