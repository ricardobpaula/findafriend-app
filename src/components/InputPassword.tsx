import React, { useState } from 'react'

import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TextInputProps
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Feather } from '@expo/vector-icons';

interface InputPasswordProps extends TextInputProps {
    error?: any
}

export const InputPassword:React.FC<InputPasswordProps> = ({error,...rest}) => {
    const [focus, setFocus] = useState(false)
    const [secure, setSecure ] = useState(true)

    return (
        <View style={styles.container}>

            <View style={[
                styles.inputContainer,
                focus && {borderColor: colors.orange_dark},
                error && {borderColor: colors.red}
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
            {
                error &&
                    <Text style={styles.error}> {error.message}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 10
    },
    error: {
        color: colors.red,
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colors.gray,
        alignContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        width: '100%',
        color: colors.heading,
        fontSize: 16,
        fontFamily: fonts.text
    }
})