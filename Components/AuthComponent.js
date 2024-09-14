import { View } from 'react-native'
import LootieCat from './LootieAnimations/Cat'
import { useState } from 'react'
import RegisterComponent from './RegisterComponent'
import LoginComponent from './LoginComponent'
import Animated, {BounceInDown, SequencedTransition} from 'react-native-reanimated'

const AnimatedComponentView = Animated.createAnimatedComponent(View)


const AuthComponent = () => {
    const [authType, setAuthType] = useState('login')

  return (
    <AnimatedComponentView entering={BounceInDown} layout={SequencedTransition} className="bg-bgPrimary w-full flex-col justify-between items-center relative flex-1" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        {/* <View className="-mt-28">
            <LootieCat d={180} />
        </View> */}
        <View className="bg-bgSecondary flex-1 w-full absolute h-full top-10" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
            <View className="px-4 mt-10">
                {authType === 'register' ? 
                    <RegisterComponent 
                        setAuthType={setAuthType}
                    />
                    :
                    <LoginComponent 
                        setAuthType={setAuthType}
                    />
                }
            </View>
        </View>
    </AnimatedComponentView>
  )
}

export default AuthComponent