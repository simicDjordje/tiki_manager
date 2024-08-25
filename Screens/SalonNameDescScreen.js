import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Text from '../Components/CustomComponents/CustomText'
import CustomInput from '../Components/CustomComponents/CustomInput'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonNameDescScreen = () => {
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleSave = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  
  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonName.length > 34 ? `${salonName.substring(0, 34)}...` : salonName}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="flex flex-row justify-start items-center mt-6 w-full">
              <Text className="text-2xl" bold>Izmeni naziv i opis</Text>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-10" style={{height: 0.5}}></View>

            <CustomInput 
                label={'Naziv salona'}
                placeholder={'Unesi naziv salona'}
                value={'Beauty salon PK'}
            />

            <CustomInput 
                label={'Opis salona ili usluga'}
                placeholder={'Unesi kratak opis salona ili usluga'}
                multiline={true}
                numberOfLines={3}
                classNameCustom='mt-4'
                value={'Lash and Brow studio PK'}
            />
          </View>

          <View>
            <TouchableOpacity 
                onPress={handleSave}
                className="bg-appColorDark rounded-xl p-4 flex flex-row justify-center items-center mb-24">
                <Text className="text-white text-lg" bold>Sačuvaj</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default SalonNameDescScreen