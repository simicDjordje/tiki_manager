import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import Swiper from 'react-native-swiper'
import Ionicons from '@expo/vector-icons/Ionicons'

const SlideOne = () => {
  return (
    <View className="h-full w-full bg-appColor flex flex-col justify-between items-center" style={{borderRadius: 50}}>
        <View className="w-full flex-row justify-start items-center mt-4 px-6">
          <Text className="text-white text-2xl font-bold">tiki <Text className="text-xl text-appColorDark">manager</Text></Text>
        </View>

        <View className="mt-4 bg-bgPrimary w-full flex-1 px-4 flex flex-col justify-between" style={{borderRadius: 50}}>
            <View>
              <View className="flex flex-col justify-center items-center mt-4">
                <Text className="font-bold text-2xl text-textPrimary">Natalija,</Text>
                <Text className="text-textMid font-bold text-lg">drago nam je što si tu!</Text>
              </View>

              <View className="mt-4 flex flex-row justify-center items-center">
                <Text className="text-textMid text-center" style={{fontSize: 17}}>
                  Dok je <Text className="font-bold text-textPrimary">tiki</Text> namenjen vašim klijentima za rezervaciju usluga, <Text className="font-bold text-textPrimary">tiki manager</Text> vam omogućava da lako upravljate svojim salonom, radnicima i rezervacijama.
                </Text>
              </View>
            </View>
        </View>
    </View>
  )
}

const SlideTwo = () => {
  return (
    <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center px-4" style={{borderRadius: 50}}>
      <View className="px-4 mt-10">
        <Text className="mt-4 text-center text-xl text-textPrimary font-bold">Kreirajte svoj salon i prilagodite radno vreme, usluge, i druge važne detalje.</Text>
        <Text className="mt-2 text-lg text-textMid text-center font-bold">Sve počinje ovde!</Text>
      </View>
    </View>
  )
}

const SlideThree = () => {
  return (
    <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center px-4" style={{borderRadius: 50}}>
      <View className="px-4 mt-10">
        <Text className="mt-4 text-center text-xl text-textPrimary font-bold">Svaki salon treba svoj tim.</Text>
        <Text className="mt-2 text-lg text-textMid text-center font-bold">Dodajte radnike, uključujući sebe, kako biste osigurali glatko poslovanje.</Text>
      </View>
    </View>
  )
}

const SlideFour = ({setIsModalVisible}) => {
  return (
    <View className="h-full w-full bg-bgPrimary flex flex-col justify-between items-center px-4" style={{borderRadius: 50}}>
      <View className="px-4 mt-4">
        <View className="flex flex-row justify-end items-center">
          <TouchableOpacity onPress={()=>setIsModalVisible(false)} className="-mr-4 -mt-1 p-1 bg-textPrimary rounded-full">
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="mt-4 text-center text-xl text-textPrimary font-bold">Svi radnici treba da imaju svoj nalog.</Text>
        <Text className="mt-2 text-lg text-textMid text-center font-bold">Pronađite idealan tim za vaš salon i upravljajte rezervacijama efikasno.</Text>
      </View>
    </View>
  )
}


const WelcomeModal = ({isModalVisible, setIsModalVisible}) => {
  return (
    <Modal 
        isVisible={isModalVisible}
        animationInTiming={400}
        animationOutTiming={400}
    >
        <View className="flex-1 flex flex-col justify-center items-center">
            <View className="h-4/6 w-full">
              <Swiper
                showsButtons={false}
                activeDotColor='#00505b'
                loop={false}
              >
                <SlideOne />
                <SlideTwo />
                <SlideThree />
                <SlideFour setIsModalVisible={setIsModalVisible} />
              </Swiper>
            </View>
        </View>
    </Modal>
  )
}

export default WelcomeModal