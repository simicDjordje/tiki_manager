import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeInDown } from 'react-native-reanimated'
// import LootieTwoPeople from './LootieAnimations/TwoPeople'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ServiceWorkersModal = ({isModalVisible, setIsModalVisible, workers, setWorkers}) => {
    const {currentSalon: salonData, activeCategory, activeService} = useSelector(state => state.general)
    const navigation = useNavigation()

    useEffect(()=>{
        if(activeService?.users.length === 0) return
        const workersArray = activeService?.users?.map(worker => worker?._id)

        setWorkers(workersArray)
    }, [activeService])

    const handleToWorkersScreen = () => {
        setIsModalVisible(false)
        navigation.navigate('StackTabScreens', {screen: 'SalonWorkersScreen'})    
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const handleWorker = (worker) => {
        const workerId = worker?._id

        setWorkers((prev) => {
            if (prev.some(id => id === workerId)) {
                // If the worker is already in the array, remove them
                return prev.filter(id => id !== workerId);
            } else {
                // If the worker is not in the array, add them
                return [...prev, workerId];
            }
        });
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
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Dodeli ili ukloni uslugu</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>

                    {salonData?.workers?.length === 0 && 
                        <View className="mt-20">
                            <Text className="text-center text-textPrimary text-lg" bold>Tvoj salon još uvek nema članova.</Text>
                            <Text className="text-center text-textMid">Dodaj članove u podešavanjima salona i ovde im dodeli uslugu.</Text>

                            <View className="flex flex-col justify-center items-center mt-10">
                                <Text className="text-lg mb-3" bold>Dodaj novog člana</Text>
                                <TouchableOpacity onPress={handleToWorkersScreen} className="p-4 bg-textPrimary rounded-full">
                                    <Entypo name="plus" size={64} color="white" />
                                </TouchableOpacity>
                            </View>
                            {/* <View>
                                <LootieTwoPeople d={100} />
                            </View> */}
                        </View>
                    }

                    {salonData?.workers?.length > 0 && 
                    <ScrollView>
                        <View className="min-h-full">
                            <View className="flex flex-col justify-center items-center mt-4">
                                <Text className="text-center text-textMid" bold>
                                    Označi članove kojima želiš da dodeliš ovu uslugu
                                </Text>
                            </View>

                            <View className="mt-16">
                                {salonData?.workers?.map((worker, index) => {
                                    //activeService?.users.length
                                    return (
                                        <Animated.View key={worker?._id} entering={FadeInDown}>
                                            <TouchableOpacity 
                                                onPress={() => handleWorker(worker)}
                                                className="w-full h-20 mb-5 flex flex-row justify-between items-center bg-bgPrimary rounded-xl px-2"
                                                >
                                                <Image
                                                    className="w-16 h-16 rounded-full"
                                                    source={`http://192.168.0.72:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
                                                    placeholder={{ blurhash }}
                                                    contentFit="cover"
                                                    transition={1000}
                                                />

                                                <View className="flex-1 px-4">
                                                    <Text semi>{worker?.first_name} {worker?.last_name}</Text>
                                                    <Text>{worker?.description || ''}</Text>
                                                </View>

                                                <AntDesign name={workers.includes(worker?._id) ? 'checksquare' : 'checksquareo'} size={24} color={workers.includes(worker?._id) ? '#5F9EA0' : '#232323'} />
                                            </TouchableOpacity>
                                        </Animated.View>
                                    )
                                })}
                            </View>

                            <View className="mb-12"></View>
                        </View>
                    </ScrollView>}
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default ServiceWorkersModal