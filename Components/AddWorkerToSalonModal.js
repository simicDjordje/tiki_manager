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


const AddWorkerToSalonModal = ({isModalVisible, setIsModalVisible}) => {
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
              <View className="h-5/6 w-full">
                <View 
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Dodaj novog člana</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    
                    <View className="mt-4">
                        <CustomInput 
                            label={'Pretraga'}
                            placeholder='Pretraži po imenu i prezimenu'
                            inputIcon={()=>(<FontAwesome name="search" size={24} color="black" />)}
                            iconSide='right'
                        />
                    </View>
                    
                    <ScrollView>
                        <View className="min-h-full">
                        <TouchableOpacity onPress={handleToSingleWorkerScreen}
                            className="w-full h-20 flex flex-row justify-between items-center bg-bgPrimary rounded-xl px-2 mt-5"
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

                            <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                        </TouchableOpacity>
                        </View>
                    </ScrollView>
                    
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default AddWorkerToSalonModal