import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import CustomInput from './CustomComponents/CustomInput'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonWorkerDetailsModal = ({isModalVisible, setIsModalVisible}) => {
    const navigation = useNavigation()

    const handleToSingleWorkerScreen = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonSingleWorkerScreen'})
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
              <View className="w-full" style={{height: '90%'}}>
                <View 
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <ScrollView>
                        <View className="min-h-full">
                        <View className="flex flex-row justify-end items-center w-full mt-6">
                            {/* <Text className="text-xl ml-2" bold>Dodaj novog člana</Text> */}

                            <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                                <Ionicons name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* <View className="bg-textSecondary w-full h-0.5 mt-4"></View> */}
                    
                   
                    
                    
                            <View className="flex flex-row justify-center items-center">
                                <Image
                                    className="w-36 h-36 rounded-full border-2 border-appColor"
                                    source={require('../assets/fpp.png')}
                                    placeholder={{ blurhash }}
                                    contentFit="cover"
                                    transition={1000}
                                />
                            </View>
                            <View className="flex flex-col justify-center items-center">
                                <Text className="text-xl mt-5 text-textPrimary" bold>Jorgovanka Jorgovanovic</Text>
                                <Text className="text-lg text-textMid">Nail tehnician</Text>
                            </View>

                            <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                        </View>
                    </ScrollView>
                    
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default SalonWorkerDetailsModal