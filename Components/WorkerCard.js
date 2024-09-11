import { View, TouchableOpacity } from 'react-native'
import React, { forwardRef } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image } from 'expo-image'
import Text from './CustomComponents/CustomText'
import { useNavigation } from '@react-navigation/native'
import Animated, { BounceInDown, BounceInUp, BounceOut } from 'react-native-reanimated'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const WorkerCard = forwardRef(({userData, isJustCreated}, ref) => {
  const navigation = useNavigation()

  const handleToWorkerScreen = () => {
    navigation.navigate('StackTabScreens', {screen: 'WorkerScreen'})
  }

  return (
    <TouchableOpacity ref={ref} onPress={handleToWorkerScreen} className={`bg-bgPrimary h-28 w-full rounded-3xl mb-4 flex flex-row justify-between items-center px-4 relative z-10 ${isJustCreated && 'z-20'}`}>
      {isJustCreated && 
          <Animated.View entering={BounceInDown} exiting={BounceOut} className="bg-appColor absolute -top-12 px-4 py-2 rounded-xl w-full">
              <Text className="text-white" bold>Upravljaj lako svojim terminima</Text>
          </Animated.View>
      }
      {/* <Image
          className="w-16 h-16 rounded-full border-2 border-appColor"
          source={`http://192.168.1.28:5000/photos/profile-photo${userData?._id}.png`}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
      /> */}

      <FontAwesome6 name="calendar-days" size={24} color="#000" />

      <View className="flex-1 h-full p-4">
        <Text className="text-lg" bold>Termini</Text>
        <Text className="text-md" semi>Upravljaj svojim terminima</Text>
        <Text className="text-md text-textMid">Moraš biti član nekog salona</Text>
      </View>

      <View className="">
          <MaterialIcons name="arrow-forward-ios" size={30} color="#000" />
      </View>
    </TouchableOpacity>
  )
})

export default WorkerCard