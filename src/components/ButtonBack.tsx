import React from 'react'
import { Feather } from '@expo/vector-icons'
import colors from '../styles/colors'

export const ButtonBack:React.FC = () =>{
    return (
        <Feather 
            name={'arrow-left'}
            size={28} 
            color={colors.white}
        />
    )
}