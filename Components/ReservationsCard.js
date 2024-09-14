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


const ReservationsCard = ({userData, setIsMessageModalVisible}) => {
  const navigation = useNavigation()

  const handleToWorkerScreen = () => {
    if(!userData?.worksInSalon){
      setIsMessageModalVisible(true)
      return
    }
    navigation.navigate('StackTabScreens', {screen: 'WorkerScreen'})
  }

  return (
    <TouchableOpacity onPress={handleToWorkerScreen} className={`bg-bgPrimary h-28 w-full rounded-3xl mb-4 flex flex-row justify-between items-center px-4 relative`}>
      
      {/* <FontAwesome6 name="user-clock" size={24} color="#000" /> */}
      <View className="flex flex-row justify-center items-center bg-appColorDark w-8 h-8 rounded-full">
        <Text className="text-white" bold>34</Text>
      </View>

      <View className="flex-1 h-full p-4">
        <Text className="text-lg" bold>Rezervacije</Text>
        <Text className="text-md" semi>Zahtevi rezervacija</Text>
        {!userData?.worksInSalon && <Text className="text-md text-textMid">Moraš biti član nekog salona</Text>}
        {userData?.worksInSalon && <Text className="text-md text-textMid">Prihvati ili odobri zahteve</Text>}
      </View>

      <View className="">
          <MaterialIcons name="arrow-forward-ios" size={30} color="#000" />
      </View>
    </TouchableOpacity>
  )
}

export default ReservationsCard