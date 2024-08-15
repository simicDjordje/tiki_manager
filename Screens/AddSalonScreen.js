import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import ProgressBarComponent from '../Components/ProgressBarComponent'
import AddSalonStepOne from '../Components/AddSalonStepOne'
import AddSalonStepTwo from '../Components/AddSalonStepTwo'
import AddSalonStepThree from '../Components/AddSalonStepThree'
import AddSalonStepFour from '../Components/AddSalonStepFour'
import Entypo from '@expo/vector-icons/Entypo'
import * as ImagePicker from 'expo-image-picker'


const AddSalonScreen = () => {
  const [step, setStep] = useState(1)
  const navigation = useNavigation()
  const [images, setImages] = useState([])

  const handleBack = () => {
    if(step === 1){
      navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
      return
    }

    setStep(prev => prev - 1)
  }

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const pickMultipleImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    })

    if (!result.canceled) {
      const newImages = [...images, ...result.assets]

      if(newImages.length > 6){
        return
      }

      setImages(newImages)
    }
  }

  return (
    <SafeAreaView className="bg-bgPrimary h-full">
          <View className="min-h-screen">
              <View className="w-full mt-4 flex flex-row justify-between px-4">
                  <TouchableOpacity onPress={handleBack}>
                      <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
                  </TouchableOpacity>
                  <Text className="text-textPrimary text-3xl font-bold">tiki <Text className="text-2xl text-textSecondary">manager</Text></Text>
              </View>

              <View className="mt-10 px-4">
                <ProgressBarComponent stepsCount={5} currentStep={step} />
              </View>

              <View className="mt-10 px-4 bg-bgSecondary h-full" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="flex flex-row justify-between items-center w-full mt-6">
                    <View>
                      <Text className="text-lg font-bold ml-2 text-textPrimary">
                        {step === 1 && 'Ime i opis salona'}
                        {step === 2 && 'Lokacija salona'}
                        {step === 3 && 'Logo'}
                        {step === 4 && 'Slike'}
                      </Text>
                      <Text className="text-textMid ml-2">{step === 4 ? 'Dodaj najviše 6 slika' : 'Sve informacije se mogu kasnije izmeniti'}</Text>
                    </View>

                    {step === 4 && 
                      <TouchableOpacity onPress={pickMultipleImage} className="p-3 bg-appColorDark rounded-full">
                        <Entypo name="plus" size={24} color="white" />
                    </TouchableOpacity>
                    }
                </View>

                <View className="bg-textSecondary w-full h-0.5 mt-4"></View>
                {step === 1 && <AddSalonStepOne handleNext={handleNext} />}
                {step === 2 && <AddSalonStepTwo handleNext={handleNext} />}
                {step === 3 && <AddSalonStepThree handleNext={handleNext} />}
                {step === 4 && <AddSalonStepFour handleNext={handleNext} images={images} setImages={setImages} />}
              </View>

          </View>
    </SafeAreaView>
  )
}

export default AddSalonScreen