import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import WelcomeModal from '../Components/WelcomeModal'

const HomeScreen = () => {
    const [isWelcomeModalVisible, setWelcomeModalVisible] = useState(false)

  return (
    <SafeAreaView className="bg-bgPrimary h-full">
        <ScrollView>
            <View className="min-h-screen flex flex-col justify-between items-center">
                <View className="w-full flex flex-row justify-between items-center px-4 mt-4">
                    <View>
                        <Text className="text-textPrimary text-4xl font-bold">Dobro</Text>
                        <Text className="text-textSecondary text-3xl font-bold">jutro</Text>
                    </View>

                    <View className="flex flex-row justify-between items-center">
                        <TouchableOpacity className=" bg-textPrimary p-2 rounded-full flex flex-row justify-center items-center">
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>


                <View className="bg-bgSecondary flex-1 w-full mt-10 px-4" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View className="flex flex-row justify-between items-center mt-10">
                        <View>
                            <Text className="text-textPrimary text-2xl font-bold">Djordje Simic</Text>
                            <View className="bg-appColor w-1/2 rounded-2xl flex flex-row justify-center items-center mt-2">
                                <Text className="text-white font-bold">hdsa</Text>
                            </View>
                        </View>
                        <Text>dasjdjas</Text>
                    </View>

                    <View className="flex flex-row justify-between items-center mt-10">

                            <TouchableOpacity onPress={()=>setWelcomeModalVisible(true)} className="bg-bgPrimary h-40 w-1/2 rounded-2xl -ml-1">

                            </TouchableOpacity>

                            <View className="bg-bgPrimary h-40 w-1/2 rounded-2xl -mr-1">

                            </View>

                    </View>
                </View>

            </View>
        </ScrollView>

        <WelcomeModal 
            isModalVisible={isWelcomeModalVisible}
            setIsModalVisible={setWelcomeModalVisible}

        />
    </SafeAreaView>
  )
}

export default HomeScreen