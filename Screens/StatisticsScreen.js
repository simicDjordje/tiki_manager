import { ScrollView, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Text from '../Components/CustomComponents/CustomText'
import { TouchableOpacity } from 'react-native'
import Animated, { BounceIn, FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import LootieLoader from '../Components/LootieAnimations/Loader'
import { useGetSalonByIdMutation } from '../redux/apiCore'
import { useFocusEffect } from '@react-navigation/native'

const StatisticsScreen = () => {
  const {userSalons} = useSelector(state => state.general)

  return (
    <SafeAreaView className="bg-bgPrimary h-full">
      <ScrollView>
        <View className="min-h-screen px-4 mb-28">
          <Text className="text-textPrimary text-3xl mt-8" bold>
            Rezultati
          </Text>

          {userSalons.salonsInactive.length > 0 && 
            <SalonOwnerStatistics />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default StatisticsScreen




const SalonOwnerStatistics = () => {
  const {userSalons, currentSalon: salonData} = useSelector(state => state.general)
  const [selectedSalon, setSelectedSalon] = useState(null)
  const [getSalonById, {isLoading: isGettingSalonData}] = useGetSalonByIdMutation()
  const [customLoader, setCustomLoader] = useState(false)

  useFocusEffect(useCallback(()=>{
    if(userSalons && userSalons.salonsInactive && userSalons.salonsInactive.length > 0){
      setSelectedSalon(userSalons.salonsInactive[0])
    }
  }, []))

  useEffect(()=>{
    if(!selectedSalon) return
    setCustomLoader(true)

    getSalonById({salonId: salonData?._id})

    setTimeout(()=>{setCustomLoader(false)}, 1000)
  }, [selectedSalon])

  return (
    <View>
      <View className="flex flex-row justify-start items-center mt-14">
        {userSalons &&  userSalons.salonsInactive && userSalons.salonsInactive.map((salon, index) => {
          const isSelected = selectedSalon && selectedSalon?._id == salon?._id
          let onPressCustom = () => setSelectedSalon(salon)
          let customClassBG = isSelected ? 'bg-textPrimary' : 'bg-bgSecondary'
          let customClassText = isSelected ? 'text-bgSecondary' : 'text-textPrimary'

          if(isGettingSalonData || customLoader){
            onPressCustom = () => {}
            customClassBG = isSelected ? 'bg-textSecondary' : 'bg-bgSecondary'
            customClassText = isSelected ? 'text-bgSecondary' : 'text-textSecondary'
          }


          return (
            <TouchableOpacity 
              key={salon?._id || index}
              onPress={onPressCustom} className={`${customClassBG} rounded-xl h-16 w-32 flex flex-row justify-center items-center mr-2`}>
                <Text className={`${customClassText}`} bold>{salon.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {(isGettingSalonData || customLoader) && 
        <View className="h-4/6 flex flex-col justify-center items-center">
          <LootieLoader dark={true} d={70} />
        </View>
      }


    {!isGettingSalonData && !customLoader && selectedSalon && selectedSalon.workers.length > 0 &&
      <Animated.View className="h-24" entering={FadeInDown}>
            <Text className="mt-8 text-textPrimary" bold>Statistika salona</Text>
            <View className="bg-textSecondary w-full mx-auto mt-2" style={{height: 1}}></View>            
            
            <Text className="mt-2 text-textMid text-xs">Možeš pogledati člana zasebno</Text>
        </Animated.View>
      }


      {!isGettingSalonData && !customLoader && selectedSalon && selectedSalon.workers.length > 0 &&
        <Animated.View entering={BounceInRight} className="-mr-4">
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
          >   
              {selectedSalon.workers.map((worker, index) => {
                  const lastItem = (index + 1) === selectedSalon.workers.length
                  const isSelected = date === selectedDate
                  const today = new Date()

                  const dateSplited = date.split('-')

                  let dateText = ''

                  const day = today.getDate();
                  const month = today.getMonth() //+ 1; // Add 1 since getMonth() returns 0-based month (January = 0)
                  const year = today.getFullYear();


                  // Check if the date is today
                  if (day == dateSplited[0] && month == dateSplited[1] && year == dateSplited[2]) {
                      dateText = 'Danas';
                  }
                  // Check if the date is tomorrow, considering month transition
                  else if (
                      day + 1 == dateSplited[0] && 
                      ((month == dateSplited[1] && year == dateSplited[2]) || 
                      (day == new Date(year, month, 0).getDate() && month + 1 == dateSplited[1] && year == dateSplited[2]))
                  ) {
                      dateText = 'Sutra';
                  }
                  // Check if the date is within the current month
                  else if (month == dateSplited[1] && year == dateSplited[2]) {
                      dateText = `${dateSplited[0]}. ${monthObject[dateSplited[1]]}`
                  }
                  // For other dates, format as DD.MM
                  else {
                      dateText = `${dateSplited[0]}. ${monthObject[dateSplited[1]]}`;
                  }

                  return (
                      <TouchableOpacity 
                          onPress={() => setSelectedDate(date)}
                          key={date || index}
                          className={`${isSelected ? 'bg-textPrimary' : 'bg-bgSecondary'} ${lastItem ? 'mr-2' : 'mr-2'} ${index === 0 && ''} rounded-xl h-16 px-2 ${(dateText === 'Danas' || dateText === 'Sutra') && 'w-28'} flex flex-col justify-center items-center`}
                      >
                        <Text className={`${isSelected ? 'text-bgSecondary' : 'text-textPrimary'}`} bold>{dateText}</Text>
                      </TouchableOpacity>
                  )
              })}
          </ScrollView>
      </Animated.View>
      }
    </View>
  )
}