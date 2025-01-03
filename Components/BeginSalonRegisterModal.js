import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Text from './CustomComponents/CustomText'
import CustomButton from './CustomComponents/CustomButton'


const BeginSalonRegisterModal = ({isModalVisible, setIsModalVisible}) => {
    const navigation = useNavigation()

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const beginSalonRegister = () => {
        setIsModalVisible(false)
        navigation.navigate('StackTabScreens', {screen: 'AddSalonScreen'})
    }

    return (
      <Modal 
          isVisible={isModalVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: 0}}
      >
          <View className="flex-1 flex flex-col justify-end items-center w-full">
              <View className="h-5/6 w-full">
                <View 
                    className="h-full w-full bg-bgPrimary px-4"
                    style={{borderTopRightRadius: 50, borderTopLeftRadius: 50}}
                >
                    <View className="flex flex-row justify-between items-center w-full mt-6">
                        <Text className="text-xl ml-2" bold>Dodavanje novog salona</Text>

                        <TouchableOpacity onPress={closeModal} className="p-1 bg-textPrimary rounded-full">
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-textSecondary w-full h-0.5 mt-4"></View>

                    <View>
                        <View className="flex flex-col justify-center items-center mt-4">
                            <Text className="text-lg text-center" bold>Započni proces dodavanja svog salona!</Text>

                            <Text className="text-center text-textMid mt-2">
                                U sledećim koracima ćemo ti pomoći da lako dodaš svoj salon i započneš svoj put.
                            </Text>

                            
                            <Text className="text-center text-textMid mt-12">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                            </Text>
                        </View>

                        <View className="flex flex-col justify-center items-center mt-44">
                            <CustomButton 
                                onPress={beginSalonRegister}
                                text={'Započni'}
                                variant={'dark'}
                            />
                        </View>
                    </View>
                </View>
              </View>
          </View>
      </Modal>
    )
  }
  
  export default BeginSalonRegisterModal