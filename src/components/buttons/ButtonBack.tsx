import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
import colors from '../../styles/colors'

export const ButtonBack:React.FC = () => {
  return (
        <SimpleLineIcons
            name={'arrow-left'}
            size={20}
            color={colors.heading}
        />
  )
}
