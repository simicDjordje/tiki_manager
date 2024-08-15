import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const AddSalonStepFour = ({handleNext, images, setImages}) => {
    
      const removeImage = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove)
        setImages(updatedImages)
      }

  return (
    <View className="mt-10">  
    <ScrollView>      
        <View className="mt-4">
            <View className="flex flex-row flex-wrap justify-between relative">
                {images.map((image, index) => {
                    return (
                        <View className="w-[48%] mb-5 flex flex-row justify-center items-center relative" key={index}>
                            <TouchableOpacity onPress={() => removeImage(index)} className="p-1 bg-textPrimary rounded-full absolute -top-3 right-1 z-10">
                                <Ionicons name="close" size={18} color="white" />
                            </TouchableOpacity>
                            <Image
                                className="w-36 h-36 rounded-lg border-2 border-appColor"
                                source={image}
                                placeholder={{ blurhash }}
                                contentFit="scale-down"
                                transition={1000}
                            />
                        </View>
                    )
                })}
            </View>
        </View>

        <TouchableOpacity 
            onPress={handleNext}
            className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mt-3">
            <Text className="text-white font-bold text-lg">Dalje</Text>
        </TouchableOpacity>

        </ScrollView>
    </View>
  )
}

export default AddSalonStepFour