import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Image } from 'expo-image'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'
import { useSelector } from 'react-redux'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useAcceptReservationMutation, useCheckIfToJoinSalonRequestExistsMutation, useGetNotificationsMutation, useGetRequestMutation, useGetReservationMutation, useMarkSeenNotificationAllMutation, useMarkSeenNotificationMutation, useRejectReservationMutation, useUpdateRequestMutation } from '../redux/apiCore'
import LootieLoader from '../Components/LootieAnimations/Loader'
import CustomButton from '../Components/CustomComponents/CustomButton'
import ConfirmActionModal from '../Components/ConfirmActionModal'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomAvatar from '../Components/CustomAvatar'
import { formatDistanceToNow } from 'date-fns'
import { srLatn } from 'date-fns/locale'


const daysObj = {
    1: 'Ponedeljak',
    2: 'Utorak',
    3: 'Sreda',
    4: 'Četvrtak',
    5: 'Petak',
    6: 'Subota',
    0: 'Nedelja'
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const timeAgoInSerbian = (dateString) => {
    const date = new Date(dateString);

    return formatDistanceToNow(date, { addSuffix: true, locale: srLatn });
}

const NotifcationCard = ({item, setNotificationDetails, timeAgo}) => {
    let smallTitle = ''
    let bigTitle = item?.message || ''
    // let showDot = false
    // let dotColorClass = 'bg-black'
    let textColorClass = 'text-textMid'
    let avatarText = ''
    let imageBorderClass = ''

    //request
    if(item?.requestId){
        let requestFromNotification = item?.requestId

        if(requestFromNotification.requestType === 'toJoinSalon'){
            if(requestFromNotification.status === 'pending'){
                smallTitle = 'Zahtev za pridruživanje'
            }

            if(requestFromNotification.status === 'accepted'){
                smallTitle = 'Zahtev je prihvaćen'
                textColorClass = 'text-green-700'
            }
        }
    }

    //It means that notification was related to request which is rejected and deleted so there is no further actions, just to inform
    if(item?.type === 'toJoinSalon' && !item.requestId){
        smallTitle = 'Zahtev je odbijen'
        textColorClass = 'text-red-700'
    }

    //end request

    if(item?.reservationId){
        let reservationFromNotification = item?.reservationId

        if(reservationFromNotification.reservationType === 'toReservationService'){
            if(reservationFromNotification.status === 'pending'){
                smallTitle = 'Rezervacija termina'
                const sender = reservationFromNotification?.sender
                if(sender && !sender.hasProfilePhoto){
                    avatarText = `${sender?.first_name[0]} ${sender?.last_name[0]}`
                }
            }

            if(reservationFromNotification.status === 'accepted'){
                smallTitle = 'Rezervacija prihvaćena'
                textColorClass = 'text-appColor'
                imageBorderClass = 'border-2 border-appColor'

                const sender = reservationFromNotification?.sender
                if(sender && !sender.hasProfilePhoto){
                    avatarText = `${sender?.first_name[0]} ${sender?.last_name[0]}`
                }
            }

            
        }
    }


    //CHECK THIS LATERRRRRR IMPORTANT
    // if(!item?.requestId){
    //     if(item?.type === 'toJoinSalon'){
    //         smallTitle = 'Zahtev odbijen'
    //         // showDot = true
    //         // dotColorClass = 'bg-red-700'
    //         //textColorClass = 'text-red-700'
    //     }
    // }


    const handleOnPress = () => {
        if(!item?.requestId && !item?.reservationId) return

        setNotificationDetails(item)
    }

    return (
        <Animated.View entering={FadeInDown}>
            <View className="flex flex-row justify-end items-center mb-1">
                <Text className="text-xs text-textSecondary">{timeAgo}</Text>
            </View>
            <TouchableOpacity 
                onPress={handleOnPress}
                className={`py-4 w-full ${item?.seen ? 'bg-bgSecondary border-textSecondary' : 'bg-bgSecondary border-textSecondary'} rounded-2xl flex flex-row justify-between items-center px-4 mb-5`}
                style={item?.seen ? {borderWidth: 0.5} : {borderWidth: 0.5}}
                >
                
                {item?.reservationId && item?.reservationId?.sender && !item?.reservationId?.sender?.hasProfilePhoto &&
                    <View className="w-10 h-10">
                        <CustomAvatar 
                            text={avatarText}
                        />
                    </View>
                }

                {item?.reservationId && item?.reservationId?.sender && item?.reservationId?.sender?.hasProfilePhoto &&
                    <Image
                        className={`w-10 h-10 rounded-full ${imageBorderClass}`}
                        source={`http://192.168.1.5:5000/photos/profile-photo${item?.reservationId?.sender?._id}.png`}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                }

                <View className="flex-1 ml-4">
                    <Text className={`text-md ${textColorClass}`} semi>{smallTitle}</Text>
                    <Text className={`text-md ${item?.seen ? 'text-textMid' : 'text-textPrimary'}`} bold>{bigTitle}</Text>
                </View>

                {(item?.requestId || item?.reservationId ) &&
                    <View className="ml-5">
                        <MaterialIcons name="arrow-forward-ios" size={30} color={item?.seen ? '#6D6D60' : '#000'} />
                    </View>
                }
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
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [updateRequest, {isLoading: isUpdateRequestLoading}] = useUpdateRequestMutation()
  const [getNotifications, {isLoading: isNotificationsLoading}] = useGetNotificationsMutation()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [markSeenNotificationAll] = useMarkSeenNotificationAllMutation()
  const [rejectReservation, {isLoading: isRejectingReservation}] = useRejectReservationMutation()
  const [acceptReservation, {isLoading: isAcceptingReservation}] = useAcceptReservationMutation()
  const [confirmModalTitle, setConfirmModalTitle] = useState('')
  const [confirmModalText, setConfirmModalText] = useState('')

  useEffect(()=>{
    let confirmTitle = ''
    let confirmText = ''

    if(notificationDetails?.requestid){
        if(confirmationType === 'accept'){
            confirmTitle = 'Prihvatanje poziva'
            confirmText = 'Da li sigurno želiš da prihvatiš poziv?'
        }else{
            confirmTitle = 'Odbijanje poziva'
            confirmText = 'Da li sigurno želiš da odbiješ poziv?'
        }
    }


    if(notificationDetails?.reservationId){
        if(confirmationType === 'accept'){
            confirmTitle = 'Prihvataš rezervaciju?'
            confirmText = ''
        }else{
            confirmTitle = 'Odbijaš rezervaciju?'
            confirmText = ''
        }
    }

    setConfirmModalTitle(confirmTitle)
    setConfirmModalText(confirmText)

  }, [notificationDetails, confirmationType])

  //Handle Request

  const handleRequest = async () => {
    try{
        const {error, data} = await updateRequest({
            requestId: notificationDetails?.requestId?._id,
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
                    getNotifications()
                }, 2700)
            }

            if(data.message === 'Request updated successfully'){
                setIsSuccess(true)
                setIsError(false)
                setTimeout(()=>{
                    setIsConfirmModalVisible(false)
                    //setNotificationDetails(null)
                    getNotifications()
                }, 2700)
            }
        }
    }catch(error){
        console.log(error)
    }
  }

  //Reject reservation
  const handleRejectReservation = async () => {
    try{

        const {error, data} = await rejectReservation({
            reservationId: notificationDetails?.reservationId?._id,
        })

        if(error){
            setIsError(true)
            return
        }
        
        if(data && data.success){
            if(data.message === 'Reservation rejected successfully'){
                setIsSuccess(true)
                setIsError(false)
                setTimeout(()=>{
                    setIsConfirmModalVisible(false)
                    setNotificationDetails(null)
                    getNotifications()
                }, 2700)
            }
        }
    }catch(error){
        console.log(error)
    }
  }

  //Accept Reservation
  const handleAcceptReservation = async () => {
    try{

        const {error, data} = await acceptReservation({
            reservationId: notificationDetails?.reservationId?._id,
        })

        if(error){
            setIsError(true)
            return
        }
        
        if(data && data.success){
            if(data.message === 'Reservation accepted successfully'){
                setIsSuccess(true)
                setIsError(false)
                setTimeout(()=>{
                    setIsConfirmModalVisible(false)
                    setNotificationDetails(null)
                    getNotifications()
                }, 2700)
            }
        }
    }catch(error){
        console.log(error)
    }
  }

  const handleConfirm = async () => {
    if(notificationDetails?.requestId){
        await handleRequest()
    }

    if(notificationDetails?.reservationId){
        if(confirmationType === 'reject'){
            await handleRejectReservation()
        }

        if(confirmationType === 'accept'){
            await handleAcceptReservation()
        }
    }
  }

  useFocusEffect(useCallback(()=>{
    markSeenNotificationAll()
  }, []))

  useEffect(()=>{
    // if(!notificationDetails){
    //     getNotifications()
    // }
  }, [notificationDetails])

  useEffect(() => {
    if(notifications.all.length === 0){
        // setSortedNotifications({
        //     today: [],
        //     thisWeek: [],
        //     thisMonth: [],
        //     rest: []
        // })
        setSortedNotifications([])
        return
    }

    const separateNotifications = (notifications) => {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the week
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
      
        const combinedNotifications = [];
        let hasToday = false, hasThisWeek = false, hasThisMonth = false, hasRest = false;
      
        notifications.forEach(notification => {
          const notificationDate = new Date(notification.createdAt);
      
          if (notificationDate >= startOfToday) {
            if (!hasToday) {
              // Add a section label for today
              combinedNotifications.push({ type: 'header', label: 'Danas' });
              hasToday = true;
            }
            combinedNotifications.push({ type: 'notification', item: notification });
          } else if (notificationDate >= startOfWeek && notificationDate < startOfToday) {
            if (!hasThisWeek) {
              // Add a section label for this week
              combinedNotifications.push({ type: 'header', label: 'Ove nedelje' });
              hasThisWeek = true;
            }
            combinedNotifications.push({ type: 'notification', item: notification });
          } else if (notificationDate >= startOfMonth && notificationDate < startOfWeek) {
            if (!hasThisMonth) {
              // Add a section label for this month
              combinedNotifications.push({ type: 'header', label: 'Ovog meseca' });
              hasThisMonth = true;
            }
            combinedNotifications.push({ type: 'notification', item: notification });
          } else {
            if (!hasRest) {
              // Add a section label for older notifications
              combinedNotifications.push({ type: 'header', label: 'Sve prethodno' });
              hasRest = true;
            }
            combinedNotifications.push({ type: 'notification', item: notification });
          }
        });
      
        return combinedNotifications;
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
                {
                notificationDetails?.requestId && 
                notificationDetails?.requestId?.requestType === 'toJoinSalon' && 
                
                <View className="w-full">
                    {notificationDetails?.requestId.status === 'pending' &&
                        <NotificationDetailsToJoinSalonPending
                            notificationDetails={notificationDetails}
                            confirmationType={confirmationType}
                            setConfirmationType={setConfirmationType}
                            setIsConfirmModalVisible={setIsConfirmModalVisible}
                            isSuccess={isSuccess}
                        />
                    }

                    {notificationDetails?.requestId.status === 'rejected' &&
                        <NotificationDetailsToJoinSalonRejected
                            notificationDetails={notificationDetails}
                        />
                    }

                    {notificationDetails?.requestId.status === 'accepted' &&
                        <NotificationDetailsToJoinSalonAccepted
                            notificationDetails={notificationDetails}
                        />
                    }
                </View>

                }


                {/* reservations */}
                {
                    notificationDetails?.reservationId && 
                    notificationDetails?.reservationId?.reservationType === 'toReservationService' && 
                        <View className="w-full">
                            
                                <NotificationDetailsToReservationService
                                    notificationDetails={notificationDetails}
                                    confirmationType={confirmationType}
                                    setConfirmationType={setConfirmationType}
                                    setIsConfirmModalVisible={setIsConfirmModalVisible}
                                    isSuccess={isSuccess}
                                />
                            
                        </View>
                }
            </View>
          }

          {!notificationDetails && <View className="flex-1 flex flex-col justify-start items-center">
            {/* {isNotificationsLoading && 
                <View className="h-5/6 flex flex-col justify-center items-center">
                    <LootieLoader dark={true} d={70} />
                </View>
            } */}

            {notifications.all.length === 0 && 
                <View className="flex flex-col justify-start items-center mt-10">
                    <Text className="text-lg text-center" bold>Trenutno nemaš obaveštenja</Text>
                </View>
            }

           

            

            

            {sortedNotifications.length > 0 && 
                <FlatList
                    data={sortedNotifications}
                    keyExtractor={(item, index) => item.type === 'header' ? `header-${index}` : item.item?._id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    renderItem={({ item }) => {
                    if (item.type === 'header') {
                        return (
                        <View className="w-full mt-4">
                            <Text className="text-textPrimary text-md mb-4" bold>{item.label}</Text>
                        </View>
                        );
                    } else if (item.type === 'notification') {
                        const timeAgo = timeAgoInSerbian(item.item.createdAt)

                        return (
                        <NotifcationCard 
                            item={item.item} 
                            setNotificationDetails={setNotificationDetails} 
                            timeAgo={timeAgo}
                        />
                        );
                    }
                    }}
                />
            }

          </View>}
        </View>

        <ConfirmActionModal 
            isModalVisible={isConfirmModalVisible}
            setIsModalVisible={setIsConfirmModalVisible}
            handleConfirm={handleConfirm}
            title={confirmModalTitle}
            question={confirmModalText}
            isLoading={isUpdateRequestLoading || isRejectingReservation || isAcceptingReservation}
            isSuccess={isSuccess}
            isError={isError}
        />
    </SafeAreaView>
  )
}

export default NotificationsScreen



//TO JOIN SALON PENDING
const NotificationDetailsToJoinSalonPending = ({
    notificationDetails, 
    confirmationType, 
    setConfirmationType, 
    setIsConfirmModalVisible,
    isSuccess
}) => {
    const {requestId} = notificationDetails
    const [requestDetails, setRequestDetails] = useState(requestId)
    const [getRequest] = useGetRequestMutation()
    const navigation = useNavigation()
    const [requestAccepted, setRequestAccepted] = useState(false)

    useEffect(()=>{
        if(confirmationType != 'accept' && !isSuccess) return

        (async () => {
            try{
                const {error, data} = await getRequest({requestId: requestDetails?._id})

                if(data && data.success){
                    setRequestDetails(data?.result)
                    setRequestAccepted(true)
                }
            }catch(error){
                console.log(error)
            }
        })()

        
    }, [confirmationType, isSuccess])

    return (
        <Animated.View entering={FadeInDown} className="w-full mt-10 p-4 rounded-3xl border-textSecondary" style={{borderWidth: 0.5}}>
            <View className="w-full flex flex-row justify-between items-center">
                <Image
                    className={`w-20 h-20 rounded-full mr-3`}
                    // style={{borderWidth: 0.5}}
                    source={`http://192.168.1.5:5000/photos/salon-logo_${requestDetails?.salonId?.logoId}.png`}
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
                                        className={`w-8 h-8 rounded-full ${index > 0 && '-ml-2'} border-textPrimary`}
                                        source={`http://192.168.1.5:5000/photos/profile-photo${worker?._id ? worker?._id : worker}.png`}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                        style={{borderWidth: 2}}
                                    />
                                )
                        })}
                                
                        {requestDetails?.salonId?.workers.length > 5 && (
                            <View className="w-8 h-8 rounded-full border-2 border-appColorDark bg-textPrimary -ml-2 flex flex-row justify-center items-center">
                                <Text className="text-white" semi>+{requestDetails?.salonId.workers.length - 5}</Text>
                            </View>
                        )}

                        {requestDetails?.salonId?.workers.length < 5 && <Text className="text-white ml-2 pr-2" semi>{!requestAccepted && 'Postani član'}</Text>}
                    </View>
                </View>
            </View>

            {!requestAccepted && 
                <View className="">
                    <Text className="mt-8 text-textPrimary text-center" bold>{notificationDetails?.message}</Text>
                    <Text className="text-textMid text-center">Prihvati poziv, pridruži se salonu i upravljaj svojim terminima</Text>
                </View>
            }

            {requestAccepted && 
                <View className="">
                    <Text className="mt-8 text-textPrimary text-center" bold>Novi član se pridružio!</Text>
                    <Text className="text-textMid text-center">Na početnoj stranici postavi svoje slobodne termine i prati svoje rezervacije</Text>
                </View>
            }
            
            {requestAccepted && 
                <View className="flex flex-row justify-center items-center mt-10">
                    <CustomButton 
                        text={'Nazad na početnu'}
                        variant={'dark'}
                        onPress={() => {
                            navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
                        }}
                    />
                </View>
            }

            {!requestAccepted &&
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
            }
        </Animated.View>
    )
}


//TO JOIN SALON REJECTED
const NotificationDetailsToJoinSalonRejected = ({notificationDetails}) => {
    const {requestId: requestDetails} = notificationDetails

    return (
        <Animated.View entering={FadeInDown} className="w-full mt-10 p-4 rounded-3xl border-textSecondary" style={{borderWidth: 0.5}}>
            <View className="flex flex-row justify-center items-center">
                <Text className="text-lg mb-2" bold>{requestDetails?.salonId?.name}</Text>
            </View>

            <View className="w-full flex flex-row justify-center items-center">
                <Image
                    className={`w-20 h-20 rounded-full -mr-2`}
                    // style={{borderWidth: 0.5}}
                    source={`http://192.168.1.5:5000/photos/salon-logo_${requestDetails?.salonId?.logoId}.png`}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
                <Image
                    className={`w-20 h-20 rounded-full`}
                    // style={{borderWidth: 0.5}}
                    source={`http://192.168.1.5:5000/photos/profile-photo${requestDetails?.recipient}.png`}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
            </View>

            <View className="">
                <Text className="mt-8 text-textPrimary text-center" bold>{notificationDetails?.message}</Text>
            </View>
        </Animated.View>
    )
}

//TO JOIN SALON ACCEPTED
const NotificationDetailsToJoinSalonAccepted = ({notificationDetails}) => {
    const {requestId: requestDetails} = notificationDetails
    const navigation = useNavigation()

    return (
        <Animated.View entering={FadeInDown} className="w-full mt-10 p-4 rounded-3xl border-textSecondary" style={{borderWidth: 0.5}}>
            <View className="flex flex-col justify-center items-center">
                <Text className="text-2xl text-center" bold>{requestDetails?.salonId?.name}</Text>
                <Text bold>ima novog člana!</Text>
            </View>
            <View className="mt-8">
                <Text className="text-textMid text-center" bold>{notificationDetails?.message}</Text>
            </View>

            <View className="w-full flex flex-row justify-center items-center my-5">
                <Image
                    className={`w-24 h-24 rounded-full`}
                    // style={{borderWidth: 0.5}}
                    source={`http://192.168.1.5:5000/photos/profile-photo${requestDetails?.recipient}.png`}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={1000}
                />
            </View>

            <View className="">
                <Text className="text-textMid text-center">Novom članu je potrebno dodeliti usluge kako bi mogao da započne sa rezervacijama</Text>
            </View>

            <View className="flex flex-row justify-center items-center mt-10">
                <CustomButton 
                    text={'Nazad na početnu'}
                    variant={'dark'}
                    onPress={() => {
                        navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
                    }}
                />
            </View>
        </Animated.View>
    )
}



//RESERVATIONS

//TO JOIN SALON PENDING
const NotificationDetailsToReservationService = ({
    notificationDetails, 
    confirmationType, 
    setConfirmationType, 
    setIsConfirmModalVisible,
    isSuccess
}) => {
    const {reservationId} = notificationDetails
    const [reservationDetails, setReservationDetails] = useState(reservationId)
    const [getReservation] = useGetReservationMutation()
    const navigation = useNavigation()
    const [reservationAccepted, setReservationAccepted] = useState(reservationId?.status === 'accepted' ? true : false)
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

    useEffect(()=>{

        if(confirmationType === 'accept' && isSuccess){
            (async () => {
                try{
                    const {error, data} = await getReservation({reservationId: reservationDetails?._id})
    
                    if(data && data.success){
                        setReservationDetails(data?.result)
                        setReservationAccepted(true)
                    }
                }catch(error){
                    console.log(error)
                }
            })()
        }

        
    }, [confirmationType, isSuccess])

    return (
        <Animated.View entering={FadeInDown} className="w-full mt-10 p-4 rounded-3xl border-textSecondary" style={{borderWidth: 0.5}}>
            <View className="flex flex-row justify-end items-center mb-1">
                <Text className="text-xs text-textSecondary">{timeAgo}</Text>
            </View>
            <View className="w-full flex flex-row justify-between">
                {reservationDetails?.sender && reservationDetails?.sender?.hasProfilePhoto && 
                    <Image
                        className={`w-16 h-16 rounded-full mr-3`}
                        // style={{borderWidth: 0.5}}
                        source={`http://192.168.1.5:5000/photos/profile-photo${reservationDetails?.sender?._id}.png`}
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
                    <Text className="text-textPrimary">Želi da rezerviše termin?</Text>
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

            <View className="flex flex-col justify-start items-start">
                <Text className="text-textPrimary" bold>Datum: <Text semi>{dateText}<Text className="text-textMid"> ({smallDateText})</Text></Text></Text>
                <Text className="text-textPrimary" bold>Vreme: <Text semi>{reservationDetails?.time}h</Text></Text>
            </View>

            {/* {!requestAccepted && 
                <View className="">
                    <Text className="mt-8 text-textPrimary text-center" bold>{notificationDetails?.message}</Text>
                    <Text className="text-textMid text-center">Prihvati poziv, pridruži se salonu i upravljaj svojim terminima</Text>
                </View>
            } */}

            <View className="h-6 mt-5 flex flex-row justify-center items-center">
            {reservationAccepted && 
                <View className="w-full">
                    <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>
                    <Text className="text-textPrimary text-center" bold>Rezervacija je prihvaćena</Text>
                </View>
            }
            </View>
            
            {reservationAccepted && 
                <View className="flex flex-row justify-center items-center mt-8">
                    <CustomButton 
                        text={'Pogledaj rezervacije'}
                        variant={'dark'}
                        onPress={() => {
                            navigation.navigate('MainTabScreens', {screen: 'ReservationsScreen'})
                        }}
                    />
                </View>
            }

            {!reservationAccepted &&
                <View className="flex flex-row justify-between items-center mt-8">
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
            }
        </Animated.View>
    )
}