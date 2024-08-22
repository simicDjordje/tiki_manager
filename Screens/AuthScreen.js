import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { textData } from '../constants'
import AuthComponent from '../Components/AuthComponent'
import Text from '../Components/CustomComponents/CustomText'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'



// const AnimatedComponentView = Animated.createAnimatedComponent(View)


const AuthScreen = ({navigation}) => {
  useFocusEffect(useCallback(()=>{
    (async () => {
        const user = await AsyncStorage.getItem('@userData')
        if(!user) return

        navigation.navigate('MainTabScreens', {screen: 'HomeScreen', params: {newAccount: false}})
    })()
  }, []))


  return (
    <SafeAreaView className="bg-appColor h-full">
    <View className="h-full flex flex-col justify-between items-center">
            <View className="w-full flex-1 mt-4 flex flex-col justify-between">
                <View className="px-4">
                    <Text className="text-white text-3xl" bold>tiki <Text className="text-2xl text-appColorDark" semi>manager</Text></Text>
                </View>
            </View>

            
            {/* Auth Component */}
            <AuthComponent />
          
    </View>

        
    </SafeAreaView>
  )
}

export default AuthScreen




