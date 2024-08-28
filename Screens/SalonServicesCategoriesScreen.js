import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import Text from '../Components/CustomComponents/CustomText'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CreateServicesCategoryModal from '../Components/CreateServicesCategoryModal'
import {useCreateCategoryMutation, useGetSalonByIdMutation} from '../redux/apiCore'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCategory } from '../redux/generalSlice'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const SalonServicesCategoriesScreen = ({navigation}) => {
  const {currentSalon: salonData} = useSelector(state => state.general)
  const [isCreateCategoryModalVisible, setIsCreateCategoryModalVisible] = useState(false)
  const [createCategory, {isLoading: isCreateCategoryLoading}] = useCreateCategoryMutation()
  const [getSalonById] = useGetSalonByIdMutation()
  const [categoryName, setCategoryName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isCategoryAddedSuccess, setIsCategoryAddedSuccess] = useState(false)
  const dispatch = useDispatch()

  const handleBack = () => {
    navigation.navigate('StackTabScreens', {screen: 'SalonScreen'})
  }

  const handleToServices = (category) => {
    dispatch(setActiveCategory(category))
    navigation.navigate('StackTabScreens', {screen: 'SalonServicesScreen'})
  }

  const beginAddCategory = () => {
    setIsCreateCategoryModalVisible(true)
  }

  const handleAddCategory = async () => {
    if(!categoryName) return
    
    try{
        const {error, data} = await createCategory({salonId: salonData?._id, name: categoryName})
        if(error){
            if(error?.data?.message == 'A category with this name already exists in this salon'){
                setErrorMessage('U salonu već postoji kategorija sa ovim imenom')
            }else{
                setErrorMessage('Došlo je do greške')
            }

            return
        }

        if(data && data.success){
            setIsCategoryAddedSuccess(true)
            getSalonById({salonId: salonData?._id})

            setTimeout(()=>{
                setIsCreateCategoryModalVisible(false)
            }, 2700)
        }
    }catch(error){
        console.log(error)
    }
  }



  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <StatusBar style={'dark'} />
        <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgPrimary">
            <TouchableOpacity onPress={handleBack}>
                <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
            </TouchableOpacity>
            <Text className="text-textPrimary text-lg" bold>{salonData?.name && salonData?.name.length > 34 ? `${salonData?.name.substring(0, 34)}...` : salonData?.name}</Text>
        </View>
        <View className="h-full flex flex-col justify-between px-4">
          <View className="flex-1 flex flex-col justify-start items-center">
            <View className="w-full flex flex-row justify-between items-center mt-6">
                <View>
                  <Text className="text-2xl" bold>Kategorije usluga</Text>
                </View>
                <TouchableOpacity onPress={beginAddCategory} className="p-3 bg-textPrimary rounded-full">
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="bg-textSecondary mt-8 w-full mb-5" style={{height: 0.5}}></View>
            
            {salonData?.categories.length === 0 && <View>
                <Text className="text-center text-textMid" bold>Kreiraj kategorije u kojima možeš dodavati usluge</Text>
                <Text className="text-center text-textMid">Nemaš još uvek nijednu kategoriju</Text>
            </View>}

            <View className="flex-1 w-full mb-3 mt-10">
                {salonData?.categories.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-10">
                        <Text className="text-lg mb-3" bold>Kreiraj kategoriju</Text>
                        <TouchableOpacity onPress={beginAddCategory} className="p-4 bg-textPrimary rounded-full">
                            <Entypo name="plus" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                }
                
                {/* {salonData?.categories.length === 0 && 
                    <View className="px-12">
                        <View className="bg-textSecondary mt-5 w-full" style={{height: 0.5}}></View>
                    </View>
                }

                {salonData?.categories.length === 0 && 
                    <View className="flex flex-col justify-center items-center mt-5">
                        <Text className="text-lg mb-3" bold>Kopiraj iz jednog od svojih salona</Text>
                        <TouchableOpacity onPress={beginAddCategory} className="p-5 bg-textPrimary rounded-full">
                            <Feather name="copy" size={58} color="white" />
                        </TouchableOpacity>
                    </View>
                } */}
            </View>
              
            
             {salonData?.categories.length > 0 && 
                <View className="flex flex-row justify-start items-center w-full -mt-10">
                    <Text className="text-textMid" semi>Kategorije usluga</Text>
                </View>
             }

              {salonData?.categories.length > 0 && 
                <ScrollView className="w-full">
                    <View className="min-h-screen">
                        {salonData?.categories.map(({category}, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => {handleToServices(category)}} className="bg-bgPrimary w-full h-28 mt-4 rounded-xl p-4 flex flex-col justify-between">
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="text-textPrimary text-xl" bold>{category?.name}</Text>
                                        <MaterialIcons name="arrow-forward-ios" size={20} color="#232323" />
                                    </View>
                                    <View className="bg-textSecondary mt-3 w-full" style={{height: 0.5}}></View>

                                    <View className="flex-1">
                                        <View className="flex flex-row justify-between items-center mt-2">
                                            <Text>Ukupno usluga u ovoj kategoriji: </Text>
                                            <Text semi>{category?.services?.length}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}

                        <View className="mb-44"></View>
                    </View>
                </ScrollView>
              }
          </View>
        </View>

        <CreateServicesCategoryModal 
            isModalVisible={isCreateCategoryModalVisible}
            setIsModalVisible={setIsCreateCategoryModalVisible}
            handleAddCategory={handleAddCategory}
            name={categoryName}
            setName={setCategoryName}
            isSuccess={isCategoryAddedSuccess}
            setIsSuccess={setIsCategoryAddedSuccess}
            isLoading={isCreateCategoryLoading}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
        />
    </SafeAreaView>
  )
}

export default SalonServicesCategoriesScreen