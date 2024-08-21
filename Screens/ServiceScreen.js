import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Text from '../Components/CustomComponents/CustomText'
import CustomInput from '../Components/CustomComponents/CustomInput'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import ServiceWorkersModal from '../Components/ServiceWorkersModal'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ServiceScreen = () => {
  const [isServiceWorkerModalVisible, setIsServiceWorkerModalVisible] = useState(false)
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'
  const [durations, setDurations] = useState([
    { value: 900, label: '15min' },       // 15 minutes
    { value: 1800, label: '30min' },      // 30 minutes
    { value: 3600, label: '1h' },         // 1 hour
    { value: 5400, label: '1h 30min' },   // 1 hour 30 minutes
    { value: 7200, label: '2h' },         // 2 hours
    { value: 9000, label: '2h 30min' },   // 2 hours 30 minutes
    { value: 10800, label: '3h' },        // 3 hours
    { value: 12600, label: '3h 30min' },  // 3 hours 30 minutes
    { value: 14400, label: '4h' },        // 4 hours
    { value: 16200, label: '4h 30min' },  // 4 hours 30 minutes
    { value: 18000, label: '5h' },        // 5 hours
    { value: 21600, label: '6h' },        // 6 hours
    { value: 25200, label: '7h' },        // 7 hours
    { value: 28800, label: '8h' },        // 8 hours
    { value: 32400, label: '9h' },        // 9 hours
    { value: 36000, label: '10h' }        // 10 hours
   ])
   const [selectedDuration, setSelectedDuration] = useState({ value: 1800, label: '30min' })
   const [workers, setWorkers] = useState([1])

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
  }

  const handleSave = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
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
                <View>
                    <Text className="text-2xl" bold>Mikropigmentacija obrva</Text>
                    <Text semi>Trajna šminka</Text>
                </View>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-4" style={{height: 0.5}}></View>

            {/* <ScrollView> */}
            <View>
                <View className="min-h-screen">
                    <CustomInput 
                        label={'Naziv usluge'}
                        placeholder={'Unesi naziv usluge'}
                        value={'Mikropigmentacija obrva'}
                    />

                    <CustomInput 
                        label={'Opis usluge'}
                        placeholder={'Unesi kratak opis usluge'}
                        multiline={true}
                        numberOfLines={3}
                        classNameCustom='mt-4'
                        value={'Bla bla bla neki opis ove usluge neki text da popuni ovaj prostor'}
                    />

                    <CustomInput 
                        label={'Cena usluge'}
                        placeholder={'Unesi cenu usluge'}
                        classNameCustom='mt-3'
                        inputIcon={()=>(
                            <View className="border-textSecondary flex flex-row justify-center items-center h-full" style={{borderLeftWidth: 0.5}}>
                                <Text className="text-textMid ml-1">RSD</Text>
                            </View>
                        )}
                        iconSide='right'
                        value={'800.00'}
                    />

                    {/* <View className="flex flex-row justify-between items-center w-full">
                        <Text className={`mb-1 text-md mt-4`} semi>Vreme trajanja usluge</Text>
                        <Text className={`mb-1 text-xs mt-4`}>Skroluj desno za još</Text>
                    </View> */}
                    {/* <View className="mb-32 -mr-10">
                        <ScrollView 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingLeft: 5,
                                paddingVertical: 20
                        }}>
                            {durations.map((duration, index) => {
                                const indexPlusOne = index + 1
                                const lastItem = durations.length == indexPlusOne
                                const isSelected = selectedDuration.value === duration.value
                                return (
                                    <TouchableOpacity key={index} onPress={()=>{setSelectedDuration(duration)}} className={`w-24
                                        h-14 ${isSelected ? 'bg-appColor' : 'bg-bgPrimary'} ml-2 rounded-xl flex flex-row justify-center items-center ${lastItem && 'mr-20'}`}>
                                        <Text semi className={`${isSelected ? 'text-white' : 'text-textPrimary'}`}>{duration.label}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View> */}
                    
                    <Text className={`mb-1 text-md mt-4`} semi>Dodeli ili ukloni uslugu</Text>
                    <TouchableOpacity 
                        onPress={() => setIsServiceWorkerModalVisible(true)}
                        className="w-full h-16 border-textSecondary flex flex-row justify-between items-center rounded-xl border p-2">
                        <View className="flex-1">
                            {workers.length === 0 && <Text className="text-textMid" semi>Usluga nije dodeljena nikom</Text>}
                            {workers.length > 0 && 
                                <View className="flex flex-row justify-start items-center">
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
                        <View>
                            {workers.length === 0 && <Entypo name="plus" size={24} color="#232323" />}
                            {workers.length > 0 && <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={handleSave}
                        className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mt-20">
                        <Text className="text-white text-lg" bold>Sačuvaj</Text>
                    </TouchableOpacity>
                </View>
                <View className="mb-16"></View>
            {/* </ScrollView> */}
            </View>
            <ServiceWorkersModal 
                isModalVisible={isServiceWorkerModalVisible}
                setIsModalVisible={setIsServiceWorkerModalVisible}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default ServiceScreen