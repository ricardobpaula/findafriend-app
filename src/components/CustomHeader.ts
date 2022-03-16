import colors from '../styles/colors'
import fonts from '../styles/fonts'

const CustomHeader:Object = () => {
  return {
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerTintColor: colors.heading,
    headerTitleStyle: {
      fontFamily: fonts.heading,
      fontSize: 18,
      color: colors.heading
    }
  }
}

export default CustomHeader
