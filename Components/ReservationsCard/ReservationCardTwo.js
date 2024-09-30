import { View } from 'react-native'
import Text from '../CustomComponents/CustomText'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Image } from 'expo-image'
import CustomAvatar from '../CustomAvatar';
import CustomButton from '../CustomComponents/CustomButton';
import { formatDistanceToNow } from 'date-fns'
import { srLatn } from 'date-fns/locale'

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

const timeAgoInSerbian = (dateString) => {
    const date = new Date(dateString);
    let timeString = formatDistanceToNow(date, { addSuffix: true, locale: srLatn });

    if (timeString.includes("minute")) {
        timeString = timeString.replace("minute", "minuta");
    }

    return timeString
}

const ReservationCardTwo = ({reservationDetails}) => {
    const [dateText, setDateText] = useState('')
    const [smallDateText, setSmallDateText] = useState('')
    let avatarText = ''
    const timeAgo = timeAgoInSerbian(reservationDetails?.createdAt) || ''


    if(reservationDetails?.sender){
        avatarText = `${reservationDetails?.sender?.first_name[0]} ${reservationDetails?.sender?.last_name[0]}`
    }


    useEffect(()=>{
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
    <Animated.View entering={FadeInDown} className="w-full p-4 mt-8 rounded-3xl border-textSecondary bg-bgSecondary" style={{borderWidth: 0.5}}>
            <View className="flex flex-row justify-end">
                <Text className="text-xs text-textSecondary">{timeAgo}</Text>
            </View>
            <View className="w-full flex flex-row justify-between">
                {reservationDetails?.sender && reservationDetails?.sender?.hasProfilePhoto && 
                    <Image
                        className={`w-16 h-16 rounded-full mr-3`}
                        // style={{borderWidth: 0.5}}
                        source={`http://192.168.1.14:5000/photos/profile-photo${reservationDetails?.sender?._id}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                }

                {reservationDetails?.sender && !reservationDetails?.sender?.hasProfilePhoto && 
                    <View className="w-16 h-16 mr-3">
                        <CustomAvatar big text={avatarText} />
                    </View>
                }
                <View className="flex flex-col justify-start items-start w-full">
                    <Text className="text-textPrimary text-lg" bold>{reservationDetails?.sender && `${reservationDetails?.sender?.first_name} ${reservationDetails?.sender?.last_name}`}</Text>
                    {reservationDetails?.status === 'pending' && <Text className="text-textPrimary" semi>Želi da rezerviše termin?</Text>}
                    {reservationDetails?.status === 'accepted' && <Text className="text-appColorDark" semi>Rezervacija je prihvaćena</Text>}

                </View>
            </View>

            {reservationDetails?.senderText && 
                <View className="bg-bgPrimary p-3 mt-5 rounded-2xl">
                    <Text className="text-textPrimary" semi>{reservationDetails?.senderText}</Text>
                </View>
            }

            <View className="w-full border-2 border-dashed my-5"></View>

            <View className="flex flex-col justify-start items-start">
                <Text className="text-textPrimary" bold>{reservationDetails?.service?.name}</Text>
                <Text className="text-textPrimary">{reservationDetails?.service?.description}</Text>
                <View className="bg-textPrimary pt-1 pb-2 px-2 rounded-xl mt-2 flex flex-row justify-center items-center">
                    <Text className="text-bgSecondary mt-1" bold>{reservationDetails?.service?.price} RSD</Text>
                </View>
            </View>
            
            <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>

            <View className="w-full flex flex-row justify-between">
                {reservationDetails?.recipient  && 
                    <Image
                        className={`w-12 h-12 rounded-full mr-3`}
                        // style={{borderWidth: 0.5}}
                        source={`http://192.168.1.14:5000/photos/profile-photo${reservationDetails?.recipient?._id}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                }

                
                <View className="flex flex-col justify-start items-start w-full">
                    {reservationDetails?.status === 'accepted' && <Text className="text-textPrimary">Rezervacija je kod: </Text>}

                    <Text className="text-textPrimary" bold>{reservationDetails?.recipient && `${reservationDetails?.recipient?.first_name} ${reservationDetails?.recipient?.last_name}`}</Text>

                </View>
            </View>

            <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>


            <View className="flex flex-col justify-start items-start">
                <Text className="text-textPrimary" bold>Datum: <Text semi>{dateText}<Text className="text-textMid"> ({smallDateText})</Text></Text></Text>
                <Text className="text-textPrimary" bold>Vreme: <Text semi>{reservationDetails?.time}h</Text></Text>
            </View>




            {/* <View className="h-6 mt-5 flex flex-row justify-center items-center">
            {reservationDetails?.status === 'accepted' && 
                <View className="w-full">
                    <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>
                    <Text className="text-textPrimary text-center" bold>Rezervacija je prihvaćena</Text>
                </View>
            }
            </View> */}
            

            {/* {reservationDetails?.status === 'pending' &&
                <View className="flex flex-row justify-between items-center mt-8">
                    <View className="w-[48%]">
                        <CustomButton 
                            text={'Odbij'}
                            variant={'transparent'}
                            isIcon
                            rejectIcon
                            onPress={() => {
                                
                            }}
                        />
                    </View>
                    <View className="w-[48%]">
                        <CustomButton 
                            text={'Prihvati'}
                            isIcon
                            variant={'dark'}
                            acceptIcon
                            onPress={() => {
                                
                            }}
                        />
                    </View>
                </View>
            } */}
        </Animated.View>
  )
}

export default ReservationCardTwo