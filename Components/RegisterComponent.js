import { View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomInput from './CustomComponents/CustomInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Text from './CustomComponents/CustomText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCheckIfUserExistsMutation } from '../redux/apiCore'
import CustomButton from './CustomComponents/CustomButton'
import { useSelector, useDispatch } from 'react-redux'
import { setSignUpFirstScreenData } from '../redux/generalSlice'

const RegisterComponent = ({setAuthType}) => {
    const {signUpFirstScreenData} = useSelector(state => state.general)
    const [validation, setValidation] = useState(false)
    const navigation = useNavigation()
    const [checkIfUserExists, {isLoading, isError}] = useCheckIfUserExistsMutation()
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()

    const handleNext = async () => {
        if(!signUpFirstScreenData.email){
            setValidation(true)
            return
        }

        try{
            const {error, data} = await checkIfUserExists({email: signUpFirstScreenData.email.toLowerCase()})
            
            if(error){
                if(error?.data?.message === 'User already exists'){
                    setErrorMessage('Ova email adresa je već registrovana')
                }else{
                    setErrorMessage('Došlo je do greške')
                }

                return
            }

            setErrorMessage(null)
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
                value={signUpFirstScreenData.email}
                onChangeText={text => dispatch(setSignUpFirstScreenData({...signUpFirstScreenData, email: text}))}
                isError={validation && !signUpFirstScreenData.email}
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