import { View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '../Components/CustomComponents/CustomText'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AccountScreen = ({navigation}) => {

  useFocusEffect(useCallback(()=>{
    (async () => {
      await AsyncStorage.removeItem('@userData')
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