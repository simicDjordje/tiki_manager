import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import LootieSuccess from '../Components/LootieAnimations/Success'
import Text from './CustomComponents/CustomText'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const CreateWorkerAccountModal = ({isModalVisible, setIsModalVisible}) => {
    const [image, setImage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri)
        }
      }

    const closeModal = () => {
        setImage(null)
        setIsSuccess(false)
        setIsModalVisible(false)
    }

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className="h-5/6 w-full">
                <View 
                    className="h-full w-full bg-bgPrimary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl font-bold ml-2">Postani deo salona</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    {!isSuccess &&
                    <View>
                        <View className="flex flex-col justify-center items-center mt-4">
                            <Text className="text-center text-textMid">
                                Nakon potvrde, menadžer salona će moći lako da te pronađe i doda u tim i moći ćeš da pratiš svoje rezervacije.
                            </Text>

                            <Text className="text-center text-textMid mt-2">
                                Kreiranje profila je besplatno.
                            </Text>

                        </View>

                        <View className="flex flex-row justify-center items-center mt-6">
                            {image ? <Text>Slika uspešno dodata</Text> : <Text>Dodaj profilnu sliku</Text>}
                        </View>

                        <View className="flex flex-col justify-center items-center w-full mt-2 p-3">
                            {!image && 
                                <View className="w-44 h-44 border-2 border-dashed border-textSecondary rounded-full relative flex flex-col justify-center items-center">
                                    <Text className="text-textMid">Profilna slika je obavezna</Text>
                                    <TouchableOpacity onPress={pickImage} className="p-3 bg-textPrimary rounded-full absolute bottom-0 right-0">
                                        <Entypo name="plus" size={34} color="white" />
                                    </TouchableOpacity>
                                </View>
                            }

                            {image && 
                                <View className="w-48 h-48 rounded-full relative">
                                    <TouchableOpacity onPress={() => setImage(null)} className="p-3 bg-textPrimary rounded-full absolute -top-2 right-2 z-10">
                                        <Ionicons name="close" size={20} color="white" />
                                    </TouchableOpacity>
                                    <Image
                                        className="w-48 h-48 rounded-full border-4 border-appColor"
                                        source={image}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                </View>
                            }
                        </View>


                        <View className="flex flex-col justify-center items-center mt-2">
                            <Text className="font-bold text-2xl">Natalija Lukic</Text>
                        </View>
                        


                        <View className="flex flex-col justify-center items-center mt-16">
                            <TouchableOpacity 
                                onPress={() => setIsSuccess(true)}
                                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center w-full">
                                <Text className="text-white font-bold text-lg">Potvrdi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }

                    {isSuccess && 
                        <View>
                            <View className="flex flex-col justify-center items-center mt-10">
                                <Text className="font-bold text-2xl text-center"><Text>Uspešno</Text> kreiran profil radnika</Text>
                                <Text className="text-lg text-center">Sačekaj da te menadžer salona doda i započni svoju karijeru uz <Text className="font-bold text-appColorDark">tiki</Text></Text>

                                <LootieSuccess d={250} />
                            </View>
                        </View>
                    }
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default CreateWorkerAccountModal