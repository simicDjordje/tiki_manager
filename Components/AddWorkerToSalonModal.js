import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import CustomInput from './CustomComponents/CustomInput'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useCheckIfToJoinSalonRequestExistsMutation, useCreateToJoinSalonRequestMutation, useDeleteToJoinSalonRequestMutation, useGetUserDataMutation, useSearchForWorkerMutation } from '../redux/apiCore'
import LootieLoader from './LootieAnimations/Loader'
import Animated, { BounceInDown, BounceInUp, FadeInDown } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveWorkerDetails } from '../redux/generalSlice'
import CustomButton from './CustomComponents/CustomButton'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const WorkerItem = React.memo(({ item, index, setSelectedWorker }) => {
    // const bounceInDown = BounceInDown
    // .duration(500) // Duration of the animation
    // .delay(index * 100) // Delay for each item based on index

    const indexPlusOne = Number(index) + 1 
    const fadeInDown = FadeInDown//.delay(indexPlusOne * 100)

    return (
    <Animated.View entering={fadeInDown}>
        <TouchableOpacity
            onPress={() => setSelectedWorker(item)}
            className="w-full h-20 flex flex-row justify-between items-center bg-bgPrimary rounded-xl px-2 mt-5"
        >
            <Image
                className="w-16 h-16 rounded-full border-2 border-textPrimary"
                source={`http://192.168.1.26:5000/photos/profile-photo${item?._id ? item?._id : item}.png`}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />

            <View className="flex-1 px-4">
                <Text className="text-textPrimary" semi>{item?.first_name} {item?.last_name}</Text>
                <Text className="text-textPrimary">{item?.workerDescription || 'Nema opis'}</Text>
            </View>

            <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
        </TouchableOpacity>
    </Animated.View>
)})


const AddWorkerToSalonModal = ({isModalVisible, setIsModalVisible}) => {
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [debouncedSearchText, setDebouncedSearchText] = useState('')
    const [searchForWorker, {isLoading}] = useSearchForWorkerMutation()
    const [workersFound, setWorkersFound] = useState([])
    const [emptyResponse, setEmptyResponse] = useState(false)
    const [getUserData, {isLoading: isGetUserDataLoading}] = useGetUserDataMutation()
    const {activeWorkerDetails, currentSalon: salonData, userData} = useSelector(state => state.general)
    const dispatch = useDispatch()
    const [createToJoinSalonRequest, {isLoading: isCreateToJoinSalonRequestLoading}] = useCreateToJoinSalonRequestMutation()
    const [isRequestSuccess, setIsRequestSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [requestAlreadySent, setRequestAlreadySent] = useState(null)
    const [checkIfToJoinSalonRequestExists, {isLoading: isCheckRequestLoading}] = useCheckIfToJoinSalonRequestExistsMutation()
    const [deleteToJoinSalonRequest, {isLoading: isDeleteRequestLoading}] = useDeleteToJoinSalonRequestMutation()
    const [deletedRequestSuccess, setDeletedRequestSuccess] = useState(false)
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

    useEffect(()=>{
        if(!selectedWorker){
            setRequestAlreadySent(null)
            setIsRequestSuccess(false)
            setErrorMessage('')
            dispatch(setActiveWorkerDetails(null))
            setDeletedRequestSuccess(false)
            setDeleteErrorMessage('')
            return
        }

        try{
            (
                async () => {
                    const {error, data} = await checkIfToJoinSalonRequestExists({
                        recipient: selectedWorker?._id,
                        salonId: salonData?._id,
                        sender: userData?._id
                    })

                    if(error){
                        setRequestAlreadySent(null)
                    }

                    if(data && data.success){
                        setRequestAlreadySent(data.result)
                    }
                }
            )()

            getUserData({userId: selectedWorker?._id})
        }catch(error){
            console.log(error)
        }
    }, [selectedWorker])

    useEffect(() => {
        if(searchText.length <= 3){
            setWorkersFound([])
            return
        }
        const handler = setTimeout(() => {
          setDebouncedSearchText(searchText)
        }, 300) // Adjust the delay as needed (e.g., 300ms)
    
        // Cleanup the timeout if the component is unmounted or if searchText changes
        return () => {
          clearTimeout(handler)
        }
    }, [searchText])

    useEffect(() => {
        if (!debouncedSearchText) return
            
        (async () => {
            const {error, data} = await searchForWorker({search_text: debouncedSearchText})

            if(error){
                console.log(error)
                return
            }

            if(data && data.success){
                setWorkersFound(data?.result)

                if(data?.result.length === 0){
                    setTimeout(()=>{
                        setEmptyResponse(true)
                    }, 300)
                }else{
                    setEmptyResponse(false)
                }
            }
        })()
    }, [debouncedSearchText])


    const handleCreateToJoinRequest = async () => {
        setDeletedRequestSuccess(false)
        setDeleteErrorMessage('')

        try{
            const {error, data} = await createToJoinSalonRequest({
                recipient: selectedWorker?._id,
                salonId: salonData?._id,
                sender: userData?._id
            })

            if(error){
                setErrorMessage('Došlo je do greške')
                return
            }

            if(data && data.success){
                setIsRequestSuccess(true)
                setErrorMessage('')
            }

        }catch(error){
            console.log(error)
        }
    }

    const handleDeleteRequest = async () => {
        if(!requestAlreadySent) return

        setIsRequestSuccess(false)
        setErrorMessage('')

        try{
            (async () => {
                const {error, data} = await deleteToJoinSalonRequest({requestId: requestAlreadySent?._id})

                if(error){
                    setDeleteErrorMessage('Došlo je do greške')
                    return
                }

                if(data && data.success){
                    setDeletedRequestSuccess(true)
                    setDeleteErrorMessage('')

                    setTimeout(()=>{
                        setRequestAlreadySent(null)
                    }, 2700)
                }
            })()
        }catch(error){
            console.log(error)
        }
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const resetModal = () => {
        setSearchText('')
        setDebouncedSearchText('')
        setEmptyResponse(false)
        setWorkersFound([])
        setSelectedWorker(null)
        dispatch(setActiveWorkerDetails(null))
        setIsRequestSuccess(false)
        setErrorMessage('')
        setDeletedRequestSuccess(false)
        setDeleteErrorMessage('')
    }

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
          onModalShow={()=>{
            resetModal()
          }}
          onModalHide={()=>{
            resetModal()
          }}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className={`${selectedWorker ? 'h-5/6' : 'h-5/6'} w-full`}>
                <View 
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        {!selectedWorker && <Text className="text-xl ml-2" bold>Dodaj novog člana</Text>}
                        {selectedWorker && 
                            <TouchableOpacity onPress={() => setSelectedWorker(null)}>
                                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
                            </TouchableOpacity>
                        }

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    {selectedWorker && 
                        <View className="mt-4">
                            {(!activeWorkerDetails || isGetUserDataLoading || isCheckRequestLoading) && 
                                <View className="h-5/6 flex flex-col justify-center items-center">
                                    <LootieLoader dark={true} d={70} />
                                </View>
                            }

                            {activeWorkerDetails && !isGetUserDataLoading && !isCheckRequestLoading &&
                                <View className="h-full">
                                    <View className="flex flex-row justify-center items-center mt-10">
                                        <Image
                                            className="w-36 h-36 rounded-full border-2 border-textPrimary"
                                            source={`http://192.168.1.26:5000/photos/profile-photo${activeWorkerDetails?._id}.png`}
                                            placeholder={{ blurhash }}
                                            contentFit="cover"
                                            transition={1000}
                                        />
                                    </View>
                                    <View className="flex flex-col justify-center items-center">
                                        <Text className="text-xl mt-5 text-textPrimary" bold>{activeWorkerDetails?.first_name} {activeWorkerDetails?.last_name}</Text>
                                        <Text className="text-lg text-textMid text-center">{activeWorkerDetails?.description || 'Nema opis'}</Text>
                                    </View>

                                    {!requestAlreadySent && 
                                        <View className="flex flex-col justify-center items-center mt-8">
                                            <Text className="text-md text-textMid text-center">
                                                Pošalji korisniku zahtev za pridruživanje salonu
                                            </Text>
                                            <Text className="text-md text-textMid text-center">
                                                Kada korisnik prihvati zahtev, postaćete član tima
                                            </Text>
                                        </View>
                                    }

                                    {requestAlreadySent && 
                                        <View className="flex flex-col justify-center items-center mt-8">
                                            <Text className="text-md text-textMid text-center">
                                                Zahtev za pridruživanje je već poslat
                                            </Text>
                                            <Text className="text-md text-textMid text-center">
                                                Obavestićemo te čim dođe do promena
                                            </Text>
                                        </View>
                                    }

                                    <View className="flex flex-row justify-center items-center mt-16 h-8">
                                        <Text className="text-red-500" semi>{errorMessage}</Text>
                                        <Text className="text-red-500" semi>{deleteErrorMessage}</Text>
                                        {isRequestSuccess && <Text className="text-textPrimary" semi>Zahtev uspešno poslat!</Text>}
                                        {deletedRequestSuccess && <Text className="text-textPrimary" semi>Zahtev obrisan!</Text>}
                                    </View>

                                    <View className="mt-12">

                                        {requestAlreadySent && 
                                            <CustomButton 
                                                text={'Poništi zahtev'}
                                                onPress={handleDeleteRequest}
                                                isLoading={isDeleteRequestLoading}
                                                isSuccess={deletedRequestSuccess}
                                                isError={!!deleteErrorMessage}
                                            />
                                        }
                                        
                                        {!requestAlreadySent && 
                                            <CustomButton 
                                                text={'Pošalji zahtev'}
                                                onPress={handleCreateToJoinRequest}
                                                isLoading={isCreateToJoinSalonRequestLoading}
                                                isSuccess={isRequestSuccess}
                                                isError={!!errorMessage}
                                            />
                                        }
                                    </View>
                                </View>
                            }
                        </View>
                    }

                    {!selectedWorker && 
                    <View className="h-full">
                        <View className="mt-4">
                            <CustomInput 
                                label={'Pretraga'}
                                placeholder='Pretraži po imenu i prezimenu'
                                inputIcon={()=>(<FontAwesome name="search" size={24} color="black" />)}
                                iconSide='right'
                                value={searchText}
                                onChangeText={text => setSearchText(text)}
                            />
                        </View>
                    
                        {isLoading && workersFound.length === 0 &&
                            <View className="w-full flex flex-col justify-center items-center mt-28">
                                <LootieLoader dark={true} d={70} />
                            </View>
                        }

                        {!isLoading && workersFound.length === 0 && emptyResponse && debouncedSearchText && 
                            <View className="w-full flex flex-col justify-center items-center mt-20">
                                <Text semi>Nismo pronašli nijednog <Text bold>tiki</Text> člana sa ovim imenom</Text>
                            </View>
                        }

                    
                        <View className="h-full">
                            <FlatList
                                data={isLoading || !searchText ? [] : workersFound}
                                keyExtractor={(item) => item?._id.toString()}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 0 }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <WorkerItem 
                                            item={item} 
                                            index={index} 
                                            setSelectedWorker={setSelectedWorker} 
                                        />
                                    )
                                }}
                            /> 
                        </View>
                    
                    
                    </View>}
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default AddWorkerToSalonModal