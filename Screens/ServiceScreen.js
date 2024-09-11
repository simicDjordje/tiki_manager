import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Text from '../Components/CustomComponents/CustomText'
import CustomInput from '../Components/CustomComponents/CustomInput'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import ServiceWorkersModal from '../Components/ServiceWorkersModal'
import { useSelector } from 'react-redux'
import { useGetSalonByIdMutation, useUpdateServiceMutation } from '../redux/apiCore'
import CustomButton from '../Components/CustomComponents/CustomButton'
import UnsavedChangesModal from '../Components/UnsavedChangesModal'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ServiceScreen = () => {
  const [isServiceWorkerModalVisible, setIsServiceWorkerModalVisible] = useState(false)
  const {currentSalon: salonData, activeCategory, activeService} = useSelector(state => state.general)
  const [updateService, {isLoading}] = useUpdateServiceMutation()
  const [getSalonById] = useGetSalonByIdMutation()
  const [inputsData, setInputsData] = useState({
    name: activeService?.name || '',
    description: activeService?.description || '',
    price: activeService?.price || ''
  })
  const [originalInputsData, setOriginalInputsData] = useState({
    name: activeService?.name || '',
    description: activeService?.description || '',
    price: activeService?.price || ''
  })
  const [workers, setWorkers] = useState(activeService?.users || [])
  console.log('kurac: ', activeService?.users)
  const [originalWorkers, setOriginalWorkers] = useState(activeService?.users || [])
  const [validation, setValidation] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [shouldLeaveOnScreen, setShouldLeaveOnScreen] = useState(true)
  const [isUnsavedChangesModalVisible, setIsUnsavedChangesModalVisible] = useState(false)
  const navigation = useNavigation()

  const compareWorkerArrays = useCallback(() => {
    // Check if the lengths are different
    if (workers.length !== originalWorkers.length) {
      return false;
    }
  
    // Create sets of worker IDs for easy comparison
    const workerSet = new Set(workers.map(worker => worker));
    const originalWorkerSet = new Set(originalWorkers.map(worker => worker?._id));
  
    // Check if every ID in workers is in originalWorkers and vice versa
    for (let workerId of workerSet) {
      if (!originalWorkerSet.has(workerId)) {
        return false;
      }
    }
  
    for (let workerId of originalWorkerSet) {
      if (!workerSet.has(workerId)) {
        return false;
      }
    }
  
    // If no differences are found
    return true;
  },[workers, originalWorkers])

  useEffect(()=>{
    const areWorkersSame = compareWorkerArrays()

    if(
        inputsData.name != originalInputsData?.name 
        || inputsData?.description != originalInputsData?.description 
        || inputsData?.price != originalInputsData?.price
        || !areWorkersSame
    ){
        setShouldLeaveOnScreen(false)
    }else{
        setShouldLeaveOnScreen(true)
    }
    

  }, [inputsData, originalInputsData, workers, originalWorkers])

  useEffect(() => {
    if(isUnsavedChangesModalVisible && shouldLeaveOnScreen){
      navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
      return
    }

  }, [shouldLeaveOnScreen, isUnsavedChangesModalVisible])

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    console.log(shouldLeaveOnScreen)
    if (shouldLeaveOnScreen || isSuccess) {
      // If we don't have unsaved changes, then we don't need to do anything
      return;
    }

    // Prevent default behavior of leaving the screen
    e.preventDefault();

    // Prompt the user before leaving the screen
    setIsUnsavedChangesModalVisible(true)
  }),
[navigation, shouldLeaveOnScreen, isSuccess]
);

  const handleBack = () => {
    if(!shouldLeaveOnScreen){
      // Prompt the user before leaving the screen
      setIsUnsavedChangesModalVisible(true)
      return
    }
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
  }

  const handleUpdate = async () => {
    if(!inputsData?.name || !inputsData.description || !inputsData.price){
        setValidation(true)
        return
    }

    try{
        const {error, data} = await updateService({
          serviceId: activeService?._id, 
          ...inputsData, 
          users: workers
        })

        if(error){
            setErrorMessage('Došlo je do greške')
            return
        }

        if(data && data.success){
            setIsSuccess(true)
            getSalonById({salonId: salonData?._id})

            setTimeout(()=>{setIsSuccess(false)}, 4000)
        }
    }catch(error){
        console.log(error)
    }
  }

  
  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgSecondary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonData?.name.length > 34 ? `${salonData?.name.substring(0, 34)}...` : salonData?.name}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="flex flex-row justify-start items-center mt-6 w-full">
                <View>
                    <Text className="text-2xl" bold>{activeService?.name}</Text>
                    <Text semi>{activeCategory?.name}</Text>
                </View>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-4" style={{height: 0.5}}></View>

            {/* <ScrollView> */}
            <View>
                <View className="min-h-screen">
                    <CustomInput 
                        label={'Naziv usluge'}
                        placeholder={'Unesi naziv usluge'}
                        value={inputsData?.name}
                        onChangeText={text => setInputsData({...inputsData, name: text})}
                    />

                    <CustomInput 
                        label={'Opis usluge'}
                        placeholder={'Unesi kratak opis usluge'}
                        multiline={true}
                        numberOfLines={1}
                        classNameCustom='mt-4'
                        value={inputsData?.description}
                        onChangeText={text => setInputsData({...inputsData, description: text})}
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
                        value={String(inputsData?.price)}
                        onChangeText={text => setInputsData({...inputsData, price: text})}
                    />
                    
                    <Text className={`mb-1 text-md mt-4`} semi>Članovi sa ovom uslugom</Text>
                    <TouchableOpacity 
                        onPress={() => setIsServiceWorkerModalVisible(true)}
                        className="w-full h-16 border-textSecondary flex flex-row justify-between items-center rounded-xl border p-2">
                        <View className="flex-1">
                            {workers.length === 0 && <Text className="text-red-700" semi>Usluga nije dodeljena nijednom članu</Text>}
                            {workers.length > 0 && 
                                <View className="flex flex-row justify-start items-center">
                                    {workers?.slice(0, 10).map((worker) => {
                                      
                                        return (
                                            <Image
                                                key={worker?._id ? worker?._id : worker}
                                                className="w-8 h-8 rounded-full border-2 border-appColorDark -ml-1"
                                                source={`http://192.168.1.28:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
                                                placeholder={{ blurhash }}
                                                contentFit="cover"
                                                transition={1000}
                                            />
                                        )
                                    })}

                                    {workers?.length > 10 && 
                                        <View className="w-8 h-8 rounded-full border-2 border-textMid bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                            <Text className="text-white">+{workers.length - 10}</Text>
                                        </View>
                                    }
                                </View>
                            }
                        </View>
                        <View>
                            {workers.length === 0 && <Entypo name="plus" size={24} color="#232323" />}
                            {workers.length > 0 && <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />}
                        </View>
                    </TouchableOpacity>

                    <View className="flex flex-row justify-center items-center mt-4 -mb-3 h-6">
                            <Text className="text-red-700">{errorMessage}</Text>
                    </View>
                    <View className="mt-16"> 
                        <CustomButton 
                            onPress={handleUpdate}
                            text={'Sačuvaj'}
                            isLoading={isLoading}
                            isError={!!errorMessage}
                            isSuccess={isSuccess}
                            
                        />
                    </View>
                </View>
                <View className="mb-16"></View>
            {/* </ScrollView> */}
            </View>
            <ServiceWorkersModal 
                isModalVisible={isServiceWorkerModalVisible}
                setIsModalVisible={setIsServiceWorkerModalVisible}
                workers={workers}
                setWorkers={setWorkers}
            />

        <UnsavedChangesModal 
            isModalVisible={isUnsavedChangesModalVisible}
            setIsModalVisible={setIsUnsavedChangesModalVisible}
            handleConfirm={() => {
              navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
            }}
          />   
          </View>
        </View>
    </SafeAreaView>
  )
}

export default ServiceScreen