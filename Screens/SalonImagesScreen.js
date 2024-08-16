import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonImagesScreen = () => {
  const [images, setImages] = useState([
    require('../assets/salon1.jpg'),
    require('../assets/salon2.jpg'),
    require('../assets/salon3.jpg'),
    require('../assets/salon4.jpg'),
    require('../assets/salon1.jpg'),
])
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleSave = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const pickImage = async (index) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    //   aspect: [4, 3],
      quality: 1,
      
    })

    console.log(result);

    if (!result.canceled) {
        let imagesModified = [...images]
        imagesModified[index] = result.assets[0].uri
        
        setImages(imagesModified)
    }
  }


  const pickMultipleImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    })

    if (!result.canceled) {
      const newImages = [...images, ...result.assets]

      if(newImages.length > 6){
        return
      }

      setImages(newImages)
    }
  }

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove)
    setImages(updatedImages)
  }

  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg font-bold">{salonName.length > 34 ? `${salonName.substring(0, 34)}...` : salonName}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="w-full flex flex-row justify-between items-center mt-6">
                <Text className="font-bold text-2xl">Izmeni slike</Text>
                
                <TouchableOpacity onPress={pickMultipleImage} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            
            <Text className="text-center font-bold text-textMid">Slike biti prikazane u istom redosledu</Text>
            <Text className="text-center text-textMid">Prva slika u nizu će biti početna slika kada neko uđe na profil salona</Text>

            <View className="flex-1 w-full">
                {images.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg font-bold mb-3">Dodaj slike</Text>
                        <TouchableOpacity onPress={pickMultipleImage} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
                {images.length > 0 && <ScrollView 
                    className="mb-2 -mt-10 -mr-10"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 20
                    }}>
                        {images.map((image, index) => {
                            const indexPlusOne = index + 1
                            const lastImage = indexPlusOne == images.length

                            return (
                                <View className={`mb-5 flex flex-row justify-center items-center relative ${lastImage ? 'mr-10' : 'mr-4'}`} key={index}>
                                    <View className="absolute left-1 px-3 py-1.5 z-10 rounded-full bg-textPrimary flex flex-row justify-center items-center" style={{top: 89}}>
                                        <Text className="font-bold text-white">{indexPlusOne}</Text>
                                    </View>
                                    <Text className="absolute top-16 text-textMid">{indexPlusOne === 1 && 'Početna slika'}</Text>
                                    <Image
                                        className="w-56 h-56 rounded-lg border-textSecondary mb-6"
                                        style={{borderWidth: 0.5}}
                                        source={image}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <TouchableOpacity onPress={()=>{pickImage(index)}} className="p-2 flex flex-row justify-between items-center px-3 bg-textPrimary rounded-lg absolute bottom-16 w-full right-0">
                                        <Text className="text-white font-bold">Zameni sliku</Text>
                                        <MaterialIcons name="mode-edit" size={24} color="white" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => removeImage(index)} className="p-2 flex flex-row justify-between items-center px-3 bg-textSecondary rounded-lg absolute bottom-4 w-full right-0">
                                        <Text className="text-textPrimary font-bold">Obriši sliku</Text>
                                        <Ionicons name="close" size={28} color="#232323" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </ScrollView>}
            </View>
              
          </View>

          <View>
            <TouchableOpacity 
                onPress={handleSave}
                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mb-24">
                <Text className="text-white font-bold text-lg">Sačuvaj</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default SalonImagesScreen