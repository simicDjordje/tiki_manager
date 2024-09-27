import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import CustomInput from './CustomComponents/CustomInput'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useCheckIfToJoinSalonRequestExistsMutation, useCreateToJoinSalonRequestMutation, useDeleteToJoinSalonRequestMutation, useGetUserDataMutation, useSearchForWorkerMutation } from '../redux/apiCore'
import LootieLoader from './LootieAnimations/Loader'
import Animated, { BounceInDown, BounceInUp, FadeInDown } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveWorkerDetails } from '../redux/generalSlice'
import CustomButton from './CustomComponents/CustomButton'
import { isLoading } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import ReservationCardTwo from './ReservationsCard/ReservationCardTwo'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  

const DeleteCategoryServicesHasReservationsModal = ({
    isModalVisible, 
    setIsModalVisible, 
    existingReservations, 
    isRejecting,
    handleConfirm,
    isSuccess
}) => {
    const [errorMessage, setErrorMessage] = useState('')


    
    const closeModal = () => {
        setIsModalVisible(false)
    }

    
    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
          onModalShow={()=>{
           
          }}
          onModalHide={()=>{
            
          }}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className={`h-5/6 w-full`}>
                <View 
                    className="h-full w-full bg-bgPrimary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Aktivne rezervacije</Text>
                        

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                    
                    <View className="h-full w-full">
                        
                    
                        


                        
                            <View className="h-[75%] px-2">
                                
                                <FlatList
                                    data={[{_id: 'index_0_to_create_view_at_top'}, ...existingReservations]}
                                    keyExtractor={(item) => item?._id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 28 }}
                                    renderItem={({ item, index }) => {
                                        if(index === 0){
                                            return (
                                                <View className="w-full flex flex-col justify-center items-center mt-5">
                                                    {existingReservations.length === 1 &&  <Text className="text-center text-textPrimary text-lg" bold>Postoji {existingReservations?.length} aktivna rezervacija u ovoj kategoriji</Text>}
                                                    {existingReservations.length > 1 &&  <Text className="text-center text-textPrimary text-lg" bold>Postoje {existingReservations?.length} aktivne rezervacije u ovoj kategoriji</Text>}
                                                    <Text className="text-textPrimary text-xs mt-4 text-center" bold>Ukoliko obrišeš kategoriju, obavestićemo da {existingReservations.length > 1 ? 'su rezervacije otkazane' : 'je rezervacija otkazana'}</Text>
                                                    <View className="w-full bg-textSecondary mt-4" style={{height: 0.5}}></View>
                                                </View>
                                            )
                                        }

                                        return (
                                            <View className="w-full">
                                                <ReservationCardTwo 
                                                    reservationDetails={item} 
                                                    index={index} 
                                                />
                                            </View>
                                        )
                                    }}
                                /> 
                            </View>

                            <View className="w-full h-[25%] mt-2">
                                <View></View>
                                <View>
                                    <CustomButton 
                                        variant={'dark'}
                                        text={'Obriši kategoriju'}
                                        isLoading={isRejecting}
                                        isSuccess={isSuccess}
                                        onPress={handleConfirm}
                                    />
                                </View>
                            </View>
                
                    </View>
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default DeleteCategoryServicesHasReservationsModal