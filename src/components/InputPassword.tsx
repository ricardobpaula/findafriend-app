import React, { useState } from 'react'

import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Feather } from '@expo/vector-icons';

export default function InputPassword({...rest}:TextInputProps){
    const [focus, setFocus] = useState(false)
    const [secure, setSecure ] = useState(true)

    return (
        <View style={[
            styles.container,
            focus && {borderColor: colors.orange_dark}
            ]}>
            <TextInput 
                {...rest}
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry={secure}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                
            />
            <Feather
                name={secure ? "eye" : 'eye-off'}
                size={20} color='gray' 
                onPress={() => setSecure(!secure)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colors.gray,
        marginBottom: 20,
        alignItems: 'center',
        alignContent: 'space-around'
    },
    input: {
        padding: 10,
        flex: 1,
        color: colors.heading,
        fontSize: 16,
        fontFamily: fonts.text,
    }
})