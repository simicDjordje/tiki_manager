import { TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from './CustomText'
import LootieSuccess from '../LootieAnimations/Success'
import LootieLoader from '../LootieAnimations/Loader'
import LootieError from '../LootieAnimations/Error'

const CustomButton = ({onPress, text, isLoading, isSuccess, isError}) => {
    const [innerError, setInnerError] = useState(isError || false)

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
            className="bg-appColorDark rounded-xl h-14 flex flex-row justify-center items-center w-full">
            <LootieError d={40} />
        </TouchableOpacity>
    )


    if(isLoading) return (
        <TouchableOpacity 
            className="bg-appColorDark rounded-xl h-14 flex flex-row justify-center items-center w-full">
            <LootieLoader d={40} />
        </TouchableOpacity>
    )

    if(isSuccess) return (
        <TouchableOpacity 
            className="bg-appColorDark rounded-xl h-14 flex flex-row justify-center items-center w-full">
           <LootieSuccess d={150} />
        </TouchableOpacity>
    )

  return (
    <TouchableOpacity 
        onPress={onPress}
        className="bg-appColorDark rounded-xl h-14 flex flex-row justify-center items-center w-full">
        <Text className="text-white text-lg" bold>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton