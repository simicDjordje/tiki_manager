import { useState, useEffect, useRef } from "react"
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from "react-native"
import Constants from 'expo-constants'
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

export const usePushNotifications = () => {
    const {userData} = useSelector(state => state.general)
    const navigation = useNavigation()

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false,
        })
    })

    const [expoPushToken, setExpoPushToken] = useState()
    const [notification, setNotification] = useState()

    const notificationListener = useRef()
    const responseListener = useRef()

    const registerForPushNotificationsAsync = async () => {
        let token

        if(Device.isDevice){
            const {status: existingStatus} = await Notifications.getPermissionsAsync()

            let finalStatus = existingStatus

            if(existingStatus !== 'granted'){
                const {status} = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }

            if(finalStatus !== 'granted'){
                alert('Failed to get push token')
                return
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId
            })

            if(Platform.OS === 'android'){
                Notifications.setNotificationChannelAsync("default", {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',                
                })
            }

            return token
        }else{
            console.log('ERROR: Please use a physical device')
        }
    }


    useEffect(()=>{
        if(!userData) return

        (async ()=>{
            const token = await registerForPushNotificationsAsync()
            setExpoPushToken(token)

            notificationListener.current = Notifications.addNotificationReceivedListener((notificationFromListener) => {
                console.log('Notification received:', notification)
                setNotification(notificationFromListener)
            })

            responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
                console.log('RESPONSE: ', response)
            })
        })()

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [userData])


    return {
        expoPushToken,
        notification
    }

}