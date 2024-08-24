import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Text from './CustomComponents/CustomText'
import { StatusBar } from 'expo-status-bar'


const UnsavedChangesModal = ({isModalVisible, setIsModalVisible, userData}) => {

  return (
    <Modal 
        isVisible={isModalVisible}
        animationInTiming={400}
        animationOutTiming={400}
    >
        <View className="flex-1 flex flex-col justify-center items-center">
            <View className="h-4/6 w-full">
              <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center px-4" style={{borderRadius: 50}}>
                <View className="px-4 mt-4">
                  <View className="flex flex-row justify-end items-center">
                    <TouchableOpacity onPress={()=>setIsModalVisible(false)} className="-mr-4 -mt-1 p-1 bg-textPrimary rounded-full">
                      <Ionicons name="close" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                  <Text className="mt-4 text-center text-xl text-textPrimary" bold>Svi radnici treba da imaju svoj nalog.</Text>
                  <Text className="mt-2 text-lg text-textMid text-center" bold>Pronađi idealan tim za tvoj salon i upravljaj rezervacijama efikasno.</Text>
                </View>
              </View>
            </View>
        </View>
    </Modal>
  )
}

export default UnsavedChangesModal