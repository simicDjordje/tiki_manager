import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import WelcomeModal from '../Components/WelcomeModal'
import Entypo from '@expo/vector-icons/Entypo'
import CreateWorkerAccountModal from '../Components/CreateWorkerAccountModal'
import WorkerCard from '../Components/WorkerCard'
import BeginSalonRegisterModal from '../Components/BeginSalonRegisterModal'
import { useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Text from '../Components/CustomComponents/CustomText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LootieLoader from '../Components/LootieAnimations/Loader'
import Animated, { FadeInDown, FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { useGetMyUserDataMutation, useGetNotificationsMutation, useGetUserSalonsMutation } from '../redux/apiCore'
import SalonsPartHomeScreen from '../Components/SalonsPartHomeScreen'
import { useDispatch, useSelector } from 'react-redux'
import { setJustCreatedSalon, setJustCreatedWorkerAccount, setJustSignedUp, setUser } from '../redux/generalSlice'
import MessageModal from '../Components/MessageModal'
import ReservationsCard from '../Components/ReservationsCard'

const HomeScreen = ({route, navigation}) => {
    //redux 
    const {
        userData, 
        justCreatedSalon, 
        justCreatedWorkerAccount, 
        justSignedUp,
        userSalons,
        comesFrom,
        notifications,
    } = useSelector(state => state.general)
    const dispatch = useDispatch()

    //states
    const [isCreateWorkerAccountModalVisible, setIsCreateWorkerAccountModalVisible] = useState(false)
    const [isBeginSalonRegisterModalVisible, setIsBeginSalonRegisterModalVisible] = useState(false)
    const [isMessageModalVisible, setIsMessageModalVisible] = useState(false)

    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')

    //refs
    const scrollViewRef = useRef(null)
    const salonCardRef = useRef(null)
    const workerCardRef = useRef(null)

    //api
    const [getUserSalons, {isLoading: isGetUserSalonsLoading}] = useGetUserSalonsMutation()
    const [getNotifications, {isLoading: isNotificationsLoading}] = useGetNotificationsMutation()
    const [getMyUserData] = useGetMyUserDataMutation()

    //ON FOCUS
    useFocusEffect(useCallback(()=>{
        getUserSalons()
        getNotifications()
        getMyUserData()
    }, []))


    useFocusEffect(useCallback(()=>{
        if(isGetUserSalonsLoading || !userSalons?.salonsInactive.length || !justCreatedSalon) return

        if (salonCardRef.current && scrollViewRef.current) {
            salonCardRef.current.measureLayout(
                scrollViewRef.current.getScrollableNode(),
                (x, y) => {
                    scrollViewRef.current.scrollTo({ y, animated: true })
                }
            );
        }
        
        setTimeout(()=>{
            dispatch(setJustCreatedSalon(null))
        }, 3000)
    }, [isGetUserSalonsLoading, justCreatedSalon, userSalons?.salonsInactive]))

    // ON FOCUS END

    useEffect(()=>{
        if(!justCreatedWorkerAccount) return

        if(scrollViewRef.current) scrollViewRef.current.scrollTo({ y: 0, animated: true })

        setTimeout(async ()=>{
            dispatch(setJustCreatedWorkerAccount(null))
        }, 3000)
    }, [justCreatedWorkerAccount])


    useEffect(() => navigation.addListener('beforeRemove', (e) => {
        if (comesFrom !== 'auth') return
        e.preventDefault()

      }),
    [navigation, comesFrom]
  );

  const handleToNotificationsScreen = () => {
    navigation.navigate('StackTabScreens', {screen: 'NotificationsScreen'})
  }

  return (
    <SafeAreaView className="bg-bgPrimary h-full relative">
        <StatusBar />
        <ScrollView ref={scrollViewRef}>
            <View className="min-h-screen flex flex-col justify-between items-center">
                <View className="w-full flex flex-row justify-between items-center px-4 mt-4">
                    <View>
                        <Text className={`text-textPrimary text-3xl`} bold>tiki <Text className="text-textSecondary text-2xl" semi>manager</Text></Text>
                    </View>

                    <View className="flex flex-row justify-between items-center">
                        <TouchableOpacity onPress={handleToNotificationsScreen} className=" bg-textPrimary p-2 rounded-full flex flex-row justify-center items-center relative">
                            {notifications?.unseen?.length > 0 && 
                            <View className="bg-appColor w-7 h-7 flex flex-row justify-center items-center rounded-full absolute -top-2 -right-2 z-10">
                                <Text className="text-white">{notifications?.unseen?.length}</Text>
                            </View>}
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {!userData && 
                    <View className="flex-1 w-full flex flex-col justify-center items-center mb-20">
                        <LootieLoader dark={true} d={70} />
                    </View>
                }

                {userData &&
                <Animated.View entering={FadeInDown} exiting={FadeOutDown} className="bg-bgSecondary flex-1 w-full min-h-screen mt-8 px-4 relative" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View className="flex flex-row justify-between items-center mt-10">
                        <View className="flex flex-col justify-between items-start">
                            <Text className="text-textPrimary text-2xl" bold>{userData?.first_name} {userData?.last_name}</Text>
                            {userData?.worksInSalon && 
                                <View className="bg-appColor rounded-2xl mt-2 px-2 py-1">
                                    <Text className="text-white" bold>{userData?.worksInSalon?.name}</Text>
                                </View>
                            }
                        </View>
                        <TouchableOpacity 
                        onPress={()=>{setIsBeginSalonRegisterModalVisible(true)}}
                        className="p-1 bg-bgPrimary rounded-full">
                            <Entypo name="plus" size={32} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className="mt-10">
                        {userData?.haveWorkerAccount && 
                            <WorkerCard 
                                userData={userData} 
                                ref={workerCardRef}
                                setIsMessageModalVisible={setIsMessageModalVisible}
                                setTitle={setTitle}
                                setMessage={setMessage}
                            />
                        }

                        {/* {userData?.haveWorkerAccount && 
                            <ReservationsCard 
                                userData={userData} 
                                setIsMessageModalVisible={setIsMessageModalVisible}
                            />
                        } */}
                        
                    </View>

                    <View>
                        <TouchableOpacity 
                        onPress={()=>{setIsBeginSalonRegisterModalVisible(true)}}
                        className="h-28 w-full bg-bgSecondary border-textSecondary rounded-3xl flex flex-row justify-between items-center px-4" style={{borderWidth: 0.5}}>
                            <View>
                                <View className="bg-appColor h-3 w-3 rounded-full"></View>
                            </View>

                            <View className="flex-1 ml-4">
                                <Text className="text-lg" bold>Dodaj novi salon</Text>
                                <Text className="text-md text-textMid">Započni proces dodavanja</Text>
                            </View>

                            <View>
                                <Entypo name="plus" size={34} color="black" />
                            </View>
                        </TouchableOpacity>

                        {!userData?.haveWorkerAccount && 
                        <TouchableOpacity 
                            onPress={() => setIsCreateWorkerAccountModalVisible(true)}
                            className="h-28 w-full bg-bgSecondary border-textSecondary rounded-3xl flex flex-row justify-between items-center px-4 mt-4" style={{borderWidth: 0.5}}>
                            <View>
                                <View className="bg-appColorDark h-3 w-3 rounded-full"></View>
                            </View>

                            <View className="flex-1 ml-4">
                                <Text className="text-lg" bold>Postani deo salona</Text>
                                <Text className="text-md text-textMid">Registruj se kao radnik i pridruži se salonu</Text>
                            </View>

                            <View>
                                <Entypo name="plus" size={34} color="black" />
                            </View>
                        </TouchableOpacity>}
                    </View>
                    
                    <SalonsPartHomeScreen 
                        ref={salonCardRef}
                    />


                    <View className="h-28 bg-bgSecondary"></View>
                </Animated.View>
                }
            </View>
        </ScrollView>
        
        {/* <WelcomeModal 
            isModalVisible={justSignedUp || false}
            setIsModalVisible={() => {dispatch(setJustSignedUp(false))}}
            userData={userData}
        /> */}

        <CreateWorkerAccountModal 
            isModalVisible={isCreateWorkerAccountModalVisible}
            setIsModalVisible={setIsCreateWorkerAccountModalVisible}
        />

        <BeginSalonRegisterModal 
            isModalVisible={isBeginSalonRegisterModalVisible}
            setIsModalVisible={setIsBeginSalonRegisterModalVisible}
        />

        <MessageModal 
            isModalVisible={isMessageModalVisible}
            setIsModalVisible={setIsMessageModalVisible}
            handleConfirm={() => setIsMessageModalVisible(false)}
            title={title}
            text={message}
            buttonText={'OK'}
        />
    </SafeAreaView>
  )
}

export default HomeScreen