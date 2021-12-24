import { StyleSheet } from 'react-native'
import colors from '../../styles/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: colors.white
    },
    loading: {
        padding: 10
    }

})

export default styles