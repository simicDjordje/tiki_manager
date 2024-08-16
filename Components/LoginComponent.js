import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomComponents/CustomInput'
import Feather from '@expo/vector-icons/Feather'
import Text from './CustomComponents/CustomText'

const LoginComponent = ({setAuthType}) => {
    const [passwordVisible, setPasswordVisible] = useState(false)


  return (
    <View>
        <View className="flex flex-row justify-center items-center">
            <Text className="text-textPrimary text-2xl" bold>Uloguj se</Text>
        </View>

        <View className="bg-textSecondary w-full h-0.5 mt-2"></View>

        <View className="mt-4">
            <CustomInput 
                label={'Email'}
                placeholder={'Unesi email'}
            />

            <CustomInput 
                label={'Šifra'}
                placeholder={'Unesi šifru'}
                classNameCustom="mt-3"
                inputIcon={()=>
                    <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
                        <Feather name={`${passwordVisible ? 'eye' : 'eye-off'}`} size={24} color="black" />
                    </TouchableOpacity>
                }
                iconSide={'right'}
                secureTextEntry={!passwordVisible}
                
            />
        </View>

        <View className="mt-10">
            <TouchableOpacity className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center">
                <Text className="text-white text-lg" bold>Dalje</Text>
            </TouchableOpacity>
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