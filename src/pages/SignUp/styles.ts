import { StyleSheet } from 'react-native'

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    content: {
        flex: 1,
        width: '100%',
    },
    body: {
        flex:1 ,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    checkBoxContainer: {
        width: '100%',
        flexDirection:'row', 
        alignItems: 'center',
    },
    termContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.black,
        fontFamily: fonts.text
    },
    link: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.heading,
        fontFamily: fonts.text,
        textDecorationLine: 'underline'
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    
})

export default styles