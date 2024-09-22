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
import { useDispatch, useSelector } from 'react-redux'
import LootieLoader from './LootieAnimations/Loader'
import { setActiveWorkerDetails } from '../redux/generalSlice'
import CustomButton from './CustomComponents/CustomButton'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonWorkerDetailsModal = ({isModalVisible, setIsModalVisible}) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const {activeWorkerDetails} = useSelector(state => state.general)
    const dispatch = useDispatch()
    const closeModal = () => {
        setIsModalVisible(false)
    }

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
          onModalHide={()=>{
            dispatch(setActiveWorkerDetails(null))
          }}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className="w-full" style={{height: '90%'}}>
                <View 
                    className="h-full w-full bg-bgSecondary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <ScrollView>
                        <View className="min-h-screen">
                        <View className="flex flex-row justify-end items-center w-full mt-6">
                            {/* <Text className="text-xl ml-2" bold>Dodaj novog člana</Text> */}

                            <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                                <Ionicons name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* <View className="bg-textSecondary w-full h-0.5 mt-4"></View> */}
                    
                            {!activeWorkerDetails && 
                                <View className="h-5/6 flex flex-col justify-center items-center">
                                    <LootieLoader dark={true} d={70} />
                                </View>
                            }
                    
                    
                            {activeWorkerDetails && 
                                <ScrollView>
                                     <View className="min-h-screen">
                                        <View className="flex flex-row justify-center items-center">
                                            <Image
                                                className="w-36 h-36 rounded-full border-2 border-textPrimary"
                                                source={`http://192.168.1.5:5000/photos/profile-photo${activeWorkerDetails?._id}.png`}
                                                placeholder={{ blurhash }}
                                                contentFit="cover"
                                                transition={1000}
                                            />
                                        </View>
                                        <View className="flex flex-col justify-center items-center">
                                            <Text className="text-xl mt-5 text-textPrimary" bold>{activeWorkerDetails?.first_name} {activeWorkerDetails?.last_name}</Text>
                                            <Text className="text-lg text-textMid">{activeWorkerDetails?.description}</Text>
                                        </View>

                                        {/* <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View> */}

                                        <View className="flex flex-row justify-between items-center border-textPrimary" style={{borderBottomWidth: 0.5}}>
                                            <TouchableOpacity onPress={()=>{setActiveIndex(0)}} className={`${activeIndex === 0 && 'bg-textPrimary'} w-1/3 flex flex-row justify-center items-center rounded-t-lg p-3`}>
                                                <Text className={`${activeIndex === 0 ? 'text-white' : 'text-textMid'}`} semi>Informacije</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{setActiveIndex(1)}} className={`${activeIndex === 1 && 'bg-textPrimary'} rounded-t-lg p-3 w-1/3 flex flex-row justify-center items-center`}>
                                                <Text className={`${activeIndex === 1 ? 'text-white' : 'text-textMid'}`} semi>Usluge</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{setActiveIndex(2)}} className={`${activeIndex === 2 && 'bg-textPrimary'} rounded-t-lg p-3 w-1/3 flex flex-row justify-center items-center`}>
                                                <Text className={`${activeIndex === 2 ? 'text-white' : 'text-textMid'}`} semi>Ocene</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {activeIndex === 0 && 
                                            <View>
                                                <View className="px-2 mt-8">
                                                    <View className="flex flex-row justify-between items-center">
                                                        <Text className="text-textPrimary" semi>Ukupno pruženih usluga: </Text>
                                                        <Text className="text-textPrimary" bold>20</Text>
                                                    </View>
                                                </View>
                                                <View className="mt-10">
                                                    <CustomButton 
                                                        text={'Ukloni člana'}
                                                    />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </ScrollView>
                            }
                        </View>
                    </ScrollView>
                    
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default SalonWorkerDetailsModal