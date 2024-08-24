import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import WelcomeModal from '../Components/WelcomeModal'
import Entypo from '@expo/vector-icons/Entypo'
import CreateWorkerAccountModal from '../Components/CreateWorkerAccountModal'
import SalonCard from '../Components/SalonCard'
import WorkerCard from '../Components/WorkerCard'
import BeginSalonRegisterModal from '../Components/BeginSalonRegisterModal'
import { useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Text from '../Components/CustomComponents/CustomText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LootieLoader from '../Components/LootieAnimations/Loader'
import Animated, { FadeInDown, FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { useGetUserSalonsMutation } from '../redux/apiCore'

const HomeScreen = ({route, navigation}) => {
    //params
    const params = route.params || {}

    //states
    const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(params?.newAccount || false)
    const [isNewSalonCreated, setIsNewSalonCreated] = useState(false)
    const [isWorkerAccountCreated, setIsWorkerAccountCreated] = useState(false)
    const [isCreateWorkerAccountModalVisible, setIsCreateWorkerAccountModalVisible] = useState(false)
    const [isBeginSalonRegisterModalVisible, setIsBeginSalonRegisterModalVisible] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [salons, setSalons] = useState([])

    //refs
    const scrollViewRef = useRef(null)
    const salonCardRef = useRef(null)
    const workerCardRef = useRef(null)

    //api
    const [getUserSalons, {isLoading: isGetUserSalonsLoading}] = useGetUserSalonsMutation()

    //ON FOCUS
    useFocusEffect(useCallback(()=>{
        (async () => {
            try{
                const {error, data} = await getUserSalons()
                
                if(data && data.success){
                    setSalons(data.result)
                }
            }catch(error){
                console.log(error)
            }
        })()
    }, []))

    useFocusEffect(useCallback(()=>{
        if(!params.comesFromAuth) return

        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }]
          })

          navigation.setParams({ comesFromAuth: null })
    }, []))

    useFocusEffect(useCallback(()=>{
        (async () => {
            const user = await AsyncStorage.getItem('@userData')
            if(!user) return

            setUserData(JSON.parse(user))
        })()
    }, []))

    useFocusEffect(useCallback(()=>{
        if(!params?.newSalonCreated) return
        setIsNewSalonCreated(true)

        setTimeout(()=>{
            setIsNewSalonCreated(false)
            navigation.setParams({ newSalonCreated: null })
        }, 3000)
    }, [params]))

    // ON FOCUS END

    useEffect(()=>{
        if(isCreateWorkerAccountModalVisible) return

        (async () => {
            const user = await AsyncStorage.getItem('@userData')
            const isWorkerAccCreated = await AsyncStorage.getItem('@isWorkerAccCreated')
            if(!user) return

            setUserData(JSON.parse(user))

            if(!isWorkerAccCreated) return

            setIsWorkerAccountCreated(true)

            setTimeout(async ()=>{
                setIsWorkerAccountCreated(false)
                await AsyncStorage.removeItem('@isWorkerAccCreated')
            }, 3000)
        })()
    }, [isCreateWorkerAccountModalVisible])

    useEffect(() => {
        if (isNewSalonCreated && salonCardRef.current && scrollViewRef.current) {
            salonCardRef.current.measureLayout(
                scrollViewRef.current.getScrollableNode(),
                (x, y) => {
                    scrollViewRef.current.scrollTo({ y, animated: true })
                }
            );
        }
    }, [isNewSalonCreated])

    useEffect(() => {
        if (isWorkerAccountCreated && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [isWorkerAccountCreated])

  return (
    <SafeAreaView className="bg-bgPrimary h-full relative">
        <StatusBar style={isNewSalonCreated || isWorkerAccountCreated ? "light" : "dark"} />
        {isNewSalonCreated || isWorkerAccountCreated && <View className="top-0 bottom-0 left-0 right-0 bg-black absolute opacity-90"></View>}
        <ScrollView ref={scrollViewRef}>
            <View className="min-h-screen flex flex-col justify-between items-center">
                <View className="w-full flex flex-row justify-between items-center px-4 mt-4">
                    <View>
                        <Text className={`${isNewSalonCreated || isWorkerAccountCreated ? 'text-textSecondary' : 'text-textPrimary'} text-3xl`} bold>tiki <Text className="text-textSecondary text-2xl" semi>manager</Text></Text>
                    </View>

                    <View className="flex flex-row justify-between items-center">
                        <TouchableOpacity className=" bg-textPrimary p-2 rounded-full flex flex-row justify-center items-center relative">
                            <View className="bg-appColor px-2 py-1 rounded-full absolute -top-2 -right-2 z-10">
                                <Text className="text-white">2</Text>
                            </View>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {isLoading && 
                    <View className="flex-1 w-full flex flex-col justify-center items-center mb-20">
                        <LootieLoader dark={true} d={70} />
                    </View>
                }

                {!isLoading && 
                <Animated.View entering={FadeInDown} exiting={FadeOutDown} className="bg-bgSecondary flex-1 w-full min-h-screen mt-8 px-4 relative" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    {isNewSalonCreated || isWorkerAccountCreated && <View className="top-0 bottom-0 left-0 right-0 bg-textPrimary absolute opacity-50 z-10"></View>}
                    <View className="flex flex-row justify-between items-center mt-10">
                        <View className="flex flex-col justify-between items-start">
                            <Text className="text-textPrimary text-2xl" bold>{userData?.first_name} {userData?.last_name}</Text>
                            <View className="bg-appColor rounded-2xl mt-2 px-2 py-1">
                                <Text className="text-white font-bold">Beauty salon PK</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                        onPress={()=>{setIsBeginSalonRegisterModalVisible(true)}}
                        className="p-1 bg-bgPrimary rounded-full">
                            <Entypo name="plus" size={32} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row flex-wrap justify-between mt-10">
                        {userData?.haveWorkerAccount && 
                            <WorkerCard 
                                userData={userData} 
                                isJustCreated={isWorkerAccountCreated} 
                                ref={workerCardRef}
                            />
                        }
                        
                        
                        {/* <SalonCard isJustCreated={false} /> 
                        <SalonCard ref={salonCardRef} isJustCreated={isNewSalonCreated} /> */}


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

                    <View className="h-28 bg-bgSecondary"></View>
                </Animated.View>
                }
            </View>
        </ScrollView>
        
        <WelcomeModal 
            isModalVisible={isWelcomeModalVisible}
            setIsModalVisible={() => {
                setWelcomeModalVisible(false)
                navigation.setParams({ newAccount: null })
            }}
            userData={userData}
        />

        <CreateWorkerAccountModal 
            isModalVisible={isCreateWorkerAccountModalVisible}
            setIsModalVisible={setIsCreateWorkerAccountModalVisible}
            userData={userData}
        />

        <BeginSalonRegisterModal 
            isModalVisible={isBeginSalonRegisterModalVisible}
            setIsModalVisible={setIsBeginSalonRegisterModalVisible}
        />
    </SafeAreaView>
  )
}

export default HomeScreen