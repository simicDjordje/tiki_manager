import { View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CustomInput from '../Components/CustomComponents/CustomInput'
import Text from '../Components/CustomComponents/CustomText'


const RegisterScreen = ({navigation}) => {

    const handleBack = () => {
        navigation.navigate('AuthTabScreens', {screen: 'AuthScreen'})
    }

    const handleConfirm = () => {
        navigation.navigate('MainTabScreens', {screen: 'HomeScreen', params: {newAccount: true}})
    }

  return (
    <SafeAreaView className="bg-appColor h-full">
        <ScrollView>
            <View className="min-h-screen">
                <View className="w-full mt-4 flex flex-row justify-between px-4">
                    <TouchableOpacity onPress={handleBack}>
                        <MaterialIcons name="arrow-back-ios-new" size={24} color="#00505b" />
                    </TouchableOpacity>
                    <Text className="text-white text-3xl" bold>tiki <Text className="text-2xl text-appColorDark" semi>manager</Text></Text>
                </View>

                {/* Register Inputs */}
                <View className="mt-10 bg-bgPrimary min-h-screen w-full" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View className="bg-bgSecondary h-full w-full px-4 mt-10" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        <View className="flex flex-row justify-center items-center">
                            <Text className="text-2xl mt-10" bold>Registracija</Text>
                        </View>

                        <View className="bg-textSecondary w-full h-0.5 mt-2"></View>
                        <View className="flex flex-row justify-center items-center mt-2">
                            <Text className="text-textSecondary text-md">Popuni potrebna polja i postani deo <Text className="text-appColorDark" bold>tiki</Text> zajednice</Text>
                        </View>

                        <View className="mt-4">
                            <CustomInput 
                                label="Ime"
                                placeholder="Ime"
                            />

                            <CustomInput 
                                classNameCustom="mt-2"
                                label="Prezime"
                                placeholder="Prezime"
                            />

                            <CustomInput 
                                classNameCustom="mt-2"
                                label="Šifra"
                                placeholder="Šifra"
                            />

                            <CustomInput 
                                classNameCustom="mt-2"
                                label="Potvrdi šifru"
                                placeholder="Potvrdi šifru"
                            />
                        </View>

                        <View className="mt-10">
                            <TouchableOpacity 
                                onPress={handleConfirm}
                                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center">
                                <Text className="text-white text-lg" bold>Potvrdi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* END Register Inputs */}
            </View>

            <View className="mb-26"></View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen