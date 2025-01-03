import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'
import { useFocusEffect } from '@react-navigation/native'
import { useGetSalonByIdMutation } from '../redux/apiCore'
import LootieLoader from '../Components/LootieAnimations/Loader'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSalon } from '../redux/generalSlice'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonScreen = ({navigation}) => {
    const {currentSalon: salonData} = useSelector(state => state.general)
    const [getSalonById, {isLoading}] = useGetSalonByIdMutation()
    const [services, setServices] = useState([])
    const dispatch = useDispatch()

    useFocusEffect(useCallback(()=>{
        getSalonById({salonId: salonData?._id})
    }, []))

    useEffect(()=>{
        if(!salonData) return
        
        const servicesArray = salonData?.categories?.map(i => i.category.services).flat()
        setServices(servicesArray)
    }, [salonData])


    const handleBack = () => {
        navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
    }

    const handleToLogoScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonLogoScreen'})
    }

    const handleToImagesScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonImagesScreen'})
    }

    const handleToNameDescScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonNameDescScreen'})
    }

    const handleToLocationScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonLocationScreen'})
    }

    const handleToServicesCategoriesScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonServicesCategoriesScreen'})
    }

    const handleToSalonWorkersScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonWorkersScreen'})
    }



  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgSecondary h-30">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            {salonData && <Text className="text-textPrimary text-lg" bold>{salonData?.name && salonData?.name.length > 34 ? `${salonData?.name.substring(0, 34)}...` : salonData?.name}</Text>}
        </View>
        
        {(!salonData && isLoading) && 
            <View className="h-[90%] flex flex-col justify-center items-center">
                <LootieLoader dark={true} d={70} />
            </View>
        }

        {salonData && <ScrollView>
            <View className="px-4 mt-4">
                <View className="flex flex-row justify-between items-center mt-6 w-full">
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-2xl" bold>Podešavanja salona</Text>
                        <View className="bg-red-700 py-1 px-2 rounded-2xl mt-2">
                            <Text className="text-white text-xs" bold>Neaktivan</Text>
                        </View>
                    </View>
                    {/* <Ionicons name="settings-sharp" size={34} color="black" /> */}
                </View>
                <View className="bg-textSecondary mt-8 w-full mb-4" style={{height: 0.5}}></View>

                <View>
                    {salonData?.workers.length == 0 && services?.length === 0 && <Text className="text-textMid mb-3" semi>Moraš dodati usluge i članove salona</Text>}
                    {salonData?.workers.length > 0 && services?.length === 0 && <Text className="text-textMid mb-3" semi>Moraš dodati usluge</Text>}
                    {salonData?.workers.length == 0 && services?.length > 0 && <Text className="text-textMid mb-3" semi>Moraš dodati članove salona</Text>}
                    <TouchableOpacity className="bg-textPrimary rounded-xl mb-6 h-14 flex flex-row justify-between items-center w-full px-2">
                        <View className="flex-1 flex flex-row justify-center items-center">
                            <Text className="text-white text-lg ml-4" bold>Aktiviraj salon</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row justify-between items-center">
                    <TouchableOpacity onPress={handleToLogoScreen} 
                        className="flex flex-col justify-center items-center mb-4 bg-bgSecondary border-textSecondary py-2 px-2 rounded-xl w-[48%] h-40" style={{borderWidth: 0.5}}>
                        <View className="flex flex-row justify-start items-center w-full">
                            <Text className="text-textMid" semi>Logo</Text>
                        </View>
                        <View className="bg-textSecondary my-2 w-full" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-center items-center w-full flex-1">
                            <Image
                                className="w-20 h-20 rounded-full mb-2"
                                source={`http://192.168.1.14:5000/photos/salon-logo_${salonData?.logoId}.png`}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                        </View>
                        <View className="bg-textSecondary w-full mb-1" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-end items-center w-full">
                            <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={handleToImagesScreen}
                        className="flex flex-col justify-center items-center mb-4 bg-bgSecondary border-textSecondary py-2 px-2 rounded-xl w-[48%] h-40" style={{borderWidth: 0.5}}>
                        <View className="flex flex-row justify-start items-center w-full">
                            <Text className="text-textMid" semi>Slike</Text>
                        </View>
                        <View className="bg-textSecondary my-2 w-full" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-start items-center w-full flex-1 flex-wrap -mt-0.5">
                            {salonData?.salonImageIds?.map((imageId, index) => {
                                return (
                                    <Image
                                        key={imageId + index}
                                        className="w-9 h-9 rounded-lg mx-1 my-0.5"
                                        // style={{borderWidth: 0.5}}
                                        source={`http://192.168.1.14:5000/photos/salon-photo_${imageId}.png`}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                )
                            })}
                        </View>

                        <View className="bg-textSecondary my-1 w-full" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-end items-center w-full">
                            <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleToNameDescScreen} className="flex flex-row justify-between items-center bg-bgSecondary border-textSecondary rounded-xl p-2" style={{borderWidth: 0.5}}>
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Naziv:</Text>
                        <Text className="text-md text-textPrimary" bold>{salonData?.name}</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToNameDescScreen} className="flex flex-row justify-between items-center bg-bgSecondary border-textSecondary rounded-xl p-2 mt-4" style={{borderWidth: 0.5}}>
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Opis:</Text>
                        <Text className="text-md text-textPrimary" bold>
                            {salonData?.description}
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToLocationScreen} className="flex flex-row justify-between items-center bg-bgSecondary border-textSecondary rounded-xl p-2 mt-4" style={{borderWidth: 0.5}}>
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Lokacija:</Text>
                        <Text className="text-md text-textPrimary" bold>
                            {salonData?.address}
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToServicesCategoriesScreen} className="flex flex-row justify-between items-center bg-bgSecondary border-textSecondary rounded-xl p-2 mt-4" style={{borderWidth: 0.5}}>
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Usluge:</Text>
                        {services?.length === 0 && 
                            <Text className="text-md text-red-700" bold>
                                Dodaj usluge
                            </Text>
                        }

                        {services?.length > 0 && 
                            <Text className="text-md text-textPrimary" bold>
                                Pogledaj / Izmeni usluge ({services?.length})
                            </Text>
                        }
                    </View>
                    {services?.length === 0 && 
                    <View className="p-1 bg-textPrimary rounded-full">
                        <Entypo name="plus" size={20} color="white" />
                    </View>}
                    {services?.length > 0 && <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />}
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={handleToSalonWorkersScreen}
                className="flex flex-row justify-between items-center bg-bgSecondary border-textSecondary rounded-xl p-2 mt-4" style={{borderWidth: 0.5}}>
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Članovi salona:</Text>
                        {salonData?.workers?.length === 0 && 
                            <Text className="text-md text-red-700" bold>
                                Dodaj članove salona
                            </Text>
                        }

                        {salonData?.workers?.length > 0 && <View className="bg-textSecondary my-1.5 w-full" style={{height: 0.5}}></View>}

                        {salonData?.workers?.length > 0 && 
                            <View className="flex flex-row justify-start items-center p-1 bg-bgPrimary rounded-2xl">
                                {salonData?.workers.length > 0 && salonData?.workers.slice(0, 9).map((worker, index) => {
                                    const keyString = worker?._id ? worker?._id : worker
                                    return (
                                        <Image
                                            key={keyString + index}
                                            className="w-8 h-8 rounded-full border-2 border-appColorDark -ml-2"
                                            source={`http://192.168.1.14:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
                                            placeholder={{ blurhash }}
                                            contentFit="cover"
                                            transition={1000}
                                        />
                                    )
                                })}
                                
                                {salonData?.workers.length > 9 && 
                                    <View className="w-8 h-8 rounded-full border-2 border-textMid bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                        <Text className="text-white">+{salonData?.workers.length - 9}</Text>
                                    </View>
                                }
                            </View>
                        }
                    </View>
                    {salonData?.workers?.length === 0 && 
                    <View className="p-1 bg-textPrimary rounded-full">
                        <Entypo name="plus" size={20} color="white" />
                    </View>}
                    {salonData?.workers?.length > 0 && <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />}
                </TouchableOpacity>
            </View>

            <View className="mb-20"></View>
        </ScrollView>}
    </SafeAreaView>
  )
}

export default SalonScreen