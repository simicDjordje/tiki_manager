import { ScrollView, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Text from '../Components/CustomComponents/CustomText'
import { TouchableOpacity } from 'react-native'
import Animated, { BounceIn, BounceInDown, BounceInRight, FadeInDown } from 'react-native-reanimated'
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
import AntDesign from '@expo/vector-icons/AntDesign';

const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const monthsObject = {
  0: 'Januar',
  1: 'Februar',
  2: 'Mart',
  3: 'April',
  4: 'Maj',
  5: 'Jun',
  6: 'Jul',
  7: 'Avgust',
  8: 'Septembar',
  9: 'Oktobar',
  10: 'Novembar',
  11: 'Decembar'
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const StatisticsScreen = () => {
  const {userData, userSalons} = useSelector(state => state.general)

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

          {userSalons.salonsInactive.length == 0 && !userData.haveWorkerAccount &&
            <View className="h-4/6 flex flex-col justify-center items-center">
              <Text className="text-center text-textPrimary text-lg" bold>
                Rezultati će biti dostupni po završetku usluge
              </Text>

              <Text className="text-center text-textPrimary mt-3 mb-3">
                Moći ćeš da pratiš prihode salona ili pojedinačne prihode članova salona
              </Text>

              <Animated.View entering={FadeInDown} className="mt-10">
                <AntDesign name="barschart" size={144} color="black" />
              </Animated.View>
            </View>
          }

        {userSalons.salonsInactive.length == 0 && userData.haveWorkerAccount &&
            <View className="h-4/6 flex flex-col justify-center items-center">
              <Text className="text-center text-textPrimary text-lg" bold>
                Rezultati će biti dostupni po završetku usluge
              </Text>

              <Text className="text-center text-textPrimary mt-3 mb-3">
                Moći ćeš da pratiš svoje prihode
              </Text>

              <Animated.View entering={FadeInDown} className="mt-10">
                <AntDesign name="barschart" size={144} color="black" />
              </Animated.View>
            </View>
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
  const [chartDataParent, setChartDataParent] = useState(null)
  const [typeOfError, setTypeOfError] = useState(null)

  useEffect(()=>{
    if(!selectedWorker || !statistics) return
    
    if(selectedWorker === 'all'){
      setChartDataParent(statistics?.all_workers)
      return
    }

    if(statistics[selectedWorker?._id]){
      setChartDataParent(statistics[selectedWorker?._id])
    }else{
      setChartDataParent(null)
    }
    
  }, [selectedWorker, statistics])

  useEffect(()=>{
   
    if(isGettingSalonData || customLoader){
      setCurrentState('loading')
      return
    }

    if(!isGettingSalonData && !customLoader && selectedSalon && selectedSalon.workers.length > 0 && salonData && statistics && !typeOfError){
      setCurrentState('show')
      return
    }

    if(typeOfError){
      setCurrentState(typeOfError)
    }
    
  }, [isGettingSalonData, customLoader, selectedSalon, salonData, statistics, typeOfError])
  
  useFocusEffect(useCallback(()=>{
    if(userSalons && userSalons.salonsInactive && userSalons.salonsInactive.length > 0){
      setSelectedSalon(userSalons.salonsInactive[0])
    }
  }, []))

  useEffect(()=>{
    (async () => {
      try{
        if(!selectedSalon) return
        setCustomLoader(true)

        getSalonById({salonId: selectedSalon?._id})

        const {error, data} = await getSalonStatistics({salonId: selectedSalon?._id})
        console.log(error)

        console.log(data)
        if(error){
          if(error.data && error.data.message == 'No data'){
            setTypeOfError('no_data')
          }else{
            setTypeOfError('error')
          }
          return
        }

        if(data && data.success){
          setTypeOfError(null)
          setStatistics(data.result)
        }

      }catch(error){
        console.log(error)
      }finally{
        setCustomLoader(false)
      }
    })()
    
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

      {currentState === 'no_data' && 
        <View className="h-3/6 flex flex-col justify-center items-center">
          <Text className="text-center text-textPrimary" bold>Salon nema dovoljno podataka...</Text>
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
              let workers = [...salonData.workers];
              const userWorkerIndex = workers.findIndex(worker => worker._id === userData?._id);
              
              if (userWorkerIndex !== -1) {
                const userWorker = workers.splice(userWorkerIndex, 1)[0];
                
                workers.splice(0, 0, userWorker); // Place at index 1
              }

              // Get the first 6 workers or all workers if less than 6
              const workersForImages = workers.slice(0, 6);
              
              if(workers.length > 1){
                workers = ['0_index_to_create_all_btn', ...workers]
              }

              return workers.map((worker, index) => {
                const lastItem = index === salonData.workers.length;

                // Special case for index 0 - display small images of the first 6 workers
                if (index === 0 && workers.length > 1) {
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

            {currentState === 'show' && chartDataParent &&
              <BarChartWrapperOne 
                data={chartDataParent}
                setCurrentState={setCurrentState}
              />
            }

    </View>
  )
}

// const data = [
//   {value: 15, }, 
//   {value: 150, }, 
//   {value: 39, }, 
//   {value: 111, }, 
//   {value: 89, }, 
//   {value: 66, }, 
//   {value: 69, }, 
//   {value: 158, }, 
//   {value: 10, }, 
//   {value: 8, }, 
//   {value: 49, }, 
//   {value: 77, }];

const BarChartWrapperOne = ({data, setCurrentState}) => {
  const [availableYears, setAvailableYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [type, setType] = useState('income')
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [topTitle, setTopTitle] = useState('')
  const [showChart, setShowChart] = useState(true)

  useEffect(()=>{
    if(!chartData || !selectedMonth || !chartData[selectedMonth]) return

    const monthlyData = chartData[selectedMonth]

    setTopTitle(monthlyData.valueToShow)
  }, [chartData, selectedMonth])


  useEffect(() => {
    if (!data || !selectedYear) return;
    
    const inputData = type === 'income' ? data[selectedYear]?.earnings : data[selectedYear]?.services_provided
    const totalItems = 12; // Array with 12 items
    let maxValueCount = 0;
  
  
    // Create an array of 12 items with default value 0 and proper colors
    const result = Array.from({ length: totalItems }, (_, index) => {
      const value = inputData[index] || 0;
  
      // Set front color based on condition
      let frontColor = value ? '#babbb6' : '#986868';
      if (selectedMonth === index) frontColor = '#232323';
  
      // Update maxValueCount
      if (value > maxValueCount) {
        maxValueCount = value;
      }
  
      return {
        value: value,
        frontColor: frontColor,
        valueToShow: type === 'income' ? `${formatNumber(value) || '0.00'} RSD` : `${value} usluga`,
      };
    });
    
    // Pre-calculate max value part once
    console.log('MAX: ', maxValueCount)
    const maxValuePart = maxValueCount / 8;

    // Update values if they're less than `maxValuePart`
    const updatedChartData = result.map((item) => {
      const updatedItem = { ...item };
  
      if (!item.value) {
        updatedItem.value = maxValuePart; // For zero-value bars
      } else if (item.value < maxValuePart) {
        updatedItem.value += maxValuePart; // Add min size for small values
      }
  
      return updatedItem;
    });
  
    // Update state
    setMaxValue(maxValueCount);
    setChartData(updatedChartData);
    
  }, [data, selectedMonth, type]);

  useEffect(()=>{
    if(!selectedYear) return
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    if(year == selectedYear){
      setSelectedMonth(month)
    }else{
      setSelectedMonth(0)
    }
  }, [selectedYear])

  useEffect(()=>{
    if(!data) return

    const yearsArray = Object.keys(data).sort((a, b) => b - a)
    setAvailableYears([...yearsArray])
    
    if(yearsArray.length){
      setSelectedYear(yearsArray[0])
    }else{
      setCurrentState('error')
    }

  }, [data])

  // const handleScrollRef = () => {
    
  //   if(chartRef.current !== null){
  //       chartRef.current.scrollToEnd()
  //   }
  // }
  if(!data) return (
    <Text>Kurac</Text>
  )

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
                      <Text className={`${customClassText}`} semi>{y}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
        </Animated.View>

        <View className="flex flex-row justify-between items-center">
          <Animated.View entering={FadeInDown} className="rounded-2xl bg-bgSecondary flex flex-row justify-between mt-4 h-14 px-3">
            <TouchableOpacity onPress={() => setType('income')} className="flex flex-row justify-between items-center">
              <FontAwesome6 name="money-bills"  size={16} color={type === 'services_provided' ? '#babbb6' : 'black'} />
              <Text className={`${type === 'services_provided' ? 'text-textSecondary' : 'text-textPrimary'} ml-1`} semi>Ukupan prihod</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown} className="rounded-2xl bg-bgSecondary flex flex-row justify-between mt-4 h-14 px-3">
            <TouchableOpacity onPress={() => setType('services_provided')} className="flex flex-row justify-between items-center">
              <MaterialCommunityIcons name="account-group" size={24} color={type === 'income' ? '#babbb6' : 'black'} />
              <Text className={`${type === 'income' ? 'text-textSecondary' : 'text-textPrimary'} ml-1`} semi>Broj pruženih usluga</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* <Animated.View entering={FadeInDown} className="rounded-2xl bg-bgSecondary flex flex-row justify-between mt-4 h-14 px-3">
            <TouchableOpacity onPress={handleScrollRef} className="flex flex-row justify-between items-center">
              <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
            </TouchableOpacity>
          </Animated.View> */}
        </View>
        

        {/* <View className="w-full bg-textSecondary mt-4" style={{height: 0.5}}></View> */}


        <View className="w-full flex flex-col justify-between h-72 mt-5 bg-bgSecondary rounded-2xl">
          <View className="w-full rounded-2xl px-3 py-2 flex flex-row justify-between">
             <View>
              <Text className="text-textMid" semi>{monthsObject[selectedMonth]}</Text>
              <Text className="text-textPrimary text-lg" bold>{topTitle}</Text>
             </View>

             <Text className="text-textMid" semi>2024</Text>
          </View>
          {showChart && 
            <BarChartComponent 
              chartData={chartData}
              setSelectedMonth={setSelectedMonth}
              maxValue={maxValue}
              ref={chartRef}
            />
          }
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