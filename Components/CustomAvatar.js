import { View } from 'react-native'
import React from 'react'
import Text from './CustomComponents/CustomText'

const CustomAvatar = ({text, big, white}) => {
  return (
    <View className={`h-full w-full rounded-full flex flex-row justify-center items-center ${white ? 'bg-bgSecondary' : 'bg-bgPrimary'}`}>
        <Text className={`text-textPrimary ${big && 'text-xl'}`} bold>{text}</Text>
    </View>
  )
}

export default CustomAvatar