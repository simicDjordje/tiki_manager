import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Text from './CustomComponents/CustomText'
import { StatusBar } from 'expo-status-bar'
import LootieLoader from './LootieAnimations/Loader'
import { Image } from 'expo-image'
import CustomAvatar from './CustomAvatar'
import CustomButton from './CustomComponents/CustomButton'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const daysObj = {
    1: 'Ponedeljak',
    2: 'Utorak',
    3: 'Sreda',
    4: 'Četvrtak',
    5: 'Petak',
    6: 'Subota',
    0: 'Nedelja'
}

const ReservationExistsModal = ({
    isModalVisible, 
    setIsModalVisible, 
    handleConfirm, 
    isLoading, 
    reservationDetails, 
    setExistingReservation, 
    isSuccess, 
    setIsSuccess,
    isError,
    setIsError,
    rejectionLoading
}) => {
    const [dateText, setDateText] = useState('')
    const [smallDateText, setSmallDateText] = useState('')


    useEffect(()=>{
        if(!reservationDetails) return

        const dateSplited = reservationDetails?.date.split('-')
        setDateText(`${dateSplited[0]}.${Number(dateSplited[1]) + 1}.${dateSplited[2]}.`)

        //const date = new Date(reservationDetails?.formattedDate);
        const date = new Date(dateSplited[2], Number(dateSplited[1]), dateSplited[0])
        const today = new Date();

        // Create a new date for tomorrow by adding 1 day to today
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        // Check if the date is today
        if (today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate()) {
            setSmallDateText('Danas');
        }else if (tomorrow.getFullYear() === date.getFullYear() &&
            tomorrow.getMonth() === date.getMonth() &&
            tomorrow.getDate() === date.getDate()) {
            setSmallDateText('Sutra');
        }else{
            const dayNum = date.getDay()
            
            const dayName = daysObj[dayNum]
            //console.log(dayNum)
            setSmallDateText(dayName)
        }

    }, [reservationDetails])

  return (
    <Modal 
        isVisible={isModalVisible}
        animationInTiming={400}
        animationOutTiming={400}
        onModalHide={()=>{
            setExistingReservation(null)
            setIsSuccess(false)
            setIsError(false)
        }}
    >
        <View className="flex-1 flex flex-col justify-center items-center">
            <View className="h-5/6 w-full bg-bgPrimary relative rounded-3xl">
              {isLoading && !reservationDetails && 
                <View className="h-full w-full px-4 flex flex-col justify-center items-center">
                   <LootieLoader d={70} dark />
                </View>
              }

              {!isLoading && reservationDetails && 
                <View className="h-full w-full px-4 flex flex-col justify-between items-center">
                    <View className="flex flex-row justify-end items-center w-full">
                    <TouchableOpacity onPress={()=>setIsModalVisible(false)} className="absolute -top-6 -right-8 p-3 bg-textPrimary rounded-full">
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                    </View>
                    
                    <Text className="mt-4 text-center text-xl text-textPrimary" bold>Postoji aktivna rezervacija za ovaj termin!</Text>

                    <View className="w-full border-textSecondary p-3 rounded-2xl bg-bgSecondary" style={{borderWidth: 0.5}}>
                        <View className="flex flex-row justify-start items-center w-full">
                            {reservationDetails?.sender.hasProfilePhoto ? (
                            <Image
                                className={`w-16 h-16 rounded-full`}
                                // style={{borderWidth: 0.5}}
                                source={`http://192.168.1.27:5000/photos/profile-photo${reservationDetails?.sender?._id}.png`}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />) : (
                                <View className="w-16 h-16">
                                    <CustomAvatar 
                                        text={`${reservationDetails?.sender?.first_name[0]} ${reservationDetails?.sender?.last_name[0]}`}
                                    />
                                </View>
                            )}

                            <View className="ml-2 w-56">
                                <Text className="text-textPrimary text-lg" bold>{reservationDetails?.sender && `${reservationDetails?.sender?.first_name} ${reservationDetails?.sender?.last_name}`}</Text>
                                <Text className="text-textPrimary text-xs">{reservationDetails?.senderText}</Text>
                            </View>
                        </View>

                        <View className="w-full border-2 border-dashed my-5"></View>

                        <View className="flex flex-col justify-start items-start">
                            <Text className="text-textPrimary" bold>{reservationDetails?.service?.name}</Text>
                            <Text className="text-textPrimary">{reservationDetails?.service?.description}</Text>
                            <View className="bg-textPrimary pt-1 pb-2 px-2 rounded-xl mt-2 flex flex-row justify-center items-center">
                                <Text className="text-bgSecondary mt-1" bold>{reservationDetails?.service?.price} RSD</Text>
                            </View>
                        </View>


                        <View className="flex flex-col justify-start items-start mt-8">
                            <Text className="text-textPrimary" bold>Datum: <Text semi>{dateText}<Text className="text-textMid"> ({smallDateText})</Text></Text></Text>
                            <Text className="text-textPrimary" bold>Vreme: <Text semi>{reservationDetails?.time}h</Text></Text>
                        </View>
                    </View>

                    <Text className="mt-2 text-textPrimary text-center" bold>Da li želiš da otkažeš rezervaciju?</Text>

                    <View className="w-full mb-10">
                            <CustomButton 
                                text={'Da'}
                                variant={'dark'}
                                onPress={handleConfirm}
                                isLoading={rejectionLoading}
                                isSuccess={isSuccess}
                                isError={isError}
                            />

                            <View className="w-full mt-3">
                                <CustomButton 
                                    text='Izađi'
                                    variant={'light'}
                                    onPress={()=>setIsModalVisible(false)}
                                />
                            </View>
                    </View>
                </View>
              }
            </View>
        </View>
    </Modal>
  )
}

export default ReservationExistsModal