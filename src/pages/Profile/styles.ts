import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
        width: '100%'
    },
    topSize: {
        paddingTop: 50,
        paddingBottom: 25, 
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.orange_light,
        width: '100%'
    },
    bottomSize: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,

      },
    avatar: {
        height: width * 0.5,
        width: width * 0.5,
        borderRadius: width * 0.5,
        marginBottom: 10,
        borderWidth: 5,
        borderColor: colors.white
    },
    name: {
        fontFamily: fonts.heading,
        fontSize: 28,
        color: colors.white,
    },
    since: {
        fontFamily: fonts.complement,
        fontSize: 15,
    },
    edit: {
        width: width * 0.6
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 20,
    },
    loading: {
        padding: 10
    }
    
})

export default styles
