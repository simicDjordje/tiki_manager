import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native"
import MainTab from "./MainTab"
import StackTab from './StackTab'
import AuthTab from "./AuthTab"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setNotifications, setUser } from "../redux/generalSlice"
import { useSocket } from "../Context/SocketContext"
import { useGetMyUserDataMutation, useGetNotificationsMutation } from "../redux/apiCore"
import { Pressable } from "react-native"
// import { usePushNotifications } from "../usePushNotifications"


const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const {userData, notifications} = useSelector(state => state.general)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // const {expoPushToken, notification} = usePushNotifications()
  const {socket} = useSocket()
  const [getNotifications] = useGetNotificationsMutation()
  const [getMyUserData] = useGetMyUserDataMutation()

  useEffect(()=>{
    if(!socket) return

    socket.on('notificationsChange', () => {
      console.log(131231231212321313221132123123)
      getNotifications()
      getMyUserData()
    })

    return () => socket.off('notificationsChange')
}, [socket])
  

  //ON FOCUS IF USER IN ASYNC STORAGE - SET IT IN REDUX STATE
  useFocusEffect(useCallback(()=>{
    (async () => {
      try{
        const user = await AsyncStorage.getItem('@userData')
        dispatch(setUser(user ? JSON.parse(user) : null))
          
      }catch(error){
        console.log(error)
      }
    })()
  }, []))

  //EVERYTIME USER IN REDUX STATE CHANGES - SET IT TO ASYNC STORAGE
  useEffect(()=>{
    (async () => {
      if(userData === 'loading') return
      await AsyncStorage.setItem('@userData', JSON.stringify(userData))
      if(!userData){
        navigation.navigate('AuthTabScreens')
      }
    })()
  }, [userData])

  return (
      <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}>
            
            <Stack.Screen name="AuthTabScreens" component={AuthTab} />
            <Stack.Screen name="MainTabScreens" component={MainTab} />
            <Stack.Screen name="StackTabScreens" component={StackTab} />
      </Stack.Navigator>
  )
}


const Navigation = () => (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  )


export default Navigation