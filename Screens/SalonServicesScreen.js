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

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonServicesScreen = () => {
  const [services, setServices] = useState([])
  const [isCreateServiceModalVisible, setIsCreateServiceModalVisible] = useState(false)
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
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
                  <Text className="text-2xl" bold>Usluge salona</Text>
                  <Text semi className="text-appColorDark">Usluge su obavezne</Text>
                </View>
                <TouchableOpacity onPress={beginAddService} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            
            <Text className="text-center text-textMid" bold>Usluge su neophodne za funkcionisanje salona</Text>
            <Text className="text-center text-textMid">Kreiraj usluge i dodeli ih članovima salona kako bi mogli da primaju rezervacije</Text>
            <Text className="text-center text-textMid">Ako član salona nema nijednu dodeljenu uslugu, biće neaktivan</Text>


            <View className="flex-1 w-full mb-3 -mt-4">
                {services.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg mb-3" bold>Dodaj uslugu</Text>
                        <TouchableOpacity onPress={beginAddService} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
                
                {services.length === 0 && 
                    <View className="px-12">
                        <View className="bg-textSecondary mt-5 w-full" style={{height: 0.5}}></View>
                    </View>
                }

                {services.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-5">
                        <Text className="text-lg mb-3" bold>Kopiraj iz jednog od svojih salona</Text>
                        <TouchableOpacity onPress={beginAddService} className="p-5 bg-textPrimary rounded-full">
                            <Feather name="copy" size={58} color="white" />
                        </TouchableOpacity>
                    </View>
                }
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

        <CreateServiceModal 
            isModalVisible={isCreateServiceModalVisible}
            setIsModalVisible={setIsCreateServiceModalVisible}
        />
    </SafeAreaView>
  )
}

export default SalonServicesScreen