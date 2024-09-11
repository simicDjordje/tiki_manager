import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '../Components/CustomComponents/CustomText'
import Swiper from 'react-native-swiper'
import LootiePeopleTogether from '../Components/LootieAnimations/PeopleTogether'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { BounceInDown, BounceInUp, FadeInDown } from 'react-native-reanimated'
import CustomButton from '../Components/CustomComponents/CustomButton'
import { setJustSignedUp } from '../redux/generalSlice'
import { useNavigation } from '@react-navigation/native'

const ScreenOne = () => {
    const {userData} = useSelector(state => state.general)

    const fadeInDown = FadeInDown.delay(1500)

    return (
        <View className="h-full bg-appColorDark">
            <Animated.View entering={BounceInUp} className="mt-56">
                {/* <Text className={`text-${userData?.first_name > 5 ? '4xl' : '5xl'} text-white text-center mb-4`} bold>{userData?.first_name},</Text> */}
                <Text className="text-white text-4xl text-center" bold>Drago nam je što si tu!</Text>
            </Animated.View>

            <Animated.View entering={fadeInDown} className="px-3 mt-8">
                <Text className="text-white text-center text-lg" semi style={{fontSize: 17}}>
                  Dok je <Text className="text-white" bold>tiki</Text> namenjen tvojim klijentima za rezervaciju usluga, <Text className="text-white" bold>tiki manager</Text> ti omogućava da lako upravljaš svojim salonom, radnicima i rezervacijama.
                </Text>
            </Animated.View>
        </View>
    )
}

const ScreenTwo = () => {
    return (
        <View className="h-full bg-bgPrimary">
            <Animated.View entering={BounceInUp} className="mt-56">
                <Text className="text-4xl text-appColorDark text-center mb-4" bold>Kreiraj svoj salon i prilagodi radno vreme, usluge, i druge važne detalje.</Text>
            </Animated.View>
        </View>
    )
}

const ScreenThree = () => {
    return (
        <View className="h-full bg-appColorDark">
            <Animated.View entering={BounceInUp} className="mt-56">
                <Text className="text-4xl text-white text-center mb-4" bold>Svaki salon treba svoj tim.</Text>
                <Text className="text-white text-2xl text-center" bold>Dodaj radnike, uključujući sebe, kako bi osigurali glatko poslovanje.</Text>
            </Animated.View>
        </View>
    )
}

const ScreenFour = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    return (
        <View className="h-full bg-bgPrimary">
            <Animated.View entering={BounceInUp} className="mt-56">
                <Text className="text-4xl text-appColorDark text-center mb-4" bold>Svi radnici treba da imaju svoj nalog.</Text>
                <Text className="text-appColor mt-5 text-2xl text-center" bold>Pronađi idealan tim za tvoj salon i upravljaj rezervacijama efikasno.</Text>
            </Animated.View>

            <View className="px-4 mt-56">
                <CustomButton 
                    text='Započni'
                    onPress={()=>{
                        dispatch(setJustSignedUp(false))
                        navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
                    }}
                />
            </View>
        </View>
    )
}

const WelcomeScreen = () => {
  return (
    <View className="h-full w-full">
        <Swiper
        showsButtons={false}
        activeDotColor='white'
        loop={false}
        dotColor='#babbb6'
        >
            <ScreenOne />
            <ScreenTwo />
            <ScreenThree />
            <ScreenFour />
        </Swiper>
    </View>
  )
}

export default WelcomeScreen