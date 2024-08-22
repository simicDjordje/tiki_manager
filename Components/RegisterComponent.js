import { View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomInput from './CustomComponents/CustomInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Text from './CustomComponents/CustomText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCheckIfUserExistsMutation } from '../redux/apiCore'
import CustomButton from './CustomComponents/CustomButton'

const RegisterComponent = ({setAuthType}) => {
    const [email, setEmail] = useState('')
    const [validation, setValidation] = useState(false)
    const navigation = useNavigation()
    const [checkIfUserExists, {isLoading, isError}] = useCheckIfUserExistsMutation()
    const [errorMessage, setErrorMessage] = useState(null)

    useFocusEffect(useCallback(()=>{
        (
            async () => {
                const emailStorage = await AsyncStorage.getItem('@register_user_email')
                if(emailStorage) AsyncStorage.removeItem('@register_user_email')
            }
        )()
    }, []))

    const handleNext = async () => {
        if(!email){
            setValidation(true)
            return
        }

        try{
            const {error, data} = await checkIfUserExists({email: email.toLowerCase()})
            
            if(error){
                if(error?.data?.message === 'User already exists'){
                    setErrorMessage('Ova email adresa je već registrovana')
                }else{
                    setErrorMessage('Došlo je do greške')
                }

                return
            }

            setErrorMessage(null)
            await AsyncStorage.setItem('@register_user_email', email)
            navigation.navigate('AuthTabScreens', {screen: 'RegisterScreen'})
        }catch(error){
            console.log(error)
        }
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
                errorMessage={'obavezno'}
            />

        </View>

        <View className="h-5 flex flex-row justify-start items-center">
            {errorMessage && <Text className="text-red-500">Ova email adresa je već registrovana</Text>}
        </View>

        <View className="mt-6">
            <CustomButton 
                onPress={handleNext}
                text={'Dalje'}
                isLoading={isLoading}
                isError={!!errorMessage}
            />
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