import { View, TouchableOpacity } from 'react-native'
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


const SalonLogoScreen = () => {
  const [logo, setLogo] = useState('https://marketplace.canva.com/EAFbDkqUoJ8/1/0/1600w/canva-beige-brown-yellow-beauty-hair-salon-logo-mcTtlsA1WxM.jpg')
  const [image, setImage] = useState(null)
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleSave = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

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
            setImage(result.assets[0].uri)
        }
      }

  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonName.length > 34 ? `${salonName.substring(0, 34)}...` : salonName}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="flex flex-row justify-start items-center mt-6 w-full">
              <Text className="text-2xl" bold>Izmeni logo</Text>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-20" style={{height: 0.5}}></View>

            <View className="w-44 h-44 rounded-full relative">
                    {image && 
                      <TouchableOpacity onPress={() => setImage(null)} className="p-3 bg-textPrimary rounded-full absolute -top-2 right-2 z-10">
                          <Ionicons name="close" size={20} color="white" />
                      </TouchableOpacity>
                    }
                    <Image
                        className="w-44 h-44 rounded-full border-2 border-textPrimary"
                        source={image ? image : logo}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                    <TouchableOpacity onPress={pickImage} className="p-3 bg-textPrimary rounded-full absolute bottom-0 right-0">
                        <Entypo name="plus" size={34} color="white" />
                    </TouchableOpacity>
              </View>
              <View className="w-full flex flex-row justify-between items-center px-8 mt-10 bg-bgPrimary py-2 rounded-xl">
                  <Image
                        className="w-8 h-8 rounded-full border-2 border-appColorDark"
                        source={image ? image : logo}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />

                  <Image
                        className="w-12 h-12 rounded-full border-2 border-textPrimary"
                        source={image ? image : logo}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />

                  <Image
                        className="w-16 h-16 rounded-full border-2 border-appColor"
                        source={image ? image : logo}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />

                  <Image
                        className="w-20 h-20 rounded-full border-2 border-textPrimary"
                        source={image ? image : logo}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />
              </View>
          </View>

          <View>
            <TouchableOpacity 
                onPress={handleSave}
                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mb-24">
                <Text className="text-white text-lg" bold>Sačuvaj</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default SalonLogoScreen