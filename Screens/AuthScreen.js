import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { textData } from '../constants'
import AuthComponent from '../Components/AuthComponent'
import Text from '../Components/CustomComponents/CustomText'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingComponent from '../Components/LoadingComponent'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'



// const AnimatedComponentView = Animated.createAnimatedComponent(View)


const AuthScreen = ({navigation}) => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true)
  const {userData} = useSelector(state => state.general)

  useEffect(()=>{
    console.log(userData)
    setIsLoadingScreen(true)

    if(userData === 'loading') return

    if(!userData){
      setIsLoadingScreen(false)
      return
    }
    navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
  }, [userData])

  if(isLoadingScreen) return <LoadingComponent />

  return (
    <View className="bg-appColor h-full">
      <StatusBar style={'light'} />
      <SafeAreaView className="h-full">
      <View className="h-full flex flex-col justify-between items-center">
              <View className="w-full mt-4 flex flex-col justify-between h-24">
                  <View className="px-4">
                      <Text className="text-white text-3xl" bold>tiki <Text className="text-2xl text-appColorDark" semi>manager</Text></Text>
                  </View>
              </View>

              
              {/* Auth Component */}
              <AuthComponent />
            
      </View>

          
      </SafeAreaView>
    </View>
  )
}

export default AuthScreen




