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
import { useCheckIfToJoinSalonRequestExistsMutation } from '../redux/apiCore'
import LootieLoader from '../Components/LootieAnimations/Loader'



// const blurhash =
//   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const NotifcationCard = ({item, index, setNotificationDetails}) => {
    

    const handleOnPress = () => {
        setNotificationDetails(item)
    }

    return (
        <Animated.View entering={FadeInDown}>
            <TouchableOpacity 
                onPress={handleOnPress}
                className={`py-4 w-full ${item?.seen ? 'bg-bgSecondary border-textSecondary' : 'bg-bgPrimary'} rounded-2xl flex flex-row justify-between items-center px-4`}
                style={item?.seen ? {borderWidth: 0.5} : {}}
                >
                {/* <View>
                    <View className="bg-appColor h-3 w-3 rounded-full"></View>
                </View> */}

                <View className="flex-1 ml-4">
                    <Text className="text-md text-textMid" semi>Zahtev za pridruživanje</Text>
                    <Text className="text-md text-textPrimary" bold>{item?.message || ''}</Text>
                </View>

                <View className="ml-5">
                    <MaterialIcons name="arrow-forward-ios" size={30} color="#000" />
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
  const [checkIfToJoinSalonRequestExists, {isLoading: isCheckRequestLoading}] = useCheckIfToJoinSalonRequestExistsMutation()
  const [requestDetails, setRequestDetails] = useState(null)
  const [requestErrorMessage, setRequestErrorMessage] = useState('')

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
                    const {error, data} = await checkIfToJoinSalonRequestExists({
                        recipient: notificationDetails?.recipient,
                        salonId: salonData?._id,
                        sender: notificationDetails?.sender
                    })
    
                    if(error){
                        console.log(error)
                        setRequestErrorMessage('Došlo je do greške')
                    }
    
                    if(data && data.success){
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
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>Obaveštenja</Text>
        </View>

        <View className="h-full flex flex-col justify-between px-4">
          {notificationDetails && 
            <View className="flex-1 flex flex-col justify-start items-center">
                {isCheckRequestLoading && 
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
                    <View className="w-full">
                        <Text>{notificationDetails.message}</Text>
                    </View>
                }
            </View>
          }

          {!notificationDetails && <View className="flex-1 flex flex-col justify-start items-center">
           
            {notifications.all.length === 0 && 
                <View className="flex flex-col justify-start items-center mt-10">
                    <Text className="text-lg text-center" bold>Trenutno nemaš obaveštenja</Text>
                </View>
            }

            {sortedNotifications?.today.length > 0 && 
                <View className="w-full">
                    <View className="mt-4">
                        <Text className="text-textPrimary text-md" bold>Danas</Text>
                        <View className="bg-textSecondary w-full my-4" style={{height: 0.5}}></View>
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
                                    index={index} 
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
                                    index={index}  
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
                                    index={index}  
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
                                    index={index}  
                                />
                            )
                        }}
                    /> 
                </View>
            }

          </View>}
        </View>
    </SafeAreaView>
  )
}

export default NotificationsScreen