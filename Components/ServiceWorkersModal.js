import { View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
// import LootieTwoPeople from './LootieAnimations/TwoPeople'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ServiceWorkersModal = ({isModalVisible, setIsModalVisible}) => {
    const {currentSalon: salonData, activeCategory, activeService} = useSelector(state => state.general)
    const navigation = useNavigation()

    const handleToWorkersScreen = () => {
        setIsModalVisible(false)
        navigation.navigate('StackTabScreens', {screen: 'SalonWorkersScreen'})    
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className="h-5/6 w-full">
                <View 
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Dodeli ili ukloni uslugu</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>

                    {activeService?.users.length === 0 && 
                        <View className="mt-20">
                            <Text className="text-center text-textPrimary text-lg" bold>Tvoj salon još uvek nema članova.</Text>
                            <Text className="text-center text-textMid">Dodaj članove u podešavanjima salona i ovde im dodeli uslugu.</Text>

                            <View className="flex flex-col justify-center items-center mt-10">
                                <Text className="text-lg mb-3" bold>Dodaj novog člana</Text>
                                <TouchableOpacity onPress={handleToWorkersScreen} className="p-4 bg-textPrimary rounded-full">
                                    <Entypo name="plus" size={64} color="white" />
                                </TouchableOpacity>
                            </View>
                            {/* <View>
                                <LootieTwoPeople d={100} />
                            </View> */}
                        </View>
                    }

                    {activeService?.users.length > 0 && 
                    <ScrollView>
                        <View className="min-h-full">
                            <View className="flex flex-col justify-center items-center mt-4">
                                <Text className="text-center text-textMid" bold>
                                    Označi članove kojima želiš da dodeliš ovu uslugu
                                </Text>
                            </View>

                            <View className="mt-16">
                                <TouchableOpacity 
                                    className="w-full h-20 flex flex-row justify-between items-center bg-bgPrimary rounded-xl px-2"
                                    >
                                    <Image
                                        className="w-16 h-16 rounded-full border-2 border-appColorDark"
                                        source={require('../assets/fpp.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <View className="flex-1 px-4">
                                        <Text semi>Jovana Jorgovankovic</Text>
                                        <Text>Nail tehnician</Text>
                                    </View>

                                    <AntDesign name="checksquareo" size={24} color="#232323" />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    className="w-full h-20 flex flex-row justify-between items-center bg-bgPrimary rounded-xl px-2 mt-2"
                                    >
                                    <Image
                                        className="w-16 h-16 rounded-full border-2 border-appColorDark"
                                        source={require('../assets/fpp2.png')}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />

                                    <View className="flex-1 px-4">
                                        <Text semi>Snezana Snezanovic</Text>
                                        <Text>Nail tehnician</Text>
                                    </View>

                                    <AntDesign name="checksquare" size={24} color="#5F9EA0" />
                                </TouchableOpacity>

                                
                            </View>

                            <View className="mb-12"></View>
                        </View>
                    </ScrollView>}
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default ServiceWorkersModal