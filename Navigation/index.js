import { NavigationContainer, useFocusEffect } from "@react-navigation/native"
import MainTab from "./MainTab"
import StackTab from './StackTab'
import AuthTab from "./AuthTab"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setUser } from "../redux/generalSlice"

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const {userData} = useSelector(state => state.general)
  const dispatch = useDispatch()

  useFocusEffect(useCallback(()=>{
    (async () => {
      try{
        const user = await AsyncStorage.getItem('@userData')
        console.log(user)
        dispatch(setUser(user ? JSON.parse(user) : null))
          
      }catch(error){
        console.log(error)
      }
    })()
  }, []))


  useEffect(()=>{
    (async () => {
      if(userData === 'loading') return
      console.log('setting user data')
      console.log('setting: ', userData)
      await AsyncStorage.setItem('@userData', JSON.stringify(userData))
      console.log('end user data')
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