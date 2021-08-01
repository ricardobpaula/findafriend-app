import React, {useState} from 'react'

import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps
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
        width: '100%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: colors.gray,
        alignContent: 'space-around',
        marginBottom: 20,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        padding: 10,
        color: colors.heading,
        fontSize: 16,
        fontFamily: fonts.text,
    }
})