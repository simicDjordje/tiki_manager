import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomComponents/CustomInput'
import { useNavigation } from '@react-navigation/native'

const RegisterComponent = ({setAuthType}) => {
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    const handleNext = () => {
        navigation.navigate('AuthTabScreens', {screen: 'RegisterScreen'})
    }

  return (
    <View>
        <View className="flex flex-row justify-center items-center">
            <Text className="text-textPrimary text-2xl font-bold">Kreiraj nalog</Text>
        </View>

        <View className="bg-textSecondary w-full h-0.5 mt-2"></View>

        <View className="flex flex-row justify-center items-center mt-2">
            <Text className="text-textSecondary text-md">Otvori svoj salon ili svoj profil radnika salona</Text>
        </View>
        <View className="flex flex-row justify-center items-center">
            <Text className="text-textSecondary text-md">Za početak unesi svoju email adresu</Text>
        </View>

        <View className="mt-4">
            <CustomInput 
                label={'Email'}
                placeholder={'Unesi email'}
                value={email}
                onChangeText={text => setEmail(text)}
            />
        </View>

        <View className="mt-10">
            <TouchableOpacity 
                onPress={handleNext}
                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center">
                <Text className="text-white font-bold text-lg">Dalje</Text>
            </TouchableOpacity>
        </View>

        <View className="bg-textSecondary w-full h-0.5 mt-8"></View>


        <TouchableOpacity 
            onPress={()=>setAuthType('login')}
            className="flex flex-row justify-center items-center mt-4">
            <Text className="mr-1">Imaš nalog?</Text>
            <Text className="text-appColorDark font-bold">Uloguj se ovde</Text>
        </TouchableOpacity>
    </View>
  )
}

export default RegisterComponent