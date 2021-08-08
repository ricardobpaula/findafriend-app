import React, {useState} from 'react'

import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TextInputProps
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface InputProps extends TextInputProps {
    error?: any
}

const Input:React.FC<InputProps> = ({error,...rest}) => {
    const [focus, setFocus] = useState(false)

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
                        onBlur={() => setFocus(false)}
                        onFocus={() => setFocus(true)}
                    />
                </View>

                { error &&
                    <Text style={styles.error}>{error.message}</Text>
                }
            </View>
    )
}

export default Input

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
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: colors.gray,
        alignContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        color: colors.heading,
        fontSize: 16,
        fontFamily: fonts.text,
    }
})