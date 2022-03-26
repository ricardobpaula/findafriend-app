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
  topSide: {
    paddingTop: 25,
    paddingBottom: 25,
    height: height * 0.50,
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
    top: 25,
    width: width,
    paddingRight: 20
  },
  middleSide: {
    paddingTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bottomSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 20,
    color: colors.heading
  },
  loading: {
    padding: 10
  },
  textNoResult: {
    padding: 20,
    fontFamily: fonts.heading,
    color: colors.text_gray,
    fontSize: 16
  },
  noResult: {
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default styles
