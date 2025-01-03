import { View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const AddSalonLastStep = ({name, description, address, logo}) => {
  return (
    <View className="h-full flex flex-col justify-center items-center -mt-10">
        <Text className="text-lg" bold>Kako funkcioniše dodavanje salona?</Text>

        <Text className="text-center text-textMid mt-2">
            Nakon potvrde, kreiraćemo tvoj salon, koji će se pojaviti na početnoj stranici.
        </Text>
        <Text className="text-center text-textMid mt-2">
            Salon ostaje neaktivan dok ne dodaš usluge i tim
        </Text>

        <Text className="text-center text-textMid mt-2">
            Kada salon postane aktivan, počinje proces naplate, uz prvi mesec besplatnog rada
        </Text>

        
        <View className="bg-textSecondary w-full h-0.5 my-4"></View>

        <View className="flex flex-row justify-center items-center">
            <Image
                className="w-12 h-12 rounded-full"
                source={logo}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />
        </View>

        <View className="flex flex-row justify-between items-center w-full px-4 mt-3">
            <Text className="text-textMid">Naziv: </Text>
            <Text className="text-textMid" bold>{name}</Text>
        </View>
        <View className="flex flex-row justify-between items-center w-full px-4">
            <Text className="text-textMid">Opis: </Text>
            <Text className="text-textMid" bold>{description.length > 30 ? `${description.slice(0, 30)}...` : description}</Text>
        </View>
        <View className="flex flex-row justify-between items-center w-full px-4">
            <Text className="text-textMid">Adresa: </Text>
            <Text className="text-textMid" bold>{address}</Text>
        </View>
    </View>
  )
}

export default AddSalonLastStep