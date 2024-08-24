import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const AddSalonStepFour = ({images, setImages, validation4}) => {
    
      const removeImage = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove)
        setImages(updatedImages)
      }

  return (
    <View className="h-full">
        {images.length == 0 && 
            <View className="h-full flex flex-col justify-center items-center">
                <Text className={`text-xl ${validation4 && !images.length ? 'text-red-500' : 'text-textMid'}`} bold>Slike salona su obavezne</Text>
                <Text className="text-textMid">Slike možeš promeniti kasnije na profilu salona</Text>
            </View>
        }


        {images.length > 0 &&
        <View className="h-full">
            <View className="flex flex-row justify-center items-center">
                <Text className="text-textMid -mt-4">Slike će se prikazivati istim redosledom kao ovde</Text>
            </View>

            <ScrollView 
            className="mb-2 -mt-10 -mr-10"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingLeft: 5,
                paddingVertical: 20
            }}>
                {images.map((image, index) => {
                    const lastImage = index + 1 == images.length

                    return (
                        <View className={`mb-5 flex flex-row justify-center items-center relative ${lastImage ? 'mr-10' : 'mr-4'}`} key={index}>
                            <TouchableOpacity onPress={() => removeImage(index)} className="p-2 bg-textPrimary rounded-full absolute top-7 -right-3 z-10">
                                <Ionicons name="close" size={18} color="white" />
                            </TouchableOpacity>
                            <Image
                                className="w-56 h-56 rounded-lg border-textSecondary"
                                style={{borderWidth: 0.5}}
                                source={image}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                        </View>
                    )
                })}
            </ScrollView>

            <View className="flex flex-col justify-center items-center">
                <Text className="text-textMid -mt-4">{images.length >=2 && 'Skroluj u desno za ostale slike'}</Text>
            </View>
        </View>
        }
    </View>
  )
}

export default AddSalonStepFour