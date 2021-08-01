import { Feather } from '@expo/vector-icons'
import React from 'react'
import colors from '../styles/colors'

export function ButtonBack(){
    return (
        <Feather 
            name={'arrow-left'}
            size={28} 
            color={colors.white}
        />
    )
}