import { TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from './CustomText'
import LootieSuccess from '../LootieAnimations/Success'
import LootieLoader from '../LootieAnimations/Loader'
import LootieError from '../LootieAnimations/Error'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const CustomButton = ({onPress, text, isLoading, isSuccess, isError, variant, acceptIcon, rejectIcon}) => {
    const [innerError, setInnerError] = useState(isError || false)
    let btnClassName = ''
    let btnStyle = {}
    let iconColor = 'black'
    let textClassName = 'text-white'
    let isWhiteSuccess = false

    if(!variant){
        btnClassName = 'bg-appColorDark rounded-xl h-14 flex flex-row justify-center items-center w-full'
        iconColor = 'white'
    }

    if(variant === 'dark'){
        btnClassName = 'bg-textPrimary rounded-xl h-14 flex flex-row justify-center items-center w-full'
        iconColor = 'white'
        isWhiteSuccess = true
    }

    if(variant === 'light'){
        btnClassName = 'bg-bgSecondary rounded-xl h-14 flex flex-row justify-center items-center w-full'
        textClassName = 'text-black'
    }

    if(variant === 'transparent'){
        btnClassName = 'rounded-xl h-14 flex flex-row justify-center items-center w-full border-textSecondary'
        btnStyle.borderWidth = 0.5
        iconColor = 'black'
    }

    useEffect(() => {
        if (isError) {
            setInnerError(true)
        }
    }, [isError])

    useEffect(()=>{
        if(!innerError) return

        setTimeout(()=>{
            setInnerError(false)
        }, 2000)
    }, [innerError])

    if(innerError) return (
        <TouchableOpacity 
            className={btnClassName}
            style={btnStyle}
            >
            <LootieError d={40} />
        </TouchableOpacity>
    )


    if(isLoading) return (
        <TouchableOpacity 
            className={btnClassName}
            style={btnStyle}
            >
            <LootieLoader d={40} />
        </TouchableOpacity>
    )

    if(isSuccess) return (
        <TouchableOpacity 
            className={btnClassName}
            style={btnStyle}
            >
           <LootieSuccess d={isWhiteSuccess ? 70 : 150} white={isWhiteSuccess} />
        </TouchableOpacity>
    )

  return (
    <TouchableOpacity 
        onPress={onPress}
        className={btnClassName}
        style={btnStyle}
        >
        {(!acceptIcon && !rejectIcon) && <Text className={`${textClassName} text-lg`} bold>{text}</Text>}
        {rejectIcon && <Ionicons name="close" size={28} color={iconColor} />}
        {acceptIcon && <FontAwesome6 name="check" size={24} color={iconColor} />}
    </TouchableOpacity>
  )
}

export default CustomButton