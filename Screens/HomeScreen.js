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



const HomeScreen = ({route, navigation}) => {
    const params = route.params || {}
    console.log(params)
    const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(params?.newAccount || false)
    const [isNewSalonCreated, setIsNewSalonCreated] = useState(false)
    const [isCreateWorkerAccountModalVisible, setIsCreateWorkerAccountModalVisible] = useState(false)
    const [isBeginSalonRegisterModalVisible, setIsBeginSalonRegisterModalVisible] = useState(false)
    const [haveWorkerAccount, setHaveWorkerAccount] = useState(false)

    const scrollViewRef = useRef(null)
    const salonCardRef = useRef(null)

    useFocusEffect(useCallback(()=>{
        if(!params?.newSalonCreated) return
        setIsNewSalonCreated(true)

        setTimeout(()=>{
            setIsNewSalonCreated(false)
            navigation.setParams({ newSalonCreated: null })
        }, 3000)
    }, [params]))


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

  return (
    <SafeAreaView className="bg-bgPrimary h-full relative">
        <StatusBar style={isNewSalonCreated ? "light" : "dark"} />
        {isNewSalonCreated && <View className="top-0 bottom-0 left-0 right-0 bg-black absolute opacity-90"></View>}
        <ScrollView ref={scrollViewRef}>
            <View className="min-h-screen flex flex-col justify-between items-center">
                <View className="w-full flex flex-row justify-between items-center px-4 mt-4">
                    <View>
                        <Text className={`${isNewSalonCreated ? 'text-textSecondary' : 'text-textPrimary'} text-3xl font-bold`}>tiki <Text className="text-textSecondary text-2xl font-bold">manager</Text></Text>
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


                <View className="bg-bgSecondary flex-1 w-full min-h-screen mt-8 px-4 relative" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    {isNewSalonCreated && <View className="top-0 bottom-0 left-0 right-0 bg-textPrimary absolute opacity-50 z-10"></View>}
                    <View className="flex flex-row justify-between items-center mt-10">
                        <View>
                            <Text className="text-textPrimary text-2xl font-bold">Natalija Lukic</Text>
                            {/* <View className="bg-appColor w-1/2 rounded-2xl flex flex-row justify-center items-center mt-2">
                                <Text className="text-white font-bold">hdsa</Text>
                            </View> */}
                        </View>
                        <TouchableOpacity 
                        onPress={()=>{setIsBeginSalonRegisterModalVisible(true)}}
                        className="p-1 bg-bgPrimary rounded-full">
                            <Entypo name="plus" size={32} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-row flex-wrap justify-between mt-10">
                        <WorkerCard />
                        
                        <SalonCard isJustCreated={false} /> 
                        <SalonCard ref={salonCardRef} isJustCreated={isNewSalonCreated} /> 


                    </View>

                    <View className="mt-6">
                        <TouchableOpacity 
                        onPress={()=>{setIsBeginSalonRegisterModalVisible(true)}}
                        className="h-28 w-full bg-bgSecondary border-textSecondary rounded-3xl flex flex-row justify-between items-center px-4" style={{borderWidth: 0.5}}>
                            <View>
                                <View className="bg-appColor h-3 w-3 rounded-full"></View>
                            </View>

                            <View className="flex-1 ml-4">
                                <Text className="font-bold text-lg">Dodaj novi salon</Text>
                                <Text className="text-md text-textMid">Započni proces dodavanja</Text>
                            </View>

                            <View>
                                <Entypo name="plus" size={34} color="black" />
                            </View>
                        </TouchableOpacity>

                        {!haveWorkerAccount && 
                        <TouchableOpacity 
                            onPress={() => setIsCreateWorkerAccountModalVisible(true)}
                            className="h-28 w-full bg-bgSecondary border-textSecondary rounded-3xl flex flex-row justify-between items-center px-4 mt-4" style={{borderWidth: 0.5}}>
                            <View>
                                <View className="bg-appColorDark h-3 w-3 rounded-full"></View>
                            </View>

                            <View className="flex-1 ml-4">
                                <Text className="font-bold text-lg">Postani deo salona</Text>
                                <Text className="text-md text-textMid">Registruj se kao radnik i pridruži se salonu</Text>
                            </View>

                            <View>
                                <Entypo name="plus" size={34} color="black" />
                            </View>
                        </TouchableOpacity>}
                    </View>

                    <View className="h-28 bg-bgSecondary"></View>
                </View>
            </View>
        </ScrollView>
        
        <WelcomeModal 
            isModalVisible={isWelcomeModalVisible}
            setIsModalVisible={() => {
                setWelcomeModalVisible(false)
                navigation.setParams({ newAccount: null })
            }}
        />

        <CreateWorkerAccountModal 
            isModalVisible={isCreateWorkerAccountModalVisible}
            setIsModalVisible={setIsCreateWorkerAccountModalVisible}
        />

        <BeginSalonRegisterModal 
            isModalVisible={isBeginSalonRegisterModalVisible}
            setIsModalVisible={setIsBeginSalonRegisterModalVisible}
        />
    </SafeAreaView>
  )
}

export default HomeScreen