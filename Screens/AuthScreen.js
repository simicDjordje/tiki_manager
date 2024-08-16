import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { textData } from '../constants'
import AuthComponent from '../Components/AuthComponent'
import Text from '../Components/CustomComponents/CustomText'



// const AnimatedComponentView = Animated.createAnimatedComponent(View)


const AuthScreen = () => {
  const title = textData.registerScreen['sr'].title

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




