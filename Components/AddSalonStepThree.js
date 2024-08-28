import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const AddSalonStepThree = ({logo, setLogo, validation3}) => {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
        //   aspect: [4, 3],
          quality: 1,
          
        })
    
        console.log(result);
    
        if (!result.canceled) {
            setLogo(result.assets[0])
        }
      }


  return (
    <View className="h-full">        
        <View className="flex flex-col justify-center items-center">
            <Text className={`text-center ${validation3 && !logo ? 'text-red-700' : 'text-textMid'} text-lg`} bold>
                Logo
            </Text>
        </View>

        <View className="flex flex-col justify-center items-center w-full mt-2 p-3">
            {!logo && 
                <View className={`w-44 h-44 border-2 ${validation3 && !logo ? 'border-red-500' : 'border-textSecondary'} rounded-full relative flex flex-col justify-center items-center`}>
                    <Text className={`${validation3 && !logo ? 'text-red-700' : 'text-textMid'}`}>Logo salona je obavezan</Text>
                    <TouchableOpacity onPress={pickImage} className="p-3 bg-textPrimary rounded-full absolute bottom-0 right-0">
                        <Entypo name="plus" size={34} color="white" />
                    </TouchableOpacity>
                </View>
            }

            {logo && 
                <View className="w-44 h-44 rounded-full relative">
                    <TouchableOpacity onPress={() => setLogo(null)} className="p-3 bg-textPrimary rounded-full absolute -top-2 right-2 z-10">
                        <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                    <Image
                        className="w-44 h-44 rounded-full border-4 border-appColor"
                        source={logo.uri}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
            }
        </View>
    </View>
  )
}

export default AddSalonStepThree