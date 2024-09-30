import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from '../Components/CustomComponents/CustomText'
import LootieLoader from '../Components/LootieAnimations/Loader'
import { useAcceptReservationMutation, useGetMyReservationsMutation, useRejectReservationMutation } from '../redux/apiCore'
import { useFocusEffect } from '@react-navigation/native'
import Animated, { BounceIn, BounceInRight, FadeIn, FadeInDown } from 'react-native-reanimated'
import ReservationCardThree from '../Components/ReservationsCard/ReservationCardThree'

const monthObject = {
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
  11: 'Decembar',
}

const ReservationsScreen = ({navigation}) => {
  const [selectedSection, setSelectedSection] = useState('accepted')
  const [selectedDate, setSelectedDate] = useState(null)
  const [availableDatesAccepted, setAvailableDatesAccepted] = useState([])
  const [availableDatesPending, setAvailableDatesPending] = useState([])
  

  const [getMyReservations, {isLoading: isGetingMyReservations}] = useGetMyReservationsMutation()
  
  const [error, setError] = useState(false)
  const [acceptedReservations, setAcceptedReservations] = useState(null)
  const [pendingReservations, setPendingReservations] = useState(null)
  const [customLoading, setCustomLoading] = useState(false)
  const [plainPendingReservations, setPlainPendingReservations] = useState(0)

  const [showReservationsScroll, setShowReservationsScroll] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Actions to perform when the screen is exited (blurred)
      setAvailableDatesAccepted([]);
      setAvailableDatesPending([]);
      setAcceptedReservations(null);
      setPendingReservations(null);
    })

    // Cleanup function to unsubscribe when the component unmounts
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(useCallback(()=>{
    setAvailableDatesAccepted([])
    setAvailableDatesPending([])
    setAcceptedReservations(null)
    setPendingReservations(null)

    handleFetchReservations()
  }, []))

  const handleChangeSection = (section) => {
    setSelectedDate(null)
    setSelectedSection(section)
  }

  useEffect(()=>{
    setShowReservationsScroll(false)

    setTimeout(()=>{setShowReservationsScroll(true)}, 500)
  }, [selectedDate])

  useEffect(()=>{
    if(selectedSection === 'accepted'){
      try{
        setSelectedDate(availableDatesAccepted[0])
      }catch{}
    }

    if(selectedSection === 'pending'){
      try{
        setSelectedDate(availableDatesPending[0])
      }catch{}
    }
  }, [selectedSection, availableDatesAccepted, availableDatesPending])

  const handleFetchReservations = async () => {
    setCustomLoading(true)
    try{
      const {error, data} = await getMyReservations()

      if(error){
        setError(true)          
        return
      }

      if(data && data.success){
        setError(false)

        const categorizedReservationsObject = {
          accepted: {},
          pending: {}
        }

        const acceptedReservationsArray = [...data?.result?.accepted]
        const pendingReservationsArray = [...data?.result?.pending]

        setPlainPendingReservations(pendingReservationsArray.length)

        if(acceptedReservationsArray.length > 0){
          // Categorize accepted reservations by date
          acceptedReservationsArray.forEach(r => {
            if (!categorizedReservationsObject.accepted[r.date]) {
              categorizedReservationsObject.accepted[r.date] = [];
            }
            categorizedReservationsObject.accepted[r.date].push(r);
          });

          setAcceptedReservations(categorizedReservationsObject.accepted)

          // Extract and sort dates
          const acceptedDates = Object.keys(categorizedReservationsObject.accepted)
          .sort((a, b) => {
            // Convert strings 'DD-MM-YYYY' to real dates and compare them
            return new Date(a.split('-').reverse().join('-')) - new Date(b.split('-').reverse().join('-'));
          });

          setAvailableDatesAccepted(acceptedDates)
        }

        if(pendingReservationsArray.length > 0){
            // Categorize pending reservations by date
          pendingReservationsArray.forEach(r => {
            if (!categorizedReservationsObject.pending[r.date]) {
              categorizedReservationsObject.pending[r.date] = [];
            }
            categorizedReservationsObject.pending[r.date].push(r);
          });
          
          setPendingReservations(categorizedReservationsObject.pending)

          const pendingDates = Object.keys(categorizedReservationsObject.pending)
          .sort((a, b) => {
            // Convert strings 'DD-MM-YYYY' to real dates and compare them
            return new Date(a.split('-').reverse().join('-')) - new Date(b.split('-').reverse().join('-'));
          });
          
          setAvailableDatesPending(pendingDates)
        }

        }

    }catch(error){
      console.log(error)
    }finally{
      setCustomLoading(false)
    }
  }
  

  return (
    <SafeAreaView className="bg-bgPrimary h-full">
      <ScrollView>
      <View className="min-h-screen px-4 mb-28">
        <Text className="text-textPrimary text-3xl mt-8" bold>
          Rezervacije
        </Text>

      <View className="flex flex-row justify-start items-center mt-14">
        <TouchableOpacity onPress={() => handleChangeSection('accepted')} className={`${selectedSection === 'accepted' ? 'bg-textPrimary' : 'bg-bgSecondary'} rounded-xl h-16 w-32 flex flex-row justify-center items-center mr-2`}>
          <Text className={`${selectedSection === 'accepted' ? 'text-bgSecondary' : 'text-textPrimary'}`} bold>Aktivne</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleChangeSection('pending')} className={`${selectedSection === 'pending' ? 'bg-textPrimary' : 'bg-bgSecondary'} rounded-xl h-16 w-32 flex flex-row justify-center items-center relative`}>
          {plainPendingReservations != 0 && 
          <Animated.View entering={BounceIn} className="w-7 h-7 absolute rounded-full bg-textSecondary -top-2 -right-1 flex flex-row justify-center items-center">
            <Text className="text-textPrimary" bold>{plainPendingReservations}</Text>
          </Animated.View>}
          <Text className={`${selectedSection === 'pending' ? 'text-bgSecondary' : 'text-textPrimary'}`} bold>Na čekanju</Text>
        </TouchableOpacity>
      </View>
      {error && 
        <View className="h-2/6 flex flex-col justify-center items-center">
          <Text className="text-red-700">
            Došlo je do greške, pokušaj kasnije
          </Text>
        </View>
      }

      {(isGetingMyReservations || customLoading) &&
        <View className="h-4/6 flex flex-col justify-center items-center">
          <LootieLoader dark={true} d={70} />
        </View>
      }

      {!isGetingMyReservations && !customLoading && selectedSection === 'accepted' && availableDatesAccepted.length === 0 &&
        <Animated.View entering={FadeIn.delay(500)} className="h-2/6 flex flex-col justify-center items-center">
          <Text className="text-lg text-textPrimary" bold>
            {selectedSection === 'accepted' && 'Trenutno nema aktivnih rezervacija'}
          </Text>
        </Animated.View>
      }

      {!isGetingMyReservations && !customLoading && selectedSection === 'pending' && availableDatesPending.length === 0 &&
        <Animated.View entering={FadeIn.delay(500)} className="h-2/6 flex flex-col justify-center items-center">
          <Text className="text-lg text-textPrimary" bold>
            {selectedSection === 'pending' && 'Trenutno nema rezervacija na čekanju'}
          </Text>
        </Animated.View>
      }

      {selectedSection === 'accepted' && availableDatesAccepted.length > 0 &&
      <Animated.View className="h-24" entering={FadeInDown}>
            <Text className="mt-8 text-textPrimary" bold>Datumi sa rezervacija</Text>
            <View className="bg-textSecondary w-full mx-auto mt-2" style={{height: 1}}></View>            
            
            <Text className="mt-2 text-textMid text-xs">Izaberi željeni datum</Text>
        </Animated.View>
      }

      {selectedSection === 'accepted' && acceptedReservations && availableDatesAccepted.length > 0 &&
        <Animated.View entering={BounceInRight} className="-mr-4">
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
          >   
              {availableDatesAccepted.map((date, index) => {
                  const lastItem = (index + 1) === availableDatesAccepted.length
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

      {selectedSection === 'pending' && availableDatesPending.length > 0 &&
      <Animated.View className="h-24" entering={FadeInDown}>
            <Text className="mt-8 text-textPrimary" bold>Datumi sa zahtevima</Text>
            <View className="bg-textSecondary w-full mx-auto mt-2" style={{height: 1}}></View>            
            
            <Text className="mt-2 text-textMid text-xs">Izaberi željeni datum</Text>
        </Animated.View>
      }

      {selectedSection === 'pending' && availableDatesPending.length > 0 && 
        <Animated.View entering={BounceInRight} className="-mr-4">
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
          >   
              {availableDatesPending.map((date, index) => {
                  const lastItem = (index + 1) === availableDatesPending.length
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
                          className={`${isSelected ? 'bg-textPrimary' : 'bg-bgSecondary'} ${lastItem ? 'mr-2' : 'mr-2'} ${index === 0 && ''} rounded-xl h-16 px-2 ${(dateText === 'Danas' || dateText === 'Sutra') && 'w-28'} flex flex-col justify-center items-center relative`}
                      >
                        {selectedDate && 
                          <Animated.View entering={BounceIn} className="w-5 h-5 absolute rounded-full bg-textSecondary top-0.5 right-0.5 flex flex-row justify-center items-center">
                            <Text className="text-textPrimary text-xs" bold>{pendingReservations[date].length}</Text>
                          </Animated.View>
                        }
                        <Text className={`${isSelected ? 'text-bgSecondary' : 'text-textPrimary'}`} bold>{dateText}</Text>
                      </TouchableOpacity>
                  )
              })}
          </ScrollView>
      </Animated.View>
      }
        
        { showReservationsScroll
        && selectedDate 
        && acceptedReservations 
        && acceptedReservations[selectedDate] 
        && selectedSection === 'accepted' 
        && acceptedReservations[selectedDate].map((reservation, index) => {
            return (
              <ReservationCardThree 
                key={reservation?._id || index} 
                reservationDetails={reservation}
                setPendingReservations={setPendingReservations}
                setAcceptedReservations={setAcceptedReservations}
                setPlainPendingReservations={setPlainPendingReservations}
                setAvailableDatesAccepted={setAvailableDatesAccepted}
                setAvailableDatesPending={setAvailableDatesPending}
                selectedDate={selectedDate}
                availableDatesAccepted={availableDatesAccepted}
              />
            )
          })

          }

    {showReservationsScroll
    && selectedDate 
    && pendingReservations 
    && pendingReservations[selectedDate] 
    && selectedSection === 'pending' 
    && pendingReservations[selectedDate].map((reservation, index) => {
        return (
          <ReservationCardThree 
            key={reservation?._id || index} 
            reservationDetails={reservation}
            setPendingReservations={setPendingReservations}
            setAcceptedReservations={setAcceptedReservations}
            setPlainPendingReservations={setPlainPendingReservations}
            setAvailableDatesAccepted={setAvailableDatesAccepted}
            setAvailableDatesPending={setAvailableDatesPending}
            selectedDate={selectedDate}
            availableDatesAccepted={availableDatesAccepted}
          />
        )
      })

      }

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReservationsScreen