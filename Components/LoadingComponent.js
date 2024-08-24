import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import LootieLoader from './LootieAnimations/Loader'

const LoadingComponent = () => {
  return (
    <View className="h-full bg-appColor flex flex-col justify-center items-center">
        <StatusBar style={'light'} />
        <LootieLoader d={70} />
    </View>
  )
}

export default LoadingComponent