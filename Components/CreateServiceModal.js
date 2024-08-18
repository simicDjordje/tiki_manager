import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import CustomInput from './CustomComponents/CustomInput'
import CustomButton from './CustomComponents/CustomButton'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const CreateServiceModal = ({isModalVisible, setIsModalVisible}) => {
    const [isSuccess, setIsSuccess] = useState(false)
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
    const [workerSetDuration, setWorkerSetDuration] = useState(false)

    const closeModal = () => {
        setIsModalVisible(false)
        setIsSuccess(false)
    }

    useEffect(()=>{
        if(!isSuccess) return

        setTimeout(()=>{
            setIsModalVisible(false)
            setIsSuccess(false)
        }, 3000)
    }, [isSuccess])

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className="h-full w-full">
                <View 
                    className="h-full w-full bg-bgPrimary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Kreiranje nove usluge</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    <View className="h-5/6 flex flex-col justify-between">
                        <View className="flex-1">
                            <CustomInput 
                                label={'Naziv usluge'}
                                placeholder={'Unesi naziv usluge'}
                                classNameCustom="mt-4"
                            />

                            <CustomInput 
                                label={'Opis usluge'}
                                placeholder={'Unesi kratak opis usluge'}
                                classNameCustom='mt-3'
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
                            />

                            <View className="flex flex-row justify-between items-center">
                                <Text className={`mb-1 text-md mt-4`} semi>Vreme trajanja usluge</Text>
                                <Text className={`mb-1 text-xs mt-4`}>Skroluj za još</Text>
                            </View>
                            <ScrollView 
                                className="mb-2 -mr-10"
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
                                        <TouchableOpacity key={index} onPress={()=>{setSelectedDuration(duration)}} className={`w-20
                                         h-14 ${isSelected ? 'bg-appColor' : 'bg-bgSecondary'} ml-2 rounded-xl flex flex-row justify-center items-center ${lastItem && 'mr-20'}`}>
                                            <Text semi className={`${isSelected ? 'text-white' : 'text-textPrimary'}`}>{duration.label}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>

                            <Text className={`mb-1 text-md mt-2`} semi>Možeš dodeliti uslugu članovima ovde ili kasnije</Text>
                            <ScrollView 
                                className="mb-2 -mr-10"
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft: 5,
                                    paddingVertical: 20
                            }}>
                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-4 ${'border-appColor'}`}
                                        source={require(`../assets/e1.jpg`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2 text-appColorDark" semi>Marko</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-4 ${'border-appColor'}`}
                                        source={require(`../assets/e5.jpg`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2 text-appColorDark" semi>Dragan</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-2 ${'border-textPrimary'}`}
                                        source={require(`../assets/fpp.png`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2">Jovanka</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-4 ${'border-appColor'}`}
                                        source={require(`../assets/fpp2.png`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2 text-appColorDark" semi>Katarina</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-2 ${'border-textPrimary'}`}
                                        source={require(`../assets/e4.jpg`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2">Jorgovan</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-2 ${'border-textPrimary'}`}
                                        source={require(`../assets/e1.jpg`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2">Natalija</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex flex-col justify-between items-center ml-2 mr-20">
                                    <Image
                                        className={`w-16 h-16 rounded-full border-2 ${'border-textPrimary'}`}
                                        source={require(`../assets/e1.jpg`)}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <Text className="text-xs mt-2">Natalija</Text>
                                </TouchableOpacity>

                                
                            </ScrollView>
                        </View>
                        


                        <View className="flex flex-col justify-center items-center">
                            <CustomButton 
                                onPress={()=> setIsSuccess(true)}
                                text={'Potvrdi'}
                                isSuccess={isSuccess}
                            />
                        </View>
                    </View>
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default CreateServiceModal