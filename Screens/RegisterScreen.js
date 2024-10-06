import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CustomInput from '../Components/CustomComponents/CustomInput'
import Text from '../Components/CustomComponents/CustomText'
import Feather from '@expo/vector-icons/Feather'
import { useSignUpUserMutation } from '../redux/apiCore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton from '../Components/CustomComponents/CustomButton'
import { useFocusEffect } from '@react-navigation/native'
import LoadingComponent from '../Components/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setComesFrom, setJustSignedUp, setSignUpFirstScreenData, setUser } from '../redux/generalSlice'

const RegisterScreen = ({navigation}) => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: ''
    })
    const [validation, setValidation] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const [isConPassVisible, setIsConfPassVisible] = useState(false)
    const [signUpUser, {isLoading}] = useSignUpUserMutation()
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoadingCustom, setIsLoadingCustom] = useState(false)
    const [isLoadingScreen, setIsLoadingScreen] = useState(false) //check later for coming from home screen
    const dispatch = useDispatch()
    const {signUpFirstScreenData} = useSelector(state => state.general)

    const handleBack = () => {
        navigation.navigate('AuthTabScreens', {screen: 'AuthScreen'})
    }

    const handleConfirm = async () => {
        if(!data.first_name || !data.last_name || !data.password || !data.confirm_password){
            setValidation(true)
            return
        }

        if(data.password.length < 6 && data.password.length > 0){
            setValidation(true)
            return
        }

        if(data.password !== data.confirm_password){
            setValidation(true)
            return
        }

        setIsLoadingCustom(true)

        try{
            const {error, data: signUpData} = await signUpUser({...data, email: signUpFirstScreenData?.email})
            
            if(error){
                setErrorMessage('Došlo je do greške')
                return
            }

            if(signUpData.success){
                dispatch(setSignUpFirstScreenData({...signUpFirstScreenData, email: ''}))
                dispatch(setJustSignedUp(true))
                dispatch(setUser(signUpData.result))
                dispatch(setComesFrom('auth'))
                // navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
                navigation.navigate('StackTabScreens', {screen: 'WelcomeScreen'})

            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoadingCustom(false)
        }
    }

    if(isLoadingScreen) return <LoadingComponent />

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
                                isError={validation && !data.first_name}
                                errorMessage={'obavezno'}
                                value={data.first_name}
                                onChangeText={text => setData({...data, first_name: text})}
                            />

                            <CustomInput 
                                classNameCustom="mt-2"
                                label="Prezime"
                                placeholder="Prezime"
                                isError={validation && !data.last_name}
                                errorMessage={'obavezno'}
                                value={data.last_name}
                                onChangeText={text => setData({...data, last_name: text})}
                            />

                            <CustomInput 
                                classNameCustom="mt-2"
                                label="Lozinka"
                                placeholder="Lozinka"
                                inputIcon={()=>
                                    <TouchableOpacity onPress={() => setIsPassVisible(prev => !prev)}>
                                        <Feather name={`${isPassVisible ? 'eye' : 'eye-off'}`} size={24} color="black" />
                                    </TouchableOpacity>
                                }
                                iconSide={'right'}
                                secureTextEntry={!isPassVisible}
                                isError={validation && (!data.password || (data.password.length < 6 && data.password.length > 0))}
                                errorMessage={!data.password ? 'obavezno' : 'mora sadržati najmanje 6 karaktera'}
                                value={data.password}
                                onChangeText={text => setData({...data, password: text})}
                            />

                            <CustomInput 
                                classNameCustom="mt-2"
                                label="Potvrdi lozinku"
                                placeholder="Potvrdi lozinku"
                                inputIcon={()=>
                                    <TouchableOpacity onPress={() => setIsConfPassVisible(prev => !prev)}>
                                        <Feather name={`${isConPassVisible ? 'eye' : 'eye-off'}`} size={24} color="black" />
                                    </TouchableOpacity>
                                }
                                iconSide={'right'}
                                secureTextEntry={!isConPassVisible}
                                isError={validation && (!data.confirm_password || (data.confirm_password != data.password && data.confirm_password.length > 0 && data.password.length > 0))}
                                errorMessage={!data.confirm_password ? 'obavezno' : 'mora biti ista kao prva lozinka'}
                                value={data.confirm_password}
                                onChangeText={text => setData({...data, confirm_password: text})}
                            />
                        </View>

                        <View className="mt-10">
                            <CustomButton 
                                 onPress={handleConfirm}
                                 text={'Potvrdi'}
                                 isLoading={isLoading || isLoadingCustom}
                                 isError={!!errorMessage}
                                 variant={'dark'}
                            />
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