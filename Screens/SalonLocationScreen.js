import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Text from '../Components/CustomComponents/CustomText'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonLocationScreen = () => {
  const salonName = 'Beauty salon PK'
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleSave = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handlePlaceSelected = (data, details) => {
    console.log(data.description)
    // dispatch(setSearchData({ carLocation: data.description }))
    // navigation.navigate('MainTabs', {screen: 'Search'})
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
              <Text className="text-2xl" bold>Izmeni lokaciju</Text>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-10" style={{height: 0.5}}></View>
            <View className="min-h-full w-full">
                <Text className="mb-1 text-md" semi>Lokacija salona</Text>
                <GooglePlacesAutocomplete
                    placeholder='Pretraži adresu'
                    query={{
                        key: 'AIzaSyAblphXgwdp65CIEBWrfrQdAASIcSDlr98',
                        language: 'sr-Latn', // Specify the language as Serbian
                        components: 'country:rs', // Restrict results to Serbia
                        types: 'geocode', // Restrict results to geographical locations
                    }}
                    onPress={handlePlaceSelected}
                    styles={{
                        textInput: {
                            marginRight: 0,
                            height: 60,
                            paddingHorizontal: 20,
                            color: '#5d5d5d',
                            fontSize: 14,
                            borderRadius: 10,
                            borderWidth: 1, 
                            borderColor: '#babbb6',
                            },
                    }}
                    />
            </View>
            
          </View>

          <View>
            <TouchableOpacity 
                onPress={handleSave}
                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mb-24">
                <Text className="text-white text-lg" bold>Sačuvaj</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default SalonLocationScreen