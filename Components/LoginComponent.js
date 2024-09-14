import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomComponents/CustomInput'
import Feather from '@expo/vector-icons/Feather'
import Text from './CustomComponents/CustomText'
import { useGetNotificationsMutation, useGetUserSalonsMutation, useSignInUserMutation } from '../redux/apiCore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from './CustomComponents/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setComesFrom, setUser } from '../redux/generalSlice'

const LoginComponent = ({setAuthType}) => {
    const navigation = useNavigation()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validation, setValidation] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [signInUser, {isLoading}] = useSignInUserMutation()
    const dispatch = useDispatch()

    const [getUserSalons, {isLoading: isGetUserSalonsLoading}] = useGetUserSalonsMutation()
    const [getNotifications, {isLoading: isNotificationsLoading}] = useGetNotificationsMutation()

    const handleLogin = async () => {
        if(!email || !password){
            setValidation(true)
            return
        }

        try{
            const {error, data} = await signInUser({email: email.toLocaleLowerCase(), password})
            
            if(error){
                console.log(error)
                if(error?.data?.message === 'Invalid email or password'){
                    setErrorMessage('Neispravna email adresa ili lozinka')
                }else{
                    setErrorMessage('Došlo je do greške')
                }
                return
            }

            if(data.success){
                dispatch(setUser(data.result))
                setEmail('')
                setPassword('')
                setValidation(false)
                setErrorMessage('')
                setPasswordVisible(false)
                dispatch(setComesFrom('auth'))

                getUserSalons()
                getNotifications()

                navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
            }
        }catch(error){
            console.log(error)
        }
    }

  return (
    <View>
        <View className="flex flex-row justify-center items-center">
            <Text className="text-textPrimary text-2xl" bold>Uloguj se</Text>
        </View>

        <View className="bg-textSecondary w-full h-0.5 mt-2"></View>

        <View className="h-7 w-full flex flex-row justify-center items-center">
            <Text className="text-red-700">{errorMessage}</Text>
        </View>

        <View className="mt-2">
            <CustomInput 
                label={'Email'}
                placeholder={'Unesi email'}
                isError={validation && !email}
                errorMessage={'obavezno'}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <CustomInput 
                label={'Lozinka'}
                placeholder={'Unesi lozinku'}
                classNameCustom="mt-3"
                inputIcon={()=>
                    <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
                        <Feather name={`${passwordVisible ? 'eye' : 'eye-off'}`} size={24} color="black" />
                    </TouchableOpacity>
                }
                iconSide={'right'}
                secureTextEntry={!passwordVisible}
                isError={validation && !password}
                errorMessage={'obavezno'}
                value={password}
                onChangeText={text => setPassword(text)}
            />
        </View>

        <View className="mt-10">
            <CustomButton 
                onPress={handleLogin}
                text={'Dalje'}
                isLoading={isLoading}
                isError={!!errorMessage}
            />
        </View>

        <View className="bg-textSecondary w-full h-0.5 mt-8"></View>


        <TouchableOpacity 
            onPress={()=>setAuthType('register')}
            className="flex flex-row justify-center items-center mt-4">
            <Text className="mr-1">Nemaš nalog?</Text>
            <Text className="text-appColorDark" bold>Kreiraj ovde</Text>
        </TouchableOpacity>
    </View>
  )
}

export default LoginComponent