import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'

import { useSelector } from 'react-redux'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useCheckIfToJoinSalonRequestExistsMutation, useGetNotificationsMutation, useGetRequestMutation, useMarkSeenNotificationMutation, useUpdateRequestMutation } from '../redux/apiCore'
import LootieLoader from '../Components/LootieAnimations/Loader'
import CustomButton from '../Components/CustomComponents/CustomButton'
import ConfirmActionModal from '../Components/ConfirmActionModal'



const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const NotifcationCard = ({item, setNotificationDetails}) => {
    const [getNotifications, {isLoading: isNotificationsLoading}] = useGetNotificationsMutation()
    const [markSeenNotification, {isLoading}] = useMarkSeenNotificationMutation()

    const handleMarkNotificationSeen = async () => {
        try{
            const {error, data} = await markSeenNotification({
                notificationId: item?._id
            })
        }catch(error){
            console.log(error)
        }
    }

    const handleOnPress = () => {
        handleMarkNotificationSeen()
        setNotificationDetails(item)
        getNotifications()
    }

    return (
        <Animated.View entering={FadeInDown}>
            <TouchableOpacity 
                onPress={handleOnPress}
                className={`py-4 w-full ${item?.seen ? 'bg-bgSecondary border-textSecondary' : 'bg-bgSecondary border-textSecondary'} rounded-2xl flex flex-row justify-between items-center px-4`}
                style={item?.seen ? {borderWidth: 0.5} : {borderWidth: 0.5}}
                >
                {/* <View>
                    <View className="bg-appColor h-3 w-3 rounded-full"></View>
                </View> */}

                <View className="flex-1 ml-4">
                    <Text className="text-md text-textMid" semi>Zahtev za pridruživanje</Text>
                    <Text className={`text-md ${item?.seen ? 'text-textMid' : 'text-textPrimary'}`} bold>{item?.message || ''}</Text>
                </View>

                <View className="ml-5">
                    <MaterialIcons name="arrow-forward-ios" size={30} color={item?.seen ? '#6D6D60' : '#000'} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const NotificationsScreen = ({navigation}) => {
  const {userData, notifications, currentSalon: salonData} = useSelector(state => state.general)
  const [sortedNotifications, setSortedNotifications] = useState({
    today: [],
    thisWeek: [],
    thisMonth: [],
    rest: []
  })

  const [notificationDetails, setNotificationDetails] = useState(null)
  const [getRequest, {isLoading: isGetRequestLoading}] = useGetRequestMutation()
  const [requestDetails, setRequestDetails] = useState(null)
  const [requestErrorMessage, setRequestErrorMessage] = useState('')
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [updateRequest, {isLoading: isUpdateRequestLoading}] = useUpdateRequestMutation()
  const [getNotifications, {isLoading: isNotificationsLoading}] = useGetNotificationsMutation()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleConfirm = async () => {
    try{
        const {error, data} = await updateRequest({
            requestId: requestDetails?._id,
            confirmationType: confirmationType,
        })

        if(error){
            setIsError(true)
            return
        }
        
        if(data && data.success){
            if(data.message === 'Request rejected successfully'){
                setIsSuccess(true)
                setIsError(false)
                setTimeout(()=>{
                    setIsConfirmModalVisible(false)
                    setNotificationDetails(null)
                    setRequestDetails(null)
                    getNotifications()
                }, 2700)
            }
        }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
    if(!notificationDetails){
        setRequestDetails(null)
        setRequestErrorMessage('')
        return
    }
    console.log(notificationDetails)
    try{
        if(notificationDetails?.type === 'toJoinSalon'){
            (
                async () => {
                    const {error, data} = await getRequest({requestId: notificationDetails?.requestId})
    
                    if(error){
                        console.log(error)
                        setRequestErrorMessage('Došlo je do greške')
                    }
    
                    if(data && data.success){
                        console.log(data)
                        setRequestDetails(data?.result)
                    }
                }
            )()
        }
    }catch(error){
        console.log(error)
    }
  }, [notificationDetails])


  useEffect(() => {
    if(notifications.all.length === 0){
        setSortedNotifications({
            today: [],
            thisWeek: [],
            thisMonth: [],
            rest: []
        })
        return
    }

    const separateNotifications = (notifications) => {
      const today = new Date();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0));
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the week
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month

      const todayNotifications = [];
      const weekNotifications = [];
      const monthNotifications = [];
      const restNotifications = [];

      notifications.forEach(notification => {
        const notificationDate = new Date(notification.createdAt);

        if (notificationDate >= startOfToday) {
          // Notifications for today
          todayNotifications.push(notification);
        } else if (notificationDate >= startOfWeek && notificationDate < startOfToday) {
          // Notifications for this week excluding today
          weekNotifications.push(notification);
        } else if (notificationDate >= startOfMonth && notificationDate < startOfWeek) {
          // Notifications for this month excluding this week
          monthNotifications.push(notification);
        } else {
          // Notifications older than this month
          restNotifications.push(notification);
        }
      });

      return {
        today: todayNotifications,
        thisWeek: weekNotifications,
        thisMonth: monthNotifications,
        rest: restNotifications
      };
    };

    const sorted = separateNotifications(notifications.all);
    setSortedNotifications(sorted);
  }, [notifications]);

  const handleBack = () => {
    if(!notificationDetails){
        navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
    }else{
        setNotificationDetails(null)
    }
  }


  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgSecondary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>Obaveštenja</Text>
        </View>

        <View className="h-full flex flex-col justify-between px-4">
          {notificationDetails && 
            <View className="flex-1 flex flex-col justify-start items-center">
                {isGetRequestLoading && 
                    <View className="h-5/6 flex flex-col justify-center items-center">
                        <LootieLoader dark={true} d={70} />
                    </View>
                }

                {requestErrorMessage && 
                    <View className="h-5/6 flex flex-col justify-center items-center">
                        <Text className="text-lg" bold>{requestErrorMessage}</Text>
                    </View>
                }

                {requestDetails && 
                    <Animated.View entering={FadeInDown} className="w-full mt-10 p-4 rounded-3xl border-textSecondary" style={{borderWidth: 0.5}}>
                        <View className="w-full flex flex-row justify-between items-center">
                            <Image
                                className={`w-20 h-20 rounded-full mr-3 border-textPrimary border-2`}
                                // style={{borderWidth: 0.5}}
                                source={`http://192.168.0.72:5000/photos/salon-logo_${requestDetails?.salonId?.logoId}.png`}
                                placeholder={{ blurhash }}
                                contentFit="cover"
                                transition={1000}
                            />
                            <View className="flex flex-col justify-start items-start w-full">
                                <Text className="text-lg mb-2" bold>{requestDetails?.salonId?.name}</Text>
                                <View className="flex flex-row justify-start items-center bg-textPrimary p-1 rounded-3xl">
                                    {requestDetails?.salonId?.workers.length > 0 && requestDetails?.salonId?.workers.slice(0, 5).map((worker, index) => {
                                            return (
                                                <Image
                                                    key={index}
                                                    className={`w-8 h-8 rounded-full ${index > 0 && '-ml-2'}`}
                                                    source={`http://192.168.0.72:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
                                                    placeholder={{ blurhash }}
                                                    contentFit="cover"
                                                    transition={1000}
                                                />
                                            )
                                    })}
                                            
                                    {requestDetails?.salonId?.workers.length > 5 && (
                                        <View className="w-8 h-8 rounded-full border-2 border-appColorDark bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                            <Text className="text-white" semi>+{requestDetails?.salonId.workers.length - 5}</Text>
                                        </View>
                                    )}

                                    {requestDetails?.salonId?.workers.length < 5 && <Text className="text-white ml-2 pr-2" semi>Postani član</Text>}
                                </View>
                            </View>
                        </View>

                        <View className="">
                            <Text className="mt-8 text-textPrimary text-center" bold>{notificationDetails?.message}?</Text>
                            <Text className="text-textMid text-center">Prihvati poziv, pridruži se salonu i upravljaj svojim terminima</Text>
                        </View>

                        <View className="flex flex-row justify-between items-center mt-10">
                            <View className="w-[48%]">
                                <CustomButton 
                                    text={'Odbij'}
                                    variant={'transparent'}
                                    isIcon
                                    rejectIcon
                                    onPress={() => {
                                        setConfirmationType('reject')
                                        setIsConfirmModalVisible(true)
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
                                        setConfirmationType('accept')
                                        setIsConfirmModalVisible(true)
                                    }}
                                />
                            </View>
                        </View>
                    </Animated.View>
                }
            </View>
          }

          {!notificationDetails && <View className="flex-1 flex flex-col justify-start items-center">
            {isNotificationsLoading && 
                <View className="h-5/6 flex flex-col justify-center items-center">
                    <LootieLoader dark={true} d={70} />
                </View>
            }

            {notifications.all.length === 0 && 
                <View className="flex flex-col justify-start items-center mt-10">
                    <Text className="text-lg text-center" bold>Trenutno nemaš obaveštenja</Text>
                </View>
            }

            {sortedNotifications?.today.length > 0 && 
                <View className="w-full">
                    <View className="mt-4">
                        <Text className="text-textPrimary text-md mb-4" bold>Danas</Text>
                        {/* <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View> */}
                    </View>
                    <FlatList
                        data={sortedNotifications.today}
                        keyExtractor={(item) => item?._id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 0 }}
                        renderItem={({ item, index }) => {
                            return (
                                <NotifcationCard 
                                    item={item} 
                                    setNotificationDetails={setNotificationDetails} 
                                />
                            )
                        }}
                    /> 
                </View>
            }

            {sortedNotifications?.thisWeek.length > 0 && 
                <View className="w-full">
                    <View className="mt-4">
                        <Text className="text-textPrimary text-md" bold>Ove nedelje</Text>
                        <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>
                    </View>
                    <FlatList
                        data={sortedNotifications.thisWeek}
                        keyExtractor={(item) => item?._id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 0 }}
                        renderItem={({ item, index }) => {
                            return (
                                <NotifcationCard 
                                    item={item} 
                                    setNotificationDetails={setNotificationDetails} 
                                />
                            )
                        }}
                    /> 
                </View>
            }

            {sortedNotifications?.thisMonth.length > 0 && 
                <View className="w-full">
                    <View className="mt-4">
                        <Text className="text-textPrimary text-md" bold>Ovog meseca</Text>
                        <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>
                    </View>
                    <FlatList
                        data={sortedNotifications.thisMonth}
                        keyExtractor={(item) => item?._id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 0 }}
                        renderItem={({ item, index }) => {
                            return (
                                <NotifcationCard 
                                    item={item}
                                    setNotificationDetails={setNotificationDetails}  
                                />
                            )
                        }}
                    /> 
                </View>
            }

            {sortedNotifications?.rest.length > 0 && 
                <View className="w-full">
                    <View className="mt-4">
                        <Text className="text-textPrimary text-md" bold>Sve prethodno</Text>
                        <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>
                    </View>
                    <FlatList
                        data={sortedNotifications.rest}
                        keyExtractor={(item) => item?._id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 0 }}
                        renderItem={({ item, index }) => {
                            return (
                                <NotifcationCard 
                                    item={item} 
                                    setNotificationDetails={setNotificationDetails} 
                                />
                            )
                        }}
                    /> 
                </View>
            }

          </View>}
        </View>

        <ConfirmActionModal 
            isModalVisible={isConfirmModalVisible}
            setIsModalVisible={setIsConfirmModalVisible}
            handleConfirm={handleConfirm}
            title={confirmationType === 'accept' ? 'Prihvatanje poziva' : 'Odbijanje poziva'}
            question={confirmationType === 'accept' ? 'Da li sigurno želiš da prihvatiš poziv?' : 'Da li sigurno želiš da odbiješ poziv?'}
            isLoading={isUpdateRequestLoading}
            isSuccess={isSuccess}
            isError={isError}
        />
    </SafeAreaView>
  )
}

export default NotificationsScreen