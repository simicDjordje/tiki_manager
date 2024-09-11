import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CreateServicesCategoryModal from '../Components/CreateServicesCategoryModal'
import AddWorkerToSalonModal from '../Components/AddWorkerToSalonModal'
import CustomInput from '../Components/CustomComponents/CustomInput'
import SalonWorkerDetailsModal from '../Components/SalonWorkerDetailsModal'
import { useSelector } from 'react-redux'
import CreateWorkerAccountModal from '../Components/CreateWorkerAccountModal'
import { useGetUserDataMutation, useUpdateSalonMutation } from '../redux/apiCore'
import AddYourselfInSalonModal from '../Components/AddYourselfInSalonModal'
import Animated, { FadeInDown } from 'react-native-reanimated'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonWorkersScreen = ({navigation}) => {
  const {userData, currentSalon: salonData} = useSelector(state => state.general)
  const [sortedWorkers, setSortedWorkers] = useState([])
  const [workers, setWorkers] = useState([])
  const [isAddWorkerToSalonModalVisible, setIsAddWorkerToSalonModalVisible] = useState(false)
  const [isSalonWorkerDetailsModalVisible, setIsSalonWorkerDetailsModalVisible] = useState(false)
  const [isCreateWorkerAccountModalVisible, setIsCreateWorkerAccountModalVisible] = useState(false)
  const [isAddYourselfModalVisible, setIsAddYourselfModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [updateSalon, {isLoading: isUpdateSalonLoading}] = useUpdateSalonMutation()
  const [errorMessage, setErrorMessage] = useState('')

  const [getUserData] = useGetUserDataMutation()

  useFocusEffect(useCallback(() => {
    try{
        if (salonData?.workers) {
            const sortedWorkersArray = [...salonData.workers];
            const currentUserIndex = sortedWorkersArray.findIndex(worker => worker._id === userData?._id);
    
            if (currentUserIndex > -1) {
                const [currentUser] = sortedWorkersArray.splice(currentUserIndex, 1);
                sortedWorkersArray.unshift(currentUser);
            }
    
            // Only update the state if the sorted workers array has changed
            if (JSON.stringify(sortedWorkersArray) !== JSON.stringify(sortedWorkers)) {
                setSortedWorkers(sortedWorkersArray);
            }
        }
    }catch(error){
        console.log(error)
    }finally{
        setIsLoading(false)
    }
}, [salonData?.workers, userData]))

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const seeWorkerDetails = (workerId) => {
    getUserData({userId: workerId})

    setIsSalonWorkerDetailsModalVisible(true)
  }

  const beginAddWorker = () => {
    setIsAddWorkerToSalonModalVisible(true)
  }

  const handeAddYourself = () => {
    setIsAddYourselfModalVisible(true)
  }


  const handleCreateYourWorkerAccount = () => {
     setIsCreateWorkerAccountModalVisible(true)
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
            <View className="w-full flex flex-row justify-between items-center mt-6">
                <View>
                  <Text className="text-2xl" bold>Članovi salona</Text>
                </View>
                <TouchableOpacity onPress={beginAddWorker} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            {!isLoading && <View className="w-full">
            {sortedWorkers.length === 0 && <View>
                <Text className="text-center text-textPrimary" bold>Dodaj članove salona</Text>
                <Text className="text-center text-textMid">Dodeli članovima salona usluge kako bi mogli da primaju rezervacije</Text>
                <Text className="text-center text-textMid">Član salona će sam kreirati svoje slobodne termine</Text>
            </View>}

            <View className="flex-1 w-full mb-3 mt-10">
                {sortedWorkers.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg mb-3" bold>Dodaj novog člana</Text>
                        <TouchableOpacity onPress={beginAddWorker} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
                
                {sortedWorkers.length === 0  && 
                    <View className="px-12">
                        <View className="bg-textSecondary mt-5 w-full" style={{height: 0.5}}></View>
                    </View>
                }

                {sortedWorkers.length === 0 &&  
                    <View className="flex flex-col justify-center items-center mt-5">
                        <Text className="text-center text-textPrimary" bold>Radiš u svom salonu?</Text>
                        <Text className="text-center text-textMid" bold>Dodaj sebe kao člana</Text>

                        <View className="w-full flex flex-row justify-center items-center mt-8">
                            {userData.haveWorkerAccount &&
                                <Image
                                    className="w-20 h-20 rounded-full border-2 border-appColorDark"
                                    source={`http://192.168.1.28:5000/photos/profile-photo${userData?._id}.png`}
                                    placeholder={{ blurhash }}
                                    contentFit="cover"
                                    transition={1000}
                                />
                            }
                            <TouchableOpacity onPress={userData?.haveWorkerAccount ? handeAddYourself : handleCreateYourWorkerAccount} className={`p-4 bg-textPrimary rounded-full ${userData?.haveWorkerAccount && '-ml-3'}`}>
                                <Entypo name="plus" size={48} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {/* {sortedWorkers.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-5">
                        <Text className="text-lg mb-3" bold>Kopiraj iz jednog od svojih salona</Text>
                        <TouchableOpacity onPress={beginAddCategory} className="p-5 bg-textPrimary rounded-full">
                            <Feather name="copy" size={58} color="white" />
                        </TouchableOpacity>
                    </View>
                } */}
            </View>
              
            
              {sortedWorkers.length > 0 && 
                <ScrollView className="w-full -mt-16">
                    <View className="min-h-screen">
                        {sortedWorkers.map((worker, index) => {
                            const isYou = worker?._id === userData?._id

                            return (
                                <Animated.View entering={FadeInDown} key={index}>
                                <TouchableOpacity onPress={() => seeWorkerDetails(worker?._id)} className="bg-bgPrimary w-full mt-4 rounded-xl p-4 flex flex-col justify-between">
                                    <View className="flex flex-row justify-between items-center pb-2">
                                        <Image
                                            className="w-16 h-16 rounded-full"
                                            source={`http://192.168.1.28:5000/photos/profile-photo${worker?._id}.png`}
                                            placeholder={{ blurhash }}
                                            contentFit="cover"
                                            transition={1000}
                                        />
                                        <View className="flex flex-col justify-between flex-1 pl-2">
                                            <View className="flex flex-row justify-between items-center">
                                                <Text className="text-textPrimary text-lg" bold>{worker?.first_name} {worker?.last_name} {isYou && '(Ti)'}</Text>
                                                <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                                            </View>
                                            <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                                            <View className="flex-1">
                                                <View className="flex flex-row justify-between items-center mt-2">
                                                    <Text>Ukupno dodeljenih usluga: </Text>
                                                    <Text semi>{worker?.services?.length}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* <View className="bg-textSecondary mt-3 mb-3 w-full" style={{height: 0.5}}></View> */}

                                    {/* <View className="flex flex-row justify-start flex-wrap gap-2">
                                        <View className="p-2 bg-appColor rounded-xl">
                                            <Text className="text-white" semi>Trepavice</Text>
                                        </View>

                                        <View className="p-2 bg-appColor rounded-xl">
                                            <Text className="text-white" semi>Trajna sminka</Text>
                                        </View>

                                        <View className="p-2 bg-appColor rounded-xl">
                                            <Text className="text-white" semi>Trepavice</Text>
                                        </View>

                                        <View className="p-2 bg-appColor rounded-xl">
                                            <Text className="text-white" semi>Trajna sminka</Text>
                                        </View>
                                    </View> */}
                                </TouchableOpacity>
                                </Animated.View>
                            )
                        })}
                        
                        <View className="mb-44"></View>
                    </View>
                </ScrollView>
              }
              </View>}
          </View>
        </View>

        <AddWorkerToSalonModal 
            isModalVisible={isAddWorkerToSalonModalVisible}
            setIsModalVisible={setIsAddWorkerToSalonModalVisible}
        />

        <SalonWorkerDetailsModal 
            isModalVisible={isSalonWorkerDetailsModalVisible}
            setIsModalVisible={setIsSalonWorkerDetailsModalVisible}
        />

        <CreateWorkerAccountModal 
            isModalVisible={isCreateWorkerAccountModalVisible}
            setIsModalVisible={setIsCreateWorkerAccountModalVisible}
            addingYourself
        />

        <AddYourselfInSalonModal 
            isModalVisible={isAddYourselfModalVisible}
            setIsModalVisible={setIsAddYourselfModalVisible}
        />
    </SafeAreaView>
  )
}

export default SalonWorkersScreen