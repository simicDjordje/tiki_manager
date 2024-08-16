import { View, TouchableOpacity } from 'react-native'
import React, {forwardRef} from 'react'
import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Animated, {BounceInUp, BounceOut} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import Text from './CustomComponents/CustomText'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonCard = forwardRef(({isJustCreated}, ref) => {
    const navigation = useNavigation()

    const handleToSalon = () => {
        navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
    }

  return (
    <TouchableOpacity onPress={handleToSalon} ref={ref} className={`bg-appColor h-44 w-[48%] rounded-2xl mb-4 flex flex-col justify-between relative ${isJustCreated && 'z-20'}`}>
            {isJustCreated && 
                <Animated.View entering={BounceInUp} exiting={BounceOut} className="bg-bgPrimary absolute -top-12 px-4 py-2 rounded-xl">
                    <Text className="text-textPrimary" bold>Pogledaj svoj salon</Text>
                </Animated.View>
            }
            <View>
                <View className="flex flex-row justify-between items-center px-2 pt-2">
                    <Image
                        className="w-8 h-8 rounded-full border-2 border-appColorDark"
                        source={require('../assets/salonLogo.jpg')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />

                    <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                </View>


                <View className="px-2 mt-2">
                    <Text className="text-lg text-white" bold>Beauty Studio PK</Text>
                </View>
            </View>


            <View className="flex flex-row justify-start items-center p-1 bg-bgPrimary rounded-2xl">
                <Image
                        className="w-8 h-8 rounded-full border-2 border-appColorDark"
                        source={require('../assets/fpp.png')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />

                <Image
                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                        source={require('../assets/e2.jpg')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />

                <Image
                        className="w-8 h-8 rounded-full border-2 border-appColorDark -ml-2"
                        source={require('../assets/fpp2.png')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
                <Image
                        className="w-8 h-8 rounded-full border-2 border-appColor -ml-2"
                        source={require('../assets/e4.jpg')}
                        placeholder={{ blurhash }}
                        contentFit="cover"
                        transition={1000}
                    />
            </View>
        </TouchableOpacity>
  )
})

export default SalonCard