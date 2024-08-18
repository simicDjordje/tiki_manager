import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonScreen = ({navigation}) => {
    const [logo, setLogo] = useState('https://marketplace.canva.com/EAFbDkqUoJ8/1/0/1600w/canva-beige-brown-yellow-beauty-hair-salon-logo-mcTtlsA1WxM.jpg')
    const [services, setServices] = useState([1])
    const [workers, setWorkers] = useState([1])
    const salonName = 'Beauty salon PK'


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


  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonName.length > 34 ? `${salonName.substring(0, 34)}...` : salonName}</Text>
        </View>

        <ScrollView>
            <View className="px-4 mt-10">
                <View className="flex flex-row justify-between items-center">
                    <TouchableOpacity onPress={handleToLogoScreen} 
                        className="flex flex-col justify-center items-center mb-4 bg-bgPrimary py-2 px-2 rounded-xl w-[48%] h-40">
                        <View className="flex flex-row justify-start items-center w-full">
                            <Text className="text-textMid" semi>Logo</Text>
                        </View>
                        <View className="bg-textSecondary my-2 w-full" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-center items-center w-full flex-1">
                            <Image
                                className="w-20 h-20 rounded-full border-2 border-textPrimary mb-2"
                                source={logo}
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
                        className="flex flex-col justify-center items-center mb-4 bg-bgPrimary py-2 px-2 rounded-xl w-[48%] h-40">
                        <View className="flex flex-row justify-start items-center w-full">
                            <Text className="text-textMid" semi>Slike</Text>
                        </View>
                        <View className="bg-textSecondary my-2 w-full" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-start items-center w-full flex-1 flex-wrap -mt-0.5">
                            <Image
                                className="w-9 h-9 border-textPrimary rounded-lg mx-1 my-0.5"
                                style={{borderWidth: 0.5}}
                                source={require('../assets/salon4.jpg')}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                            <Image
                                className="w-9 h-9 border-textPrimary rounded-lg mx-1 my-0.5"
                                style={{borderWidth: 0.5}}
                                source={require('../assets/salon1.jpg')}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                            <Image
                                className="w-9 h-9 border-textPrimary rounded-lg mx-1 my-0.5"
                                style={{borderWidth: 0.5}}
                                source={require('../assets/salon2.jpg')}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                            <Image
                                className="w-9 h-9 border-textPrimary rounded-lg mx-1 my-0.5"
                                style={{borderWidth: 0.5}}
                                source={require('../assets/salon3.jpg')}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                            <Image
                                className="w-9 h-9 border-textPrimary rounded-lg mx-1 my-0.5"
                                style={{borderWidth: 0.5}}
                                source={require('../assets/salon1.jpg')}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                        </View>

                        <View className="bg-textSecondary my-1 w-full" style={{height: 0.5}}></View>
                        <View className="flex flex-row justify-end items-center w-full">
                            <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleToNameDescScreen} className="flex flex-row justify-between items-center bg-bgPrimary rounded-xl p-2">
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Naziv:</Text>
                        <Text className="text-md text-textPrimary" bold>{salonName}</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToNameDescScreen} className="flex flex-row justify-between items-center bg-bgPrimary rounded-xl p-2 mt-4">
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Opis:</Text>
                        <Text className="text-md text-textPrimary" bold>
                            Lash and Brow studio PK
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToLocationScreen} className="flex flex-row justify-between items-center bg-bgPrimary rounded-xl p-2 mt-4">
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Lokacija:</Text>
                        <Text className="text-md text-textPrimary" bold>
                            Kraljevica Jugovica 3/4, Novi Sad
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToServicesCategoriesScreen} className="flex flex-row justify-between items-center bg-bgPrimary rounded-xl p-2 mt-4">
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Usluge:</Text>
                        {services.length === 0 && 
                            <Text className="text-md text-red-500" bold>
                                Dodaj usluge
                            </Text>
                        }

                        {services.length > 0 && 
                            <Text className="text-md text-textPrimary" bold>
                                Pogledaj / Izmeni usluge ({services.length})
                            </Text>
                        }
                    </View>
                    {services.length === 0 && 
                    <View className="p-1 bg-textPrimary rounded-full">
                        <Entypo name="plus" size={20} color="white" />
                    </View>}
                    {services.length > 0 &&   <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />}
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row justify-between items-center bg-bgPrimary rounded-xl p-2 mt-4">
                    <View className="flex flex-col justify-between items-start">
                        <Text className="text-textMid mb-2" semi>Članovi salona:</Text>
                        {workers.length === 0 && 
                            <Text className="text-md text-red-500" bold>
                                Kreiraj tim salona
                            </Text>
                        }

                        {workers.length > 0 && <View className="bg-textSecondary my-1.5 w-full" style={{height: 0.5}}></View>}

                        {workers.length > 0 && 
                            <View className="flex flex-row justify-start items-center p-1 bg-bgPrimary rounded-2xl">
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColorDark"
                                        source={require('../assets/fpp.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                                        source={require('../assets/e2.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColorDark -ml-2"
                                        source={require('../assets/fpp2.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                                        source={require('../assets/e4.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                                        source={require('../assets/e4.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                />
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                                        source={require('../assets/e2.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColorDark -ml-2"
                                        source={require('../assets/fpp2.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                                        source={require('../assets/e4.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                <Image
                                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                                        source={require('../assets/e4.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                />
                                
                                <View className="w-8 h-8 rounded-full border-2 border-textMid bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                    <Text className="text-white">+4</Text>
                                </View>
                                
                
                            </View>
                        }
                    </View>
                    {workers.length === 0 && 
                    <View className="p-1 bg-textPrimary rounded-full">
                        <Entypo name="plus" size={20} color="white" />
                    </View>}
                    {workers.length > 0 &&   <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />}
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SalonScreen