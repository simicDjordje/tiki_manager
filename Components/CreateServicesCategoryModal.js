import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import CustomInput from './CustomComponents/CustomInput'
import CustomButton from './CustomComponents/CustomButton'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const CreateServicesCategoryModal = ({
    isModalVisible, 
    setIsModalVisible, 
    handleAddCategory, 
    name, 
    setName, 
    isSuccess,
    setIsSuccess, 
    isLoading,
    errorMessage,
    setErrorMessage,
}) => {

    const [validation, setValidation] = useState(false)

    const closeModal = () => {
        setIsModalVisible(false)
    }

    useEffect(()=>{
        if(!isSuccess) return

        setTimeout(()=>{
            setIsModalVisible(false)
        }, 3000)
    }, [isSuccess])

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
          onModalHide={()=>{
            setValidation(false)
            setName('')
            setErrorMessage('')
            setIsSuccess(false)
          }}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
                <View 
                    className="h-4/6 w-full bg-bgSecondary px-4 flex flex-col justify-between"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="mt-6">
                        <View className="flex flex-row justify-between items-center w-full">
                            <Text className="text-xl ml-2" bold>Kreiranje kategorije usluga</Text>

                            <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                                <Ionicons name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    </View>

                    <View className="flex flex-col justify-between flex-1 pb-4">
                        <CustomInput 
                            label={'Naziv kategorije'}
                            placeholder={'Primer: Trepavice'}
                            classNameCustom="mt-4"
                            errorMessage={'obavezno'}
                            isError={validation}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        
                        <View className="flex flex-row justify-center items-center h-5">
                            <Text className="text-red-500">{errorMessage}</Text>
                        </View>

                        <View className="mb-3">
                            <CustomButton 
                                onPress={name ? handleAddCategory : () => {setValidation(true)}}
                                text={'Potvrdi'}
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
  
  export default CreateServicesCategoryModal




//   const [durations, setDurations] = useState([
//     { value: 900, label: '15min' },       // 15 minutes
//     { value: 1800, label: '30min' },      // 30 minutes
//     { value: 3600, label: '1h' },         // 1 hour
//     { value: 5400, label: '1h 30min' },   // 1 hour 30 minutes
//     { value: 7200, label: '2h' },         // 2 hours
//     { value: 9000, label: '2h 30min' },   // 2 hours 30 minutes
//     { value: 10800, label: '3h' },        // 3 hours
//     { value: 12600, label: '3h 30min' },  // 3 hours 30 minutes
//     { value: 14400, label: '4h' },        // 4 hours
//     { value: 16200, label: '4h 30min' },  // 4 hours 30 minutes
//     { value: 18000, label: '5h' },        // 5 hours
//     { value: 21600, label: '6h' },        // 6 hours
//     { value: 25200, label: '7h' },        // 7 hours
//     { value: 28800, label: '8h' },        // 8 hours
//     { value: 32400, label: '9h' },        // 9 hours
//     { value: 36000, label: '10h' }        // 10 hours
// ])