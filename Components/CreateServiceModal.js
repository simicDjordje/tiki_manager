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
import { useCreateServiceMutation, useGetSalonByIdMutation } from '../redux/apiCore'
import AntDesign from '@expo/vector-icons/AntDesign';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const CreateServiceModal = ({isModalVisible, setIsModalVisible}) => {
    const {currentSalon: salonData, activeCategory} = useSelector(state => state.general)
    const [createService, {isLoading}] = useCreateServiceMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [inputsData, setInptsData] = useState({
      name: '',
      description: '',
      price: ''
    })
    const [validation, setValidation] = useState(false)
    const [getSalonById] = useGetSalonByIdMutation()
    const [workers, setWorkers] = useState([])

    const handleCreate = async () => {
        if(!inputsData.name || !inputsData.description || !inputsData.price){
            setValidation(true)
            return
        }

        try{
            const {error, data} = await createService({...inputsData, categoryId: activeCategory?._id, salonId: salonData?._id, workers})

            if(error){
                if(error?.data?.message === 'Service with this name already exists in the selected category'){
                    setErrorMessage('Već postoji usluga sa ovim imenom')
                }else{
                    setErrorMessage('Došlo je do greške')
                }
            }

            if(data && data.success){
                setIsSuccess(true)
                getSalonById({salonId: salonData?._id})

                setTimeout(()=>{
                    setIsModalVisible(false)
                }, 2700)
            }

        }catch(error){
            console.log(error)
        }
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setIsSuccess(false)
    }

    const addWorkerToArray = (workerId) => {
        setWorkers((prevWorkers) => {
            if (prevWorkers.includes(workerId)) {
                return prevWorkers.filter((id) => id !== workerId)
            } else {
                return [...prevWorkers, workerId]
            }
        })
    }


    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
          onModalHide={()=>{
            setIsSuccess(false)
            setInptsData({
                name: '',
                description: '',
                price: ''
              })
            setErrorMessage('')
          }}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className="w-full" style={{height: '92%'}}>
                <View 
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Kreiranje nove usluge</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    <View className="h-5/6 flex flex-col justify-between">
                        <View className="flex-1">
                            <CustomInput 
                                label={'Naziv usluge'}
                                placeholder={'Unesi naziv usluge'}
                                classNameCustom="mt-4"
                                value={inputsData.name}
                                onChangeText={text => setInptsData({...inputsData, name: text})}
                                isError={validation && !inputsData.name}
                                errorMessage={'obavezno'}
                            />

                            <CustomInput 
                                label={'Opis usluge'}
                                placeholder={'Unesi kratak opis usluge'}
                                classNameCustom='mt-3'
                                value={inputsData.description}
                                onChangeText={text => setInptsData({...inputsData, description: text})}
                                isError={validation && !inputsData.description}
                                errorMessage={'obavezno'}
                            />

                            <CustomInput 
                                keyboardType="numeric"
                                label={'Cena usluge'}
                                placeholder={'Unesi cenu usluge'}
                                classNameCustom='mt-3'
                                inputIcon={()=>(
                                    <View className="border-textSecondary flex flex-row justify-center items-center h-full" style={{borderLeftWidth: 0.5}}>
                                        <Text className="text-textMid ml-1">RSD</Text>
                                    </View>
                                )}
                                iconSide='right'
                                value={inputsData.price}
                                onChangeText={text => setInptsData({...inputsData, price: text})}
                                isError={validation && !inputsData.price}
                                errorMessage={'obavezno'}
                            />

                            {salonData?.workers.length > 0 &&
                                <View className="flex flex-row justify-between items-center mt-8">
                                    <View>
                                        <Text className={`text-md`} semi>Možeš odmah dodeliti uslugu članovima</Text>
                                        <Text className={`mb-1 text-md text-textMid`} semi>ili kasnije u podešavanjima usluge</Text>
                                    </View>

                                    <View className="w-7 h-7 rounded-full bg-appColor flex flex-row justify-center items-center">
                                        <Text className="text-white" semi>{workers.length}</Text>
                                    </View>
                                </View>
                            }

                           

                            {salonData?.workers.length > 0 && <ScrollView 
                                className="mb-2 -mr-10"
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft: 5,
                                    paddingVertical: 20
                            }}>
                                {salonData?.workers.map((worker, index) => {
                                    return (
                                        <TouchableOpacity onPress={()=>{addWorkerToArray(worker?._id)}} key={index} className="flex flex-col justify-start items-center ml-2 relative">
                                            {workers.includes(worker?._id) && 
                                                <View className="absolute z-10 rounded-full bg-white top-0 right-0">
                                                    <AntDesign name="checkcircle" size={18} color="#5f9ea0" />
                                                </View>
                                            }
                                            <Image
                                                className={`rounded-full border-4 ${workers.includes(worker?._id) ? 'border-appColor' : 'border-transparent'}`}
                                                source={`http://192.168.1.5:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
                                                placeholder={{ blurhash }}
                                                contentFit="cover"
                                                transition={1000}
                                                style={{width: 68, height: 68}}
                                            />

                                            <Text className="text-xs mt-2 text-appColorDark" semi>{worker?.first_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                                
                            </ScrollView>}
                        </View>
                        

                        <View className="flex flex-row justify-center items-center h-6 mb-4">
                            <Text className="text-red-700">{errorMessage}</Text>
                        </View>

                        <View className="flex flex-col justify-center items-center">
                            <CustomButton 
                                onPress={handleCreate}
                                text={'Potvrdi'}
                                isSuccess={isSuccess}
                                isLoading={isLoading}
                                isError={!!errorMessage}
                            />
                        </View>
                    </View>
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default CreateServiceModal



  // const [durations, setDurations] = useState([
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