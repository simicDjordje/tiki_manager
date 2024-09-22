import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'
import Feather from '@expo/vector-icons/Feather'
import CreateServiceModal from '../Components/CreateServiceModal'
import CustomInput from '../Components/CustomComponents/CustomInput'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateServiceMutation } from '../redux/apiCore'
import LootieLoader from '../Components/LootieAnimations/Loader'
import { setActiveService } from '../redux/generalSlice'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonServicesScreen = ({navigation}) => {
  const [isCreateServiceModalVisible, setIsCreateServiceModalVisible] = useState(false)
  const {currentSalon: salonData, activeCategory} = useSelector(state => state.general)
  const [servicesFiltered, setServicesFiltered] = useState(activeCategory?.services || [])
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesCategoriesScreen'})
  }

  const handleToService = (service) => {
    dispatch(setActiveService(service))
    navigation.navigate('StackTabScreens', {screen: 'ServiceScreen'})
  }

  const beginAddService = () => {
    setIsCreateServiceModalVisible(true)
  }

  useEffect(()=>{
     if(!searchText){
        setServicesFiltered(activeCategory?.services)
     }else{
        const filteredArray = servicesFiltered.filter(i => i.name.includes(searchText) || i.name.startsWith(searchText))
        setServicesFiltered(filteredArray)
     }
  }, [activeCategory, searchText])

  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgSecondary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonData?.name.length > 34 ? `${salonData?.name.substring(0, 34)}...` : salonData?.name}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="w-full flex flex-row justify-between items-center mt-6">
                <View>
                  <Text className="text-2xl" bold>{activeCategory?.name || ''}</Text>
                </View>
                <TouchableOpacity onPress={beginAddService} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            
            {!activeCategory && 
                <View className="h-4/6 flex flex-col justify-center items-center w-full">
                    <LootieLoader dark={true} d={70} />
                </View>
            }

            {activeCategory && activeCategory?.services?.length === 0 && <View>
                <Text className="text-center text-textMid" bold>Usluge su neophodne za funkcionisanje salona</Text>
                <Text className="text-center text-textMid">Kreiraj usluge i dodeli ih članovima salona kako bi mogli da primaju rezervacije</Text>
                <Text className="text-center text-textMid">Ako član salona nema nijednu dodeljenu uslugu, biće neaktivan</Text>
            </View>}

            <View className="flex-1 w-full mb-3 mt-10">
                {activeCategory && activeCategory?.services?.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg mb-3" bold>Dodaj uslugu</Text>
                        <TouchableOpacity onPress={beginAddService} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
            </View>

              

              {activeCategory && activeCategory?.services?.length > 0 && 
                <ScrollView className="w-full -mt-14">
                    <View className="min-h-screen">
                        <View>
                            <CustomInput 
                                label={'Pretraga'}
                                placeholder={'Pretraži usluge'}
                                inputIcon={() => (<FontAwesome name="search" size={24} color="black" />)}
                                iconSide='right'
                                value={searchText}
                                onChangeText={(text) => setSearchText(text)}
                            />
                        </View>

                        <View className="flex flex-row justify-start items-center w-full mt-10">
                            <Text className="text-textMid" semi>Usluge</Text>
                        </View>

                        <View className="flex flex-col justify-between">
                        
                        {servicesFiltered.map((service, index) => {
                            
                            return (
                                <TouchableOpacity key={service?._id} onPress={() => handleToService(service)} className={`bg-bgPrimary w-full mt-4 ${service?.users?.length > 0 ? 'h-56' : 'h-48'} rounded-xl p-4`}>
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="text-textPrimary text-xl" bold>{service?.name}</Text>
                                        <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                                    </View>
                                    <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                                    <View className="flex-1">
                                        <View className="flex flex-row justify-between items-center mt-2">
                                            <Text semi>{service?.description.length > 50 ? `${service?.description.substring(0, 40)}...` : service?.description}</Text>
                                        </View>

                                        <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>


                                        <View className="flex flex-row justify-between items-center mt-2">
                                            <Text>Cena: </Text>
                                            <Text semi>{parseFloat(service?.price).toFixed(2)} RSD</Text>
                                        </View>
                                        {/* <View className="flex flex-row justify-between items-center mt-2">
                                            <Text>Vreme trajanja usluge: </Text>
                                            <Text semi>1h 30min</Text>
                                        </View> */}

                                        <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>
                                        
                                        {service?.users?.length > 0 && 
                                            <View className="flex flex-row justify-start items-center mt-2">
                                                <Text>Članovi sa ovom uslugom: </Text>
                                            </View>
                                        }
                                        <View className="flex flex-row justify-start items-center mt-2">
                                            {service?.users.length === 0 && <Text semi className="text-red-700">Usluga nije dodeljena nijednom članu</Text>}
                                            {service?.users.length > 0 && service?.users.slice(0, 8).map((user, indec) => {
                                                return (
                                                    <Image
                                                        key={user?._id}
                                                        className="w-10 h-10 rounded-full border-2 border-appColorDark -ml-2"
                                                        source={`http://192.168.1.5:5000/photos/profile-photo${user?._id ? user?._id : user}.png`}
                                                        placeholder={{ blurhash }}
                                                        contentFit="cover"
                                                        transition={1000}
                                                    />
                                                )
                                            })
                                                
                                            }
                                                 
                                            {service?.users.length > 8 && 
                                                <View className="w-10 h-10 rounded-full border-2 border-textMid bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                                    <Text className="text-white">+{service?.users.length - 8}</Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                        </View>
                    </View>

                    <View className="mb-44"></View>
                </ScrollView>
              }
          </View>
        </View>

        <CreateServiceModal 
            isModalVisible={isCreateServiceModalVisible}
            setIsModalVisible={setIsCreateServiceModalVisible}
        />
    </SafeAreaView>
  )
}

export default SalonServicesScreen