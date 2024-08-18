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
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CreateServicesCategoryModal from '../Components/CreateServicesCategoryModal'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonServicesCategoriesScreen = () => {
  const [categories, setCategories] = useState([1])
  const [isCreateCategoryModalVisible, setIsCreateCategoryModalVisible] = useState(false)
  const navigation = useNavigation()
  const salonName = 'Beauty salon PK'

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleToServices = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
  }

  const beginAddCategory = () => {
    setIsCreateCategoryModalVisible(true)
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
                </View>
                <TouchableOpacity onPress={beginAddCategory} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            
            {categories.length === 0 && <View>
                <Text className="text-center text-textMid" bold>Kreiraj kategorije u kojima možeš dodavati usluge</Text>
                <Text className="text-center text-textMid">Nemaš još uvek nijednu kategoriju</Text>
            </View>}

            <View className="flex-1 w-full mb-3 mt-10">
                {categories.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg mb-3" bold>Kreiraj kategoriju</Text>
                        <TouchableOpacity onPress={beginAddCategory} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
                
                {/* {categories.length === 0 && 
                    <View className="px-12">
                        <View className="bg-textSecondary mt-5 w-full" style={{height: 0.5}}></View>
                    </View>
                }

                {categories.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-5">
                        <Text className="text-lg mb-3" bold>Kopiraj iz jednog od svojih salona</Text>
                        <TouchableOpacity onPress={beginAddCategory} className="p-5 bg-textPrimary rounded-full">
                            <Feather name="copy" size={58} color="white" />
                        </TouchableOpacity>
                    </View>
                } */}
            </View>
              
            
             {categories.length > 0 && 
                <View className="flex flex-row justify-start items-center w-full -mt-10">
                    <Text className="text-textMid" semi>Kategorije usluga</Text>
                </View>
             }

              {categories.length > 0 && 
                <ScrollView className="w-full">
                    <View className="min-h-screen">
                        <TouchableOpacity onPress={handleToServices} className="bg-bgPrimary w-full h-28 mt-4 rounded-xl p-4 flex flex-col justify-between">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-textPrimary text-xl" bold>Trepavice</Text>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                            </View>
                            <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                            <View className="flex-1">
                                <View className="flex flex-row justify-between items-center mt-2">
                                    <Text>Ukupno usluga u ovoj kategoriji: </Text>
                                    <Text semi>9</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleToServices} className="bg-bgPrimary w-full h-28 mt-4 rounded-xl p-4 flex flex-col justify-between">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-textPrimary text-xl" bold>Trajna šminka</Text>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                            </View>
                            <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                            <View className="flex-1">
                                <View className="flex flex-row justify-between items-center mt-2">
                                    <Text>Ukupno usluga u ovoj kategoriji: </Text>
                                    <Text semi>4</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View className="mb-44"></View>
                    </View>
                </ScrollView>
              }
          </View>
        </View>

        <CreateServicesCategoryModal 
            isModalVisible={isCreateCategoryModalVisible}
            setIsModalVisible={setIsCreateCategoryModalVisible}
        />
    </SafeAreaView>
  )
}

export default SalonServicesCategoriesScreen