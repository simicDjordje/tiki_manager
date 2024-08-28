import { View, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import LootieSuccess from '../Components/LootieAnimations/Success'
import Text from './CustomComponents/CustomText'
import CustomButton from './CustomComponents/CustomButton'
import { useCreateWorkerAccountMutation } from '../redux/apiCore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setJustCreatedWorkerAccount, setUser } from '../redux/generalSlice'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const CreateWorkerAccountModal = ({isModalVisible, setIsModalVisible, userData}) => {
    const [image, setImage] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [validation, setValidation] = useState(false)
    const [createWorkerAccount, {isLoading}] = useCreateWorkerAccountMutation()
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoadingCustom, setIsLoadingCustom] = useState(false)

    const dispatch = useDispatch()

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

    const closeModal = () => {
        setIsLoadingCustom(false)
        setErrorMessage(null)
        setValidation(false)
        setImage(null)
        setIsSuccess(false)
        setIsModalVisible(false)
    }

    const handleConfirm = async () => {
        if(!image){
            setValidation(true)
            return
        }

        setIsLoadingCustom(true)

        try{
            const formData = new FormData()
            formData.append('profile-photo', {
                uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),  // Handle the URI for different platforms
                type: image.mimeType,
                name: image.fileName
            })

            const {error, data} = await createWorkerAccount(formData)

            setValidation(false)

            if(error){
                setErrorMessage('Došlo je do greške')
                return
            }

            if(data.success){
                dispatch(setUser(data.result))
                setIsSuccess(true)
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoadingCustom(false)
        }
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
                        <Text className="text-xl ml-2" bold>Postani deo salona</Text>

                        {!isSuccess && <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity> }
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
                            {image ? <Text>Slika uspešno dodata</Text> : <Text className={`${validation && !image && 'text-red-700'}`}>Dodaj profilnu sliku</Text>}
                        </View>

                        <View className="flex flex-col justify-center items-center w-full mt-2 p-3">
                            {!image && 
                                <View className={`w-44 h-44 border-2 border-dashed ${validation && !image ? 'border-red-500' : 'border-textSecondary'} rounded-full relative flex flex-col justify-center items-center`}>
                                    <Text className={`${validation && !image ? 'text-red-700' : 'text-textMid'}`}>Profilna slika je obavezna</Text>
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
                                        source={image.uri}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                </View>
                            }
                        </View>


                        <View className="flex flex-col justify-center items-center mt-2">
                            <Text className="text-2xl" bold>{userData?.first_name} {userData?.last_name}</Text>
                            <Text className="text-red-700">{errorMessage}</Text>
                        </View>
                        


                        <View className="flex flex-col justify-center items-center mt-14">
                            <CustomButton 
                                onPress={handleConfirm}
                                text={'Potvrdi'}
                                isLoading={isLoading || isLoadingCustom}
                                isSuccess={isSuccess}
                                isError={!!errorMessage}
                            />
                        </View>
                    </View>
                    }

                    {isSuccess && 
                        <View>
                            <View className="flex flex-col justify-center items-center mt-10">
                                <Text className="text-2xl text-center" bold>Uspešno kreiran profil radnika</Text>
                                <Text className="text-lg text-center">Sačekaj da te menadžer salona doda i započni svoju karijeru uz <Text className="text-appColorDark" semi>tiki</Text></Text>

                                <LootieSuccess d={250} />

                                <View className="flex flex-col justify-center items-center mt-14 w-full">
                                    <CustomButton 
                                        onPress={()=> {
                                            dispatch(setJustCreatedWorkerAccount(true))
                                            setIsModalVisible(false)
                                        }}
                                        text={'Nazad na početnu'}
                                    />
                                </View>
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