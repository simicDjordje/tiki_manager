import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import WelcomeModal from '../Components/WelcomeModal'
import Entypo from '@expo/vector-icons/Entypo'
import CreateWorkerAccountModal from '../Components/CreateWorkerAccountModal'
import SalonCard from '../Components/SalonCard'
import WorkerCard from '../Components/WorkerCard'



const HomeScreen = ({route}) => {
    const params = route.params || {}
    const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(params?.newAccount || false)
    const [isCreateWorkerAccountModalVisible, setIsCreateWorkerAccountModalVisible] = useState(false)
    const [haveWorkerAccount, setHaveWorkerAccount] = useState(false)

  return (
    <SafeAreaView className="bg-bgPrimary h-full">
        <ScrollView>
            <View className="min-h-screen flex flex-col justify-between items-center">
                <View className="w-full flex flex-row justify-between items-center px-4 mt-4">
                    <View>
                        <Text className="text-textPrimary text-3xl font-bold">tiki <Text className="text-textSecondary text-2xl font-bold">manager</Text></Text>
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


                <View className="bg-bgSecondary flex-1 w-full mt-8 px-4" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View className="flex flex-row justify-between items-center mt-10">
                        <View>
                            <Text className="text-textPrimary text-2xl font-bold">Natalija Lukic</Text>
                            {/* <View className="bg-appColor w-1/2 rounded-2xl flex flex-row justify-center items-center mt-2">
                                <Text className="text-white font-bold">hdsa</Text>
                            </View> */}
                        </View>
                        {/* <Text>dasjdjas</Text> */}
                    </View>

                    <View className="flex flex-row flex-wrap justify-between mt-10">
                        <WorkerCard />
                        <SalonCard />                     
                    </View>

                    <View className="mt-6">
                        <TouchableOpacity className="h-28 w-full bg-bgSecondary border-textSecondary rounded-3xl flex flex-row justify-between items-center px-4" style={{borderWidth: 0.5}}>
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

                    <View className="h-28"></View>
                </View>
            </View>
        </ScrollView>
        
        <WelcomeModal 
            isModalVisible={isWelcomeModalVisible}
            setIsModalVisible={setWelcomeModalVisible}
        />

        <CreateWorkerAccountModal 
            isModalVisible={isCreateWorkerAccountModalVisible}
            setIsModalVisible={setIsCreateWorkerAccountModalVisible}
        />
    </SafeAreaView>
  )
}

export default HomeScreen