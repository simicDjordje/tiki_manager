import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const WorkerCard = () => {
  return (
    <TouchableOpacity className="bg-bgPrimary h-44 w-[48%] rounded-2xl mb-4 flex flex-col justify-between">
        <View className="flex flex-row justify-end items-center px-2 pt-1">
            <MaterialCommunityIcons name="account-details" size={24} color="black" />
        </View>
        <View className="flex-1 flex flex-col justify-center items-center">
        <Image
            className="w-24 h-24 rounded-full border-2 border-appColor -mt-4"
            source={require('../assets/fpp.png')}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
        />
        </View>
        <View className="flex flex-row justify-center items-center pb-2 pt-1">
            <Text bold>Natalija Lukic</Text>
        </View>
    </TouchableOpacity>
  )
}

export default WorkerCard