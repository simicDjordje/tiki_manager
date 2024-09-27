import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import Text from './CustomComponents/CustomText'
import { StatusBar } from 'expo-status-bar'
import CustomButton from './CustomComponents/CustomButton'


const ConfirmActionModal = ({isModalVisible, setIsModalVisible, handleConfirm, title, question, isLoading, isError, isSuccess, setIsError, setIsSuccess}) => {

  return (
    <Modal 
        isVisible={isModalVisible}
        animationInTiming={400}
        animationOutTiming={400}
        onModalHide={()=>{
          setIsError('')
          setIsSuccess('')
        }}
    >
        <View className="flex-1 flex flex-col justify-center items-center">
            <View className={`${!question ? 'h-[30%]' : 'h-[40%]'} w-full`}>
              <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center relative rounded-3xl">
                <View className="px-4 flex flex-col justify-between h-full">
                    <View className="flex flex-row justify-end items-center w-full mt-1">
                    {(!isLoading || !isSuccess) && 
                      <TouchableOpacity onPress={()=>setIsModalVisible(false)} className="p-3 -mr-3 bg-textPrimary rounded-full">
                        <Ionicons name="close" size={16} color="white" />
                      </TouchableOpacity>
                    }
                    </View>
                  
                  <View className="px-2">
                    <Text className="text-center text-xl text-textPrimary" bold>{title || ''}</Text>
                    {question && 
                      <Text className="mt-2 text-lg text-textMid text-center" bold>{question || ''}</Text>
                    }
                  </View>

                  {/* <TouchableOpacity 
                      onPress={handleConfirm}
                      className="bg-textPrimary rounded-xl p-4 flex flex-row justify-center items-center mt-10">
                      <Text className="text-white text-lg" bold>Da</Text>
                  </TouchableOpacity> */}
                  
                  <View className="h-6 px-2">
                    {isError && <Text className="text-center text-red-700">Došlo je do greške</Text>}
                  </View>

                  <View className="mb-4 px-2">
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