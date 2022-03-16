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
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: colors.shape,
    borderRadius: 25,
    paddingVertical: 5
  },
  loading: {
    padding: 10
  }

})

export default styles
