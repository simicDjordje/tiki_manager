import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import CustomInput from './CustomComponents/CustomInput'
import CustomButton from './CustomComponents/CustomButton'
import { useSelector } from 'react-redux'
import { useGetSalonByIdMutation, useUpdateSalonMutation } from '../redux/apiCore'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const AddYourselfInSalonModal = ({isModalVisible, setIsModalVisible, }) => {
    const {userData, currentSalon: salonData} = useSelector(state => state.general)
    const [updateSalon, {isLoading}] = useUpdateSalonMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [getSalonById] = useGetSalonByIdMutation()

    const closeModal = () => {
        setIsModalVisible(false)
    }

    useEffect(()=>{
        if(!isSuccess) return

        setTimeout(()=>{
            setIsModalVisible(false)
        }, 3000)
    }, [isSuccess])

    const handeAddYourself = async () => {
        try{
            const {error, data} = await updateSalon({salonId: salonData?._id, workers: [userData?._id]})
            if(error){
                setErrorMessage('Došlo je do greške')
            }
    
            if(data && data.success){
                setIsSuccess(true)
                getSalonById({salonId: salonData?._id})
            }
        }catch(error){
            console.log(error)
        }
      }

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
          onModalHide={()=>{
            setErrorMessage('')
            setIsSuccess(false)
          }}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
                <View 
                    className="h-3/6 w-full bg-bgSecondary px-4 flex flex-col justify-between"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="mt-6">
                        <View className="flex flex-row justify-between items-center w-full">
                            <Text className="text-xl ml-2" bold>Postani član svog salona</Text>

                            <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                                <Ionicons name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    </View>
                    
                    <View className="flex flex-col justify-center items-center mt-8">
                        <Image
                            className="w-28 h-28 rounded-full border-2 border-appColorDark"
                            source={`http://192.168.1.14:5000/photos/profile-photo${userData?._id}.png`}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Text className="text-lg text-textPrimary" bold>{userData?.first_name} {userData?.last_name}</Text>
                        <Text className="text-textMid" bold>{userData?.workerDescription || ''}</Text>
                    </View>

                    <View className="flex flex-col justify-between flex-1 pb-4">
                        <View className="flex flex-row justify-center items-center h-5">
                            <Text className="text-red-700">{errorMessage}</Text>
                        </View>

                        <View className="mb-3">
                            <CustomButton 
                                onPress={handeAddYourself}
                                text={'Dodaj'}
                                isSuccess={isSuccess}
                                isLoading={isLoading}
                                isError={!!errorMessage}
                            />
                        </View>
                    </View>
                </View>
          </View>
      </Modal>
    )
  }
  
  export default AddYourselfInSalonModal




