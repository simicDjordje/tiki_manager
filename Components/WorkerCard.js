import { View, TouchableOpacity } from 'react-native'
import React, { forwardRef } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import { useNavigation } from '@react-navigation/native'
import Animated, { BounceInDown, BounceInUp, BounceOut } from 'react-native-reanimated'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const WorkerCard = forwardRef(({userData, isJustCreated}, ref) => {
  const navigation = useNavigation()

  const handleToWorkerScreen = () => {
    navigation.navigate('StackTabScreens', {screen: 'WorkerScreen'})
  }

  return (
    <TouchableOpacity ref={ref} onPress={handleToWorkerScreen} className={`bg-bgPrimary h-28 w-full rounded-2xl mb-4 flex flex-row justify-between items-center px-4 relative ${isJustCreated && 'z-20'}`}>
      {isJustCreated && 
          <Animated.View entering={BounceInDown} exiting={BounceOut} className="bg-appColor absolute -top-12 px-4 py-2 rounded-xl w-full">
              <Text className="text-white" bold>Upravljaj lako svojim terminima</Text>
          </Animated.View>
      }
      <Image
          className="w-16 h-16 rounded-full border-2 border-appColor"
          source={`http://192.168.1.4:5000/photos/profile-photo${userData?._id}.png`}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
      />
    </TouchableOpacity>
  )
})

export default WorkerCard