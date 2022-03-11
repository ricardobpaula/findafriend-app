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
    borderBottomRightRadius: height * 0.1,
    borderBottomLeftRadius: height * 0.1,
    width: '100%'
  },
  logout: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 50,
    width: width,
    paddingRight: 20
  },
  bottomSize: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10

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
    textAlign: 'center'

  },
  since: {
    fontFamily: fonts.complement,
    fontSize: 15,
    textAlign: 'center'
  },
  edit: {
    width: width * 0.6
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20
  },
  loading: {
    padding: 10
  },
  textNoResult: {
    padding: 10,
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 16
  }

})

export default styles
