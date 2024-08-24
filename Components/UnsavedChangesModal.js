import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Text from './CustomComponents/CustomText'
import { StatusBar } from 'expo-status-bar'


const UnsavedChangesModal = ({isModalVisible, setIsModalVisible, handleConfirm}) => {

  return (
    <Modal 
        isVisible={isModalVisible}
        animationInTiming={400}
        animationOutTiming={400}
    >
        <View className="flex-1 flex flex-col justify-center items-center">
            <View className="h-2/6 w-full">
              <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center px-4 relative" style={{borderRadius: 50}}>
                <View className="px-4 mt-4">
                  <View className="flex flex-row justify-end items-center">
                    <TouchableOpacity onPress={()=>setIsModalVisible(false)} className="absolute -top-8 -right-7 p-3 bg-textPrimary rounded-full">
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                  <Text className="mt-4 text-center text-xl text-textPrimary" bold>Imaš nečuvane izmene!</Text>
                  <Text className="mt-2 text-lg text-textMid text-center" bold>Da li želiš da napustiš stranicu i izgubiš promene?</Text>

                  <TouchableOpacity 
                      onPress={handleConfirm}
                      className="bg-textPrimary rounded-3xl p-4 flex flex-row justify-center items-center mt-10">
                      <Text className="text-white text-lg" bold>Da</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </View>
    </Modal>
  )
}

export default UnsavedChangesModal