import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
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


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonServicesScreen = () => {
  const [services, setServices] = useState([1])
  const [isCreateServiceModalVisible, setIsCreateServiceModalVisible] = useState(false)
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesCategoriesScreen'})
  }

  const handleToService = () => {
    navigation.navigate('StackTabScreens', {screen: 'ServiceScreen'})
  }

  const handleSave = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const beginAddService = () => {
    setIsCreateServiceModalVisible(true)
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
            <View className="w-full flex flex-row justify-between items-center mt-6">
                <View>
                  <Text className="text-2xl" bold>Trajna šminka</Text>
                </View>
                <TouchableOpacity onPress={beginAddService} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            
            {services.length === 0 && <View>
                <Text className="text-center text-textMid" bold>Usluge su neophodne za funkcionisanje salona</Text>
                <Text className="text-center text-textMid">Kreiraj usluge i dodeli ih članovima salona kako bi mogli da primaju rezervacije</Text>
                <Text className="text-center text-textMid">Ako član salona nema nijednu dodeljenu uslugu, biće neaktivan</Text>
            </View>}

            <View className="flex-1 w-full mb-3 mt-10">
                {services.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg mb-3" bold>Dodaj uslugu</Text>
                        <TouchableOpacity onPress={beginAddService} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
            </View>

           

              {services.length > 0 && 
                <ScrollView className="w-full -mt-14">
                    <View className="min-h-screen">
                        <View>
                            <CustomInput 
                                label={'Pretraga'}
                                placeholder={'Pretraži usluge'}
                                inputIcon={() => (<FontAwesome name="search" size={24} color="black" />)}
                                iconSide='right'
                            />
                        </View>

                        <View className="flex flex-row justify-start items-center w-full mt-10">
                            <Text className="text-textMid" semi>Kategorije usluga</Text>
                        </View>

                        <View className="flex flex-col justify-between">
                        
                        <TouchableOpacity onPress={handleToService} className="bg-bgPrimary w-full mt-4 rounded-xl p-4">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-textPrimary text-xl" bold>Mikropigmentacija obrva</Text>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                            </View>
                            <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                            <View className="flex-1">
                                <View className="flex flex-row justify-between items-center mt-2">
                                    <Text semi>Bla bla bla neki opis ove usluge neki text da popuni ovaj prostor</Text>
                                </View>

                                <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>


                                <View className="flex flex-row justify-between items-center mt-2">
                                    <Text>Cena: </Text>
                                    <Text semi>800.00 RSD</Text>
                                </View>
                                {/* <View className="flex flex-row justify-between items-center mt-2">
                                    <Text>Vreme trajanja usluge: </Text>
                                    <Text semi>1h 30min</Text>
                                </View> */}

                                <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                                <View className="flex flex-row justify-start items-center mt-2">
                                    <Image
                                        className="w-10 h-10 rounded-full border-2 border-appColorDark"
                                        source={require('../assets/fpp.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full border-2 border-appColorDark -ml-2"
                                        source={require('../assets/fpp2.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full border-2 border-appColorDark -ml-2"
                                        source={require('../assets/e1.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full border-2 border-appColorDark -ml-2"
                                        source={require('../assets/e4.jpg')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full border-2 border-appColorDark"
                                        source={require('../assets/fpp.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Image
                                        className="w-10 h-10 rounded-full border-2 border-appColorDark -ml-2"
                                        source={require('../assets/fpp2.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <View className="w-10 h-10 rounded-full border-2 border-textMid bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                        <Text className="text-white">+4</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
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