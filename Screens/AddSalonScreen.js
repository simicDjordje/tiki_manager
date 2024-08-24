import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import AddSalonLastStep from '../Components/AddSalonLastStep'
import Animated, { FadeIn, SequencedTransition } from 'react-native-reanimated'
import LootieSuccess from '../Components/LootieAnimations/Success'
import Text from '../Components/CustomComponents/CustomText'
import UnsavedChangesModal from '../Components/UnsavedChangesModal'


const AnimatedComponentView = Animated.createAnimatedComponent(View)


const AddSalonScreen = () => {
  const [step, setStep] = useState(1)
  const navigation = useNavigation()

  const [validation1, setValidation1] = useState(false)
  const [validation2, setValidation2] = useState(false)
  const [validation3, setValidation3] = useState(false)
  const [validation4, setValidation4] = useState(false)

  const [isUnsavedChangesModalVisible, setIsUnsavedChangesModalVisible] = useState(false)

  //data collection
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState(null)
  const [logo, setLogo] = useState(null)
  const [images, setImages] = useState([])


  const [isSuccess, setIsSuccess] = useState(false)
  const [showFinishButton, setShowFinishButton] = useState(false)
  const [shouldLeaveOnScreen, setShouldLeaveOnScreen] = useState(true)

  const handleConfirm = () => {
    setShouldLeaveOnScreen(true)
  }

  useEffect(() => {
    if(isUnsavedChangesModalVisible && shouldLeaveOnScreen){
      navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
      return
    }

  }, [shouldLeaveOnScreen, isUnsavedChangesModalVisible])

  useEffect(() => {
    if(name || description || location || logo || images.length > 0){
      setShouldLeaveOnScreen(false)
    }
  }, [name, description, location, logo, images])

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
        if (shouldLeaveOnScreen) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        setIsUnsavedChangesModalVisible(true)
      }),
    [navigation, shouldLeaveOnScreen]
  );

  useEffect(()=>{
    if(!isSuccess) return

    setTimeout(()=>{setShowFinishButton(true)}, 3000)
  }, [isSuccess])

  const handleBack = () => {
    if(step === 1){
      navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
      return
    }

    setStep(prev => prev - 1)
  }

  const handleNext = () => {
    if(step === 1){
      if(!name || !description){
        setValidation1(true)
        return
      }
    }

    if(step === 2){
      console.log(!location)
      if(!location){
        setValidation2(true)
        return
      }
    }

    if(step === 3){
      if(!logo){
        setValidation3(true)
        return
      }
    }

    if(step === 4){
      if(!images.length){
        setValidation4(true)
        return
      }
    }

    setStep(prev => prev + 1)
  }

  const handleFinish = () => {
    setIsSuccess(false)
    navigation.navigate('MainTabScreens', {screen: 'HomeScreen', params: {newSalonCreated: true, salonId: 'djsahdasjdasjkdas'}})
    return
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
              {!isSuccess && 
                <View className="w-full mt-4 flex flex-row justify-between px-4">
                    <TouchableOpacity onPress={handleBack}>
                        <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-textPrimary text-3xl" bold>tiki <Text className="text-2xl text-textSecondary" semi>manager</Text></Text>
                </View>
              }

              {!isSuccess && 
                <View className="mt-10 px-4">
                  <ProgressBarComponent stepsCount={5} currentStep={step} />
                </View>
              }

              <AnimatedComponentView layout={SequencedTransition} className={`mt-${!isSuccess ? '10' : '4'} px-4 bg-bgSecondary h-full`} style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                {!isSuccess && 
                <View className="flex flex-row justify-between items-center w-full mt-6">
                    <View>
                      <Text className="text-lg ml-2 text-textPrimary" bold>
                        {step === 1 && 'Ime i opis salona'}
                        {step === 2 && 'Lokacija salona'}
                        {step === 3 && 'Logo salona'}
                        {step === 4 && 'Slike salona'}
                        {step === 5 && 'Dodaj salon'}
                      </Text>
                      <Text className="text-textMid ml-2">
                          {step === 1 || step === 2 || step === 3 && 'Sve informacije se mogu kasnije izmeniti'}
                          {step === 4 && 'Dodaj najviše 6 slika'}
                          {step === 5 && 'Potvrdi unete podatke'}
                      </Text>
                    </View>

                    {step === 4 && 
                      <TouchableOpacity onPress={pickMultipleImage} className="p-3 bg-textPrimary rounded-full">
                        <Entypo name="plus" size={24} color="white" />
                    </TouchableOpacity>
                    }
                </View>
                }

              {isSuccess && 
                <View className="flex flex-row justify-between items-center w-full mt-6">
                    <View>
                      <Text className="text-lg ml-2 text-textPrimary" bold>
                        Salon uspešno dodat
                      </Text>
                      <Text className="text-textMid ml-2">
                          Čestitamo
                      </Text>
                    </View>
                </View>
                }

                

                <View className="bg-textSecondary w-full h-0.5 mt-4"></View>

                {!isSuccess && 
                  <View className="h-96 pt-10">
                    {step === 1 && 
                    <AddSalonStepOne 
                      name={name}
                      setName={setName}
                      description={description}
                      setDescription={setDescription}
                      validation1={validation1}
                    />}
                    {step === 2 && 
                    <AddSalonStepTwo 
                      location={location}
                      setLocation={setLocation}
                      validation2={validation2}
                    />}
                    {step === 3 && 
                    <AddSalonStepThree 
                      logo={logo}
                      setLogo={setLogo}
                      validation3={validation3}
                    />}
                    {step === 4 && 
                    <AddSalonStepFour 
                      images={images} 
                      setImages={setImages} 
                      validation4={validation4}
                    />
                    }
                    {step === 5 && <AddSalonLastStep />}
                  </View>}

                  {!isSuccess && 
                  <TouchableOpacity 
                      onPress={step === 5 ? ()=>{setIsSuccess(true)} : handleNext}
                      className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mt-10">
                      <Text className="text-white text-lg" bold>{step === 5 ? 'Potvrdi' : 'Dalje'}</Text>
                  </TouchableOpacity>
                  }

                  {isSuccess &&
                    <View className="h-screen pt-10 flex flex-col justify-center items-center">
                        <Text className="text-2xl text-center -mt-56" bold>Uspešno kreiran salon</Text>
                        <Text className="text-lg text-center">Salon je spreman na početnoj, vreme je da ga pokreneš!</Text>

                        <View className="pb-20">
                          <LootieSuccess d={250} />
                        </View>

                       <View className="h-32 w-full">
                        {showFinishButton && 
                        <AnimatedComponentView entering={FadeIn}>
                            <TouchableOpacity 
                                onPress={handleFinish}
                                className="bg-appColorDark rounded-3xl p-4 flex flex-row justify-center items-center mt-10 w-full">
                                <Text className="text-white text-lg" bold>Nazad na početnu</Text>
                            </TouchableOpacity> 
                          </AnimatedComponentView> 
                        }
                       </View>
                    
                    </View>
                  }
              </AnimatedComponentView>

          </View>

          <UnsavedChangesModal 
            isModalVisible={isUnsavedChangesModalVisible}
            setIsModalVisible={setIsUnsavedChangesModalVisible}
            handleConfirm={handleConfirm}
          />
    </SafeAreaView>
  )
}

export default AddSalonScreen