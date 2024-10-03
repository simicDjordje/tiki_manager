import { ScrollView, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Text from '../Components/CustomComponents/CustomText'
import { TouchableOpacity } from 'react-native'
import Animated, { BounceIn, BounceInRight, FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import LootieLoader from '../Components/LootieAnimations/Loader'
import { useGetSalonByIdMutation, useGetSalonStatisticsMutation } from '../redux/apiCore'
import { useFocusEffect } from '@react-navigation/native'
import { Image } from 'expo-image'
import BarChartComponent from '../Components/Charts/BarChart'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


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
  const {userData, userSalons, currentSalon: salonData} = useSelector(state => state.general)
  const [selectedSalon, setSelectedSalon] = useState(null)
  const [getSalonById, {isLoading: isGettingSalonData}] = useGetSalonByIdMutation()
  const [customLoader, setCustomLoader] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [getSalonStatistics, {isLoading: isGetingSalonStatistics}] = useGetSalonStatisticsMutation()
  const [statistics, setStatistics] = useState(null)
  const [currentState, setCurrentState] = useState(null)

  useEffect(()=>{
    if(isGettingSalonData || customLoader){
      setCurrentState('loading')
      return
    }

    if(!isGettingSalonData && !customLoader && selectedSalon && selectedSalon.workers.length > 0 && salonData && statistics){
      setCurrentState('show')
      return
    }

  }, [isGettingSalonData, customLoader, selectedSalon, salonData, statistics])


  useFocusEffect(useCallback(()=>{
    if(userSalons && userSalons.salonsInactive && userSalons.salonsInactive.length > 0){
      setSelectedSalon(userSalons.salonsInactive[1])
    }
  }, []))

  useEffect(()=>{
    (async () => {
      try{
        if(!selectedSalon) return
        setCustomLoader(true)

        getSalonById({salonId: selectedSalon?._id})

        const {error, data} = await getSalonStatistics({salonId: selectedSalon?._id})
        
        if(error){
          setCurrentState('error')
          return
        }

        if(data && data.success){
          setStatistics(data.result)
        }

      }catch(error){
        console.log(error)
      }finally{
        setCustomLoader(false)
      }
    })()
    
    // setTimeout(()=>{setCustomLoader(false)}, 1000)
  }, [selectedSalon])

  useEffect(()=>{
    if(!salonData) return

    if(salonData.workers.length > 1){
      setSelectedWorker('all')
    }else{
      setSelectedWorker(salonData.workers[0])
    }
  }, [salonData])

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

      {currentState === 'loading' && 
        <View className="h-4/6 flex flex-col justify-center items-center">
          <LootieLoader dark={true} d={70} />
        </View>
      }

      {currentState === 'error' && 
        <View className="h-4/6 flex flex-col justify-center items-center">
          <Text className="text-center text-red-700" bold>Došlo je do greške</Text>
        </View>
      }


    {currentState === 'show' &&
      <Animated.View className="h-24" entering={FadeInDown}>
            <Text className="mt-8 text-textPrimary" bold>Statistika salona</Text>
            <View className="bg-textSecondary w-full mx-auto mt-2" style={{height: 1}}></View>            
            
            <Text className="mt-2 text-textMid text-xs">Možeš pogledati i svakog člana zasebno</Text>
        </Animated.View>
      }


      {currentState === 'show' &&
        <Animated.View entering={BounceInRight} className="-mr-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
          >   
            {(() => {
              // Move the worker with userData?._id to index 1
              const workers = [...salonData.workers];
              const userWorkerIndex = workers.findIndex(worker => worker._id === userData?._id);
              
              if (userWorkerIndex !== -1) {
                const userWorker = workers.splice(userWorkerIndex, 1)[0];
                
                workers.splice(0, 0, userWorker); // Place at index 1
              }

              // Get the first 6 workers or all workers if less than 6
              const workersForImages = workers.slice(0, 6);

              return ['0_index_to_create_all_btn', ...workers].map((worker, index) => {
                const lastItem = index === salonData.workers.length;

                // Special case for index 0 - display small images of the first 6 workers
                if (index === 0 && salonData.workers.length > 1) {
                  const isSelected = selectedWorker === 'all'

                  return (
                    <TouchableOpacity 
                      onPress={() => setSelectedWorker('all')}
                      key={index}
                      className={`${isSelected ? 'bg-textPrimary' : 'bg-bgSecondary'} ${lastItem ? 'mr-16' : 'mr-2'} ml-5 rounded-xl h-32 w-32 flex flex-col justify-end items-center`}
                    >
                      <View className="flex-1 w-full mt-2 relative">
                        {workersForImages.map((workerForImage, idx) => {

                          let customClassName = ''

                          if(idx === 0) customClassName = 'w-8 h-8 rounded-full absolute top-2 left-1'
                          if(idx === 1) customClassName = 'w-8 h-8 rounded-full absolute bottom-2 right-3'
                          if(idx === 2) customClassName = 'w-5 h-5 rounded-full absolute top-4 right-7'
                          if(idx === 3) customClassName = 'w-6 h-6 rounded-full absolute bottom-3 left-7'
                          if(idx === 4) customClassName = 'w-6 h-6 rounded-full absolute bottom-9 left-12'
                          if(idx === 5) customClassName = 'w-7 h-7 rounded-full absolute -top-0 right-12'

                          return (
                            <Image
                              key={workerForImage._id || idx}
                              source={`http://192.168.1.14:5000/photos/profile-photo${workerForImage?._id}.png`}
                              contentFit='cover'
                              placeholder={{ blurhash }}
                              className={customClassName}
                            />
                          )
                        })}
                      </View>

                      <Text className={`${isSelected ? 'text-bgSecondary' : 'text-textPrimary'} mb-4`} bold>Svi</Text>
                    </TouchableOpacity>
                  );
                }

                const isSelected = worker?._id == selectedWorker?._id;
                // const notAvailable = !statistics.hasOwnProperty(worker?._id)

                
                return (
                  <TouchableOpacity 
                    onPress={() => setSelectedWorker(worker)}
                    key={worker?._id || index}
                    className={`${isSelected ? 'bg-textPrimary' : 'bg-bgSecondary'} ${lastItem ? 'mr-16' : 'mr-2'} ${index === 0 && 'ml-5'} rounded-xl h-32 w-32 flex flex-col justify-between`}
                  >
                    <View className="flex flex-row justify-center items-center mt-5">
                      <Image
                        source={`http://192.168.1.14:5000/photos/profile-photo${worker?._id}.png`}
                        contentFit='cover'
                        placeholder={{ blurhash }}
                        className="w-16 h-16 rounded-full"
                      />
                    </View>
                    <View className="flex flex-row justify-center items-center mb-4">
                      <Text className={`${isSelected ? 'text-bgSecondary' : 'text-textPrimary'}`} bold>{worker?.first_name}{worker?._id === userData?._id && ' (Ti)'}</Text>
                    </View>
                  </TouchableOpacity>
                );
              });
            })()}
          </ScrollView>
        </Animated.View>
      }

            {currentState === 'show' && 
              <BarChartWrapperOne 
                data={statistics?.all_workers}
                setCurrentState={setCurrentState}
              />
            }

    </View>
  )
}


const BarChartWrapperOne = ({data, setCurrentState}) => {
  const [availableYears, setAvailableYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [type, setType] = useState('income')
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState([])

  useEffect(()=>{
    if(!data) return

    const yearsArray = Object.keys(data).sort((a, b) => b - a)
    setAvailableYears([...yearsArray, '2023', '2022', '2021', '2020', '2019', '2018', '2017'])
    
    if(yearsArray.length){
      setSelectedYear(yearsArray[0])
    }else{
      setCurrentState('error')
    }

  }, [data])

  const handleScrollRef = () => {
    
    if(chartRef.current !== null){
        chartRef.current.scrollToEnd()
    }
  }

  return (
    <View className="w-full mt-4">
        <Animated.View entering={FadeInDown} className="w-full rounded-2xl bg-bgSecondary -mr-10">
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className=""
            >
              {availableYears && availableYears.map(y => {
                const isSelected = y == selectedYear
                let onPressCustom = () => setSelectedYear(y)
                let customClassBG = ''
                let customClassText = isSelected ? 'text-textPrimary' : 'text-textSecondary'

                return (
                  <TouchableOpacity 
                    key={y}
                    onPress={onPressCustom} className={`${customClassBG} rounded-xl h-14 ml-2 flex flex-row justify-center items-center mr-2`}>
                      <Text className={`${customClassText}`} bold>{y}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
        </Animated.View>

        <View className="flex flex-row justify-between items-center">
          <Animated.View entering={FadeInDown} className="rounded-2xl bg-bgSecondary flex flex-row justify-between mt-4 h-14 px-3">
            <TouchableOpacity onPress={() => setType('income')} className="flex flex-row justify-between items-center">
              <FontAwesome6 name="money-bills"  size={16} color={type === 'services_provided' ? '#babbb6' : 'black'} />
              <Text className={`${type === 'services_provided' ? 'text-textSecondary' : 'text-textPrimary'} ml-1`} bold>Prihod</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown} className="rounded-2xl bg-bgSecondary flex flex-row justify-between mt-4 h-14 px-3">
            <TouchableOpacity onPress={() => setType('services_provided')} className="flex flex-row justify-between items-center">
              <MaterialCommunityIcons name="account-group" size={24} color={type === 'income' ? '#babbb6' : 'black'} />
              <Text className={`${type === 'income' ? 'text-textSecondary' : 'text-textPrimary'} ml-1`} bold>Broj pruženih usluga</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown} className="rounded-2xl bg-bgSecondary flex flex-row justify-between mt-4 h-14 px-3">
            <TouchableOpacity onPress={handleScrollRef} className="flex flex-row justify-between items-center">
              <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View className="w-full h-60 mt-5">
          <BarChartComponent 
            chartData={chartData}
            ref={chartRef}
          />
        </View>
    </View>
  )
}


// const result = {
//   //top 3
//   workers_rating: {
//     2023: {
//       earnings: [worker, worker, worker],
//       services_provided: [worker, worker, worker]
//     },
//     2024: {
//       earnings: [worker, worker, worker],
//       services_provided: [worker, worker, worker]
//     }
//   },
//   //all workers combined
//   all_workers: {
//     2023: {
//       earnings: {
//         0: 1000,
//         1: 2000,
//         2: 4333,
//         3: 45000,
//         4: 900,
//         5: 37000,
//         6: 9800,
//         7: 1000,
//         8: 2000,
//         9: 4333,
//         10: 45000,
//         11: 900,
//       },
//       services_provided: {
//         0: 10,
//         1: 20,
//         2: 43,
//         3: 450,
//         4: 9,
//         5: 370,
//         6: 98,
//         7: 10,
//         8: 20,
//         9: 43,
//         10: 450,
//         11: 9,
//       }
//     },
//     2024: {
//       earnings: {
//         0: 1000,
//         1: 2000,
//         2: 4333,
//         3: 45000,
//         4: 900,
//         5: 37000,
//         6: 9800,
//         7: 1000,
//         8: 2000,
//         9: 4333,
//         10: 45000,
//         11: 900,
//       },
//       services_provided: {
//         0: 10,
//         1: 20,
//         2: 43,
//         3: 450,
//         4: 9,
//         5: 370,
//         6: 98,
//         7: 10,
//         8: 20,
//         9: 43,
//         10: 450,
//         11: 9,
//       }
//     }
//   },
//   //single worker
//   [worker._id]: {
//     2023: {
//       earnings: {
//         0: 1000,
//         1: 2000,
//         2: 4333,
//         3: 45000,
//         4: 900,
//         5: 37000,
//         6: 9800,
//         7: 1000,
//         8: 2000,
//         9: 4333,
//         10: 45000,
//         11: 900,
//       },
//       services_provided: {
//         0: 10,
//         1: 20,
//         2: 43,
//         3: 450,
//         4: 9,
//         5: 370,
//         6: 98,
//         7: 10,
//         8: 20,
//         9: 43,
//         10: 450,
//         11: 9,
//       }
//     },
//     2024: {
//       earnings: {
//         0: 1000,
//         1: 2000,
//         2: 4333,
//         3: 45000,
//         4: 900,
//         5: 37000,
//         6: 9800,
//         7: 1000,
//         8: 2000,
//         9: 4333,
//         10: 45000,
//         11: 900,
//       },
//       services_provided: {
//         0: 10,
//         1: 20,
//         2: 43,
//         3: 450,
//         4: 9,
//         5: 370,
//         6: 98,
//         7: 10,
//         8: 20,
//         9: 43,
//         10: 450,
//         11: 9,
//       }
//     }
//   }
// }