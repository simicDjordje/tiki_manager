import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomComponents/CustomInput'
import { useNavigation } from '@react-navigation/native'
import Text from './CustomComponents/CustomText'


const RegisterComponent = ({setAuthType}) => {
    const [email, setEmail] = useState('')
    const [validation, setValidation] = useState(false)
    const navigation = useNavigation()

    const handleNext = () => {
        if(!email){
            setValidation(true)
            return
        }
        navigation.navigate('AuthTabScreens', {screen: 'RegisterScreen'})
    }

  return (
    <View>
        <View className="flex flex-row justify-center items-center">
            <Text className="text-textPrimary text-2xl" bold>Kreiraj nalog</Text>
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
                isError={validation && !email}
                errorMessage={'obavezno polje'}
            />
        </View>

        <View className="mt-10">
            <TouchableOpacity 
                onPress={handleNext}
                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center">
                <Text className="text-white text-lg" bold>Dalje</Text>
            </TouchableOpacity>
        </View>

        <View className="bg-textSecondary w-full h-0.5 mt-8"></View>


        <TouchableOpacity 
            onPress={()=>setAuthType('login')}
            className="flex flex-row justify-center items-center mt-4">
            <Text className="mr-1">Imaš nalog?</Text>
            <Text className="text-appColorDark" bold>Uloguj se ovde</Text>
        </TouchableOpacity>
    </View>
  )
}

export default RegisterComponent