import {StyleSheet} from 'react-native'
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        width: '100%',
    },
    header: {
        marginBottom: 50,
        paddingTop: 20
    },
    body: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: getStatusBarHeight(),
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    footer: {
        width: '100%',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.body_light,
        fontFamily: fonts.text
    }
})

export default styles