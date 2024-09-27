import { View, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'
import CustomButton from '../Components/CustomComponents/CustomButton'
import { useUpdateSalonMutation } from '../redux/apiCore'
import { useSelector } from 'react-redux'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonLogoScreen = ({navigation}) => {
  const {currentSalon: salonData} = useSelector(state => state.general)
  const [image, setImage] = useState(null)
  const [updateSalon, {isLoading}] = useUpdateSalonMutation()
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleSave = async () => {
    if(!image) return

    try{
      const logoId = `${Math.random()}${Date.now()}${(Math.random() + 1).toString(36).substring(7)}`

      const formData = new FormData()

      formData.append('salonId', salonData?._id)
      formData.append('logoId', logoId)
      formData.append('salon-logo', {
        uri: Platform.OS === 'android' ? image.uri : logo.uri.replace('file://', ''),  // Handle the URI for different platforms
        type: image.mimeType,
        name: `salon-logo_${logoId}.png`
      })

      const {error, data} = await updateSalon(formData)

      if(error){
        setErrorMessage('Došlo je do greške')
        return
      }

      if(data && data.success){
        setIsSuccess(true)
        setTimeout(()=>{
          navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
        }, 2700)
      }

    }catch(error){
      console.log(error)
    }
  }

  const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
        //   aspect: [4, 3],
          quality: 1,
          
        })
        
        if (!result.canceled) {
            setImage(result.assets[0])
        }
      }

  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonData?.name && salonData?.name.length > 34 ? `${salonData?.name.substring(0, 34)}...` : salonData?.name}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="flex flex-row justify-start items-center mt-6 w-full">
              <Text className="text-2xl" bold>Izmeni logo</Text>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-20" style={{height: 0.5}}></View>

            <View className="flex flex-row justify-center items-center h-6">
              <Text className="mb-4 -mt-4 text-red-700" semi>{errorMessage}</Text>
            </View>

            <View className="w-44 h-44 rounded-full relative">
                    {image && 
                      <TouchableOpacity onPress={() => setImage(null)} className="p-3 bg-textPrimary rounded-full absolute -top-2 right-2 z-10">
                          <Ionicons name="close" size={20} color="white" />
                      </TouchableOpacity>
                    }


                    <Image
                        className="w-44 h-44 rounded-full border-2 border-textPrimary"
                        source={image ? image.uri : `http://192.168.1.27:5000/photos/salon-logo_${salonData?.logoId}.png`}
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
                        source={image ? image.uri : `http://192.168.1.27:5000/photos/salon-logo_${salonData?.logoId}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />

                  <Image
                        className="w-12 h-12 rounded-full border-2 border-textPrimary"
                        source={image ? image.uri : `http://192.168.1.27:5000/photos/salon-logo_${salonData?.logoId}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />

                  <Image
                        className="w-16 h-16 rounded-full border-2 border-appColor"
                        source={image ? image.uri : `http://192.168.1.27:5000/photos/salon-logo_${salonData?.logoId}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />

                  <Image
                        className="w-20 h-20 rounded-full border-2 border-textPrimary"
                        source={image ? image.uri : `http://192.168.1.27:5000/photos/salon-logo_${salonData?.logoId}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                  />
              </View>
          </View>

          <View className="mb-24">
            <CustomButton 
              onPress={handleSave}
              text={'Sačuvaj'}
              isLoading={isLoading}
              isError={!!errorMessage}
              isSuccess={isSuccess}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default SalonLogoScreen