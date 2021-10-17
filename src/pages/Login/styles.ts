import {StyleSheet} from 'react-native'
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    body: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 25,
        color: colors.heading
    },
    subTitle: {
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.body_light,
        fontFamily: fonts.text
    }
})

export default styles