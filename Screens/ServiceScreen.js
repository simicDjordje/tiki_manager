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
import { useDeleteServiceMutation, useGetSalonByIdMutation, useRejectMultipleReservationMutation, useUpdateServiceMutation } from '../redux/apiCore'
import CustomButton from '../Components/CustomComponents/CustomButton'
import UnsavedChangesModal from '../Components/UnsavedChangesModal'
import DismissKeyboardWrapper from '../Components/DismissKeyboardWrapper'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ConfirmActionModal from '../Components/ConfirmActionModal'
import DeleteCategoryServicesHasReservationsModal from '../Components/DeleteCategoryServicesHasReservationsModal'


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
  const [originalWorkers, setOriginalWorkers] = useState(activeService?.users || [])
  const [validation, setValidation] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [shouldLeaveOnScreen, setShouldLeaveOnScreen] = useState(true)
  const [isUnsavedChangesModalVisible, setIsUnsavedChangesModalVisible] = useState(false)
  const navigation = useNavigation()

  const [confirmModal, setConfirmModal] = useState(false)
  const [deleteService, {isLoading: isDeletingService}] = useDeleteServiceMutation()
  const [rejectMultipleReservation, {isLoading: isRejectingMultipleReservation}] = useRejectMultipleReservationMutation()
  const [deletingErrorMessage, setDeletingErrorMessage] = useState('')
  const [deletingSuccess, setDeletingSuccess] = useState(false)
  const [hasReservations, setHasReservation] = useState([])
  const [hasReservationsModal, setHasReservationsModal] = useState(false)
  const [allReservations, setAllReservations] = useState({})


  const beginDeleteService = () => {
    setConfirmModal(true)
  }

  const handleRejectMultiple = async (reservationsAttr) => {
    if(!reservationsAttr.length) return true

    try{
        let reservationIds 

        if(reservationsAttr){
            reservationIds = reservationsAttr.map(i => i?._id)
        }

        const {error, data} = await rejectMultipleReservation({reservationIds})

        if(error){
            return false
        }
        
        if(data && data.success){
            if(data.message === 'Reservations rejected successfully'){
                return true
            }
        }

    }catch(error){
        console.log(error)
    }
}

  const handleDeleteService = async () => {
    if(!activeCategory?._id) return

    try{
        const {error, data} = await deleteService({serviceId: activeService?._id})

        if(error){
            console.log(error)
            setDeletingErrorMessage('Došlo je do greške')
            setDeletingSuccess(false)
            return
        }

        if(data && data.success){
            setDeletingErrorMessage('')

            if(data.message === 'Service deleted successfully.'){
                const rejectedOnlyPending = await handleRejectMultiple(data.result)

                if(rejectedOnlyPending){
                  setDeletingSuccess(true)
                  getSalonById({salonId: salonData?._id})

                  setTimeout(() => {
                      setDeletingSuccess(false)
                      setConfirmModal(false)
                      navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
                  }, 2000)
                }
                return
            }


            if(data.message === 'Service has related reservations with status accepted.'){
                setDeletingSuccess(false)
                setDeletingErrorMessage('')

                setConfirmModal(false)
                setAllReservations(data?.result)
                setHasReservation(data?.result.accepted)
                setHasReservationsModal(true)
                return
            }

            
        }

    }catch(error){
        console.log(error)
    }
  }

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

//   useEffect(() => navigation.addListener('beforeRemove', (e) => {
//     console.log(shouldLeaveOnScreen)
//     if (shouldLeaveOnScreen || isSuccess) {
//       // If we don't have unsaved changes, then we don't need to do anything
//       return;
//     }

//     // Prevent default behavior of leaving the screen
//     e.preventDefault();

//     // Prompt the user before leaving the screen
//     setIsUnsavedChangesModalVisible(true)
//   }),
// [navigation, shouldLeaveOnScreen, isSuccess]
// );

  const handleBack = () => {
    if(!shouldLeaveOnScreen && !isSuccess){
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


  const handleConfirm = async () => {
    if(!activeService?._id) return

    try{

        const customArray = [...allReservations.accepted, ...allReservations.pending]

        const rejectedAll = await handleRejectMultiple(customArray)

        if(!rejectedAll) return

        const {error, data} = await deleteService({serviceId: activeService?._id})

        if(error){
            setDeletingErrorMessage('Došlo je do greške')
            setDeletingSuccess(false)
            return
        }

        if(data && data.success){
            setDeletingErrorMessage('')
            setDeletingSuccess(true)



            getSalonById({salonId: salonData?._id})

            setTimeout(() => {
                setDeletingSuccess(false)
                setConfirmModal(false)
                setHasReservationsModal(false)

                navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
            }, 1500)
            return            
        }

    }catch(error){
        console.log(error)
    }
  }
  
  return (
    <DismissKeyboardWrapper>
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
            <View className="flex flex-row justify-between items-center mt-6 w-full">
                <View>
                    <Text className="text-2xl" bold>{activeService?.name}</Text>
                    <Text semi>{activeCategory?.name}</Text>
                </View>
                <TouchableOpacity onPress={beginDeleteService} className="w-12 h-12 bg-bgPrimary rounded-full flex flex-row justify-center items-center ml-2">
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableOpacity>
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
                        maxLength={60}
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
                                                source={`http://192.168.1.14:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
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
                            variant={'dark'}
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

        <ConfirmActionModal 
            isModalVisible={confirmModal}
            setIsModalVisible={setConfirmModal}
            title={'Brisanje usluge'}
            question={`Da li sigurno želiš da obrišeš ovu uslugu?`}
            handleConfirm={handleDeleteService}
            isSuccess={deletingSuccess}
            isLoading={isDeletingService}
            isError={!!deletingErrorMessage}
            setIsError={setDeletingErrorMessage}
            setIsSuccess={setDeletingSuccess}
        />

        <DeleteCategoryServicesHasReservationsModal 
            isModalVisible={hasReservationsModal}
            setIsModalVisible={setHasReservationsModal}
            existingReservations={hasReservations}
            isRejecting={isRejectingMultipleReservation || isDeletingService}
            isSuccess={deletingSuccess}
            handleConfirm={handleConfirm}
            isService
        />
          </View>
        </View>
    </SafeAreaView>
    </DismissKeyboardWrapper>
  )
}

export default ServiceScreen