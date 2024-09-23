import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Text from './CustomComponents/CustomText'
import { StatusBar } from 'expo-status-bar'
import CustomButton from './CustomComponents/CustomButton'


const ConfirmActionModal = ({isModalVisible, setIsModalVisible, handleConfirm, title, question, isLoading, isError, isSuccess}) => {

  return (
    <Modal 
        isVisible={isModalVisible}
        animationInTiming={400}
        animationOutTiming={400}
    >
        <View className="flex-1 flex flex-col justify-center items-center">
            <View className={`${!question ? 'h-[30%]' : 'h-[40%]'} w-full`}>
              <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center px-4 relative rounded-3xl">
                <View className="px-4 mt-4">
                  <View className="flex flex-row justify-end items-center">
                    <TouchableOpacity onPress={()=>setIsModalVisible(false)} className="absolute -top-8 -right-20 p-3 bg-textPrimary rounded-full">
                      <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                  <Text className="mt-4 text-center text-xl text-textPrimary" bold>{title || ''}</Text>
                  {question && 
                    <Text className="mt-2 text-lg text-textMid text-center" bold>{question || ''}</Text>
                  }

                  {/* <TouchableOpacity 
                      onPress={handleConfirm}
                      className="bg-textPrimary rounded-xl p-4 flex flex-row justify-center items-center mt-10">
                      <Text className="text-white text-lg" bold>Da</Text>
                  </TouchableOpacity> */}
                  
                  <View className="h-6">
                    {isError && <Text className="text-center text-red-700">Došlo je do greške</Text>}
                  </View>

                  <View className="mt-5">
                    <CustomButton 
                        text={'Da'}
                        variant={'dark'}
                        onPress={handleConfirm}
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                    />
                  </View>
                </View>
              </View>
            </View>
        </View>
    </Modal>
  )
}

export default ConfirmActionModal