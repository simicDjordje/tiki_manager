import { View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '../Components/CustomComponents/CustomText'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/generalSlice'
import { TouchableOpacity } from 'react-native'

const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch()

  const Logout = () => {
    dispatch(setUser(null))
    console.log('before nagiate to auth')
    navigation.navigate('AuthTabScreens', {screen: 'AuthScreen'})
    console.log('after nagiate to auth')
  }

  return (
    <View>
      <Text>AccountScreen</Text>

      <TouchableOpacity onPress={Logout} className="bg-red-500 p-4 w-full mt-48">
        <Text>LOGOUUTTTTTT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen