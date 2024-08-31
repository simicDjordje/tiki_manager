import { View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '../Components/CustomComponents/CustomText'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/generalSlice'

const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch()

  useFocusEffect(useCallback(()=>{
    (async () => {
      dispatch(setUser(null))
      navigation.navigate('AuthTabScreens', {screen: 'AuthScreen'})
    })()
  }, []))
  return (
    <View>
      <Text>AccountScreen</Text>
    </View>
  )
}

export default AccountScreen