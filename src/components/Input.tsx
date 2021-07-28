import React, {useState} from 'react'

import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


export default function Input({...rest}:TextInputProps){
    const [focus, setFocus] = useState(false)

    return (
            <View style={[
                styles.container,
                focus && {borderColor: colors.orange_dark}
                ]}>
                <TextInput 
                    {...rest}
                    style={styles.input}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: colors.gray,
        alignContent: 'center',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        color: colors.heading,
        fontSize: 16,
        fontFamily: fonts.text,
    }
})