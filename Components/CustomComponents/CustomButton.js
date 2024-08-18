import { TouchableOpacity } from 'react-native'
import React from 'react'
import Text from './CustomText'
import LootieSuccess from '../LootieAnimations/Success'

const CustomButton = ({onPress, text, isLoading, isSuccess}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        className="bg-appColorDark rounded-3xl h-14 flex flex-row justify-center items-center w-full">
        {isSuccess && <LootieSuccess d={150} />}
        {!isSuccess && <Text className="text-white text-lg" bold>{text}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton