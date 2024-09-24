import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Text from '../Components/CustomComponents/CustomText'
import CalendarPicker from 'react-native-calendar-picker'
import { timeSlotsConstants } from '../constants'
import CustomButton from '../Components/CustomComponents/CustomButton'
import { useFocusEffect } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useCheckReservationMutation, useGetMyUserDataMutation, useRejectReservationMutation, useUpdateUserMutation } from '../redux/apiCore'
import Animated, { BounceInRight, FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ReservationExistsModal from '../Components/ReservationExistsModal'

// new Date(2024, 7, 23),

const monthsArray = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
const weekdaysArray = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"]

const WorkerScreen = ({navigation}) => {
    const {userData} = useSelector(state => state.general)
    const [today, setToday] = useState()
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [markedDates, setMarkedDates] = useState([])
    const [timeSlots, setTimeSlots] = useState([...timeSlotsConstants])
    const [selectedTimeSlots, setSelectedTimeSlots] = useState({})
    const [isTodaySelected, setIsTodaySelected] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [refreshTimeSlots, setRefreshTimeSlots] = useState(false)
    const [existingReservation, setExistingReservation] = useState(null)
    const [isReservationExistsModalVisible, setIsReservationExistsModalVisible] = useState(false)
    const [reservationRejected, setReservationRejected] = useState(false)
    const [rejectionError, setRejectionError] = useState(false)
    const [customRejectionLoading, setCustomRejectionLoading] = useState(false)

    //api
    const [updateUser, {isLoading: isUpdateUserLoading}] = useUpdateUserMutation()
    const [getMyUserData] = useGetMyUserDataMutation()
    const [checkReservation, {isLoading: isCheckReservationLoading}] = useCheckReservationMutation()
    const [rejectReservation, {isLoading: isRejectingReservation}] = useRejectReservationMutation()

    const handleConfirm = async () => {
        setCustomRejectionLoading(true)

        try{
            const isRejected = await handleRejectReservation()

            if(!isRejected) return 
            const markedDateIndex = markedDates.findIndex(date => {
                return date.getDate() === selectedStartDate.getDate() && 
                date.getMonth() === selectedStartDate.getMonth() && 
                date.getFullYear() === selectedStartDate.getFullYear()
            })

            const reservationDate = existingReservation?.date
            const reservationTime = existingReservation?.time

            const foundArray = selectedTimeSlots[reservationDate] ? [...selectedTimeSlots[reservationDate]] : null
            const timeSlotIndex = foundArray.findIndex(slot => slot.label === reservationTime)
            if (timeSlotIndex > -1) {
                foundArray.splice(timeSlotIndex, 1)
                if(foundArray.length === 0){
                    if(markedDateIndex > -1){
                        const updatedMarkedDates = [...markedDates]
                        updatedMarkedDates.splice(markedDateIndex, 1)

                        setMarkedDates(updatedMarkedDates)
                    }
                }

                setSelectedTimeSlots({
                    ...selectedTimeSlots,
                    [reservationDate]: foundArray
                })
                setTimeout(()=>{
                    setIsReservationExistsModalVisible(false)
                }, 1200)
            }

        }catch(error){
            console.log(error)
        }finally{
            setCustomRejectionLoading(false)
        }
    }

    const handleRejectReservation = async () => {
        try{
    
            const {error, data} = await rejectReservation({
                reservationId: existingReservation?._id,
            })
    
            if(error){
                setReservationRejected(false)
                setRejectionError(true)
                return false
            }
            
            if(data && data.success){
                if(data.message === 'Reservation rejected successfully'){
                    setReservationRejected(true)
                    setRejectionError(false)
                    return true
                }
            }
        }catch(error){
            console.log(error)
        }
      }

    const handleUpdateTimeSlots = async () => {
        // const copy_selectedTimeSlots = {}

        // //increasing month by 1
        //     for(const dateStringKey in selectedTimeSlots){
        //         const dateStringKeySplited = dateStringKey.split('-')
        //         const increasedMonth = Number(dateStringKeySplited[1]) + 1
        //         const updatedDateStringKey = `${dateStringKeySplited[0]}-${increasedMonth}-${dateStringKeySplited[2]}`

        //         copy_selectedTimeSlots[updatedDateStringKey] = selectedTimeSlots[dateStringKey]
        //     }
        // //

        // for(const dateStringKey in copy_selectedTimeSlots){
        //     if(copy_selectedTimeSlots[dateStringKey] && copy_selectedTimeSlots[dateStringKey].length === 0){
        //         delete copy_selectedTimeSlots[dateStringKey]
        //     }
        // }

        for(const dateStringKey in selectedTimeSlots){
            if(selectedTimeSlots[dateStringKey] && selectedTimeSlots[dateStringKey].length === 0){
                delete selectedTimeSlots[dateStringKey]
            }
        }

        //console.log(copy_selectedTimeSlots)

        try{
            const {error, data} = await updateUser({timeSlots: selectedTimeSlots})

            if(error){
                setErrorMessage('Došlo je do greške')
                setIsSuccess(false)
                return
            }

            if(data && data.success){
                setIsSuccess(true)
                setErrorMessage('')
                getMyUserData()
            }

        }catch(error){
            console.log(error)
        }
    }

    useFocusEffect(useCallback(()=>{
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0)

        setToday(todayDate)


        if(userData && userData.timeSlots){
            // const copy_userTimeSlots = {}

            //decreasing month by 1
                // for(const dateStringKey in userData.timeSlots){
                //     const dateStringKeySplited = dateStringKey.split('-')
                //     const decreasedMonth = Number(dateStringKeySplited[1]) - 1
                //     const updatedDateStringKey = `${dateStringKeySplited[0]}-${decreasedMonth}-${dateStringKeySplited[2]}`
                //     copy_userTimeSlots[updatedDateStringKey] = userData.timeSlots[dateStringKey]
                // }
            //*
            setSelectedTimeSlots(userData.timeSlots)
            //


            const updatedMarkedDates = []

            // Current time in seconds since midnight
            const currentTimeInSeconds = new Date().getHours() * 3600 + new Date().getMinutes() * 60

                                        //userData.timeSlots
            for (const dateStringKey in userData.timeSlots) {
                const [day, month, year] = dateStringKey.split('-')
                const slotDate = new Date(year, month, day)

                if (slotDate.getTime() === todayDate.getTime()) {
                    // Check if any timeSlot is greater than the current time for today

                    //const hasFutureTimeSlot = userData.timeSlots[dateStringKey].some(
                        const hasFutureTimeSlot = userData.timeSlots[dateStringKey].some(
                        (slot) => slot.value > currentTimeInSeconds
                    )

                    if (hasFutureTimeSlot) {
                        updatedMarkedDates.push(slotDate)
                    }
                } else {
                    // For dates other than today, add them to marked dates
                    updatedMarkedDates.push(slotDate)
                }
            }
            
            setMarkedDates(updatedMarkedDates)
        }
    }, []))

    
    const customDatesStyles = useMemo(()=>{
        const copyMarkedDates = [...markedDates]

        copyMarkedDates.sort((a, b) => a - b)

        const updatedCustomDatesStyles = []

        for (let i = 0; i < copyMarkedDates.length; i++) {
            const current = copyMarkedDates[i]

            updatedCustomDatesStyles.push({
              date: current,
              style: { 
                backgroundColor: '#00505b',
              },
              textStyle: { color: '#fff'},
            })
        }

        return updatedCustomDatesStyles
    }, [markedDates])

    const handleBack = () => {
        navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
    }

    const onDateChange = (date) => {
        setRefreshTimeSlots(true)

        setTimeout(()=>{
            setRefreshTimeSlots(false)
        }, 50)

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0)

        setToday(todayDate)
        
        
        const isToday = date && 
        date.getDate() == todayDate.getDate() &&
        date.getMonth() == todayDate.getMonth() &&
        date.getFullYear() == todayDate.getFullYear();
        
        setIsTodaySelected(isToday)
        setSelectedStartDate(date)
        
    }

    const handleSelectTimeSlot = async (timeSlot) => {
        const dateStringKey = `${selectedStartDate.getDate()}-${selectedStartDate.getMonth()}-${selectedStartDate.getFullYear()}`
        const foundArray = selectedTimeSlots[dateStringKey] ? [...selectedTimeSlots[dateStringKey]] : null

        const markedDateIndex = markedDates.findIndex(date => {
            return date.getDate() === selectedStartDate.getDate() && 
            date.getMonth() === selectedStartDate.getMonth() && 
            date.getFullYear() === selectedStartDate.getFullYear()
        })

        if(foundArray){
            const timeSlotIndex = foundArray.findIndex(slot => slot.value === timeSlot.value)

            if (timeSlotIndex > -1) {
                // If the timeSlot is found, remove it from the array
                if(foundArray[timeSlotIndex].isReserved){
                    setIsReservationExistsModalVisible(true)

                    setTimeout(async ()=>{
                        const {error, data} = await checkReservation({
                            date: dateStringKey,
                            time: foundArray[timeSlotIndex].label
                        })
    
                        if(error){
                            setIsReservationExistsModalVisible(false)
                        }
    
                        if(data && data.success){
                            console.log('existing')
                            console.log(data?.result)
                            setExistingReservation(data?.result)
                        }
                    }, 500)

                    return
                }

                foundArray.splice(timeSlotIndex, 1)

                if(foundArray.length === 0){
                    
                    if(markedDateIndex > -1){
                        const updatedMarkedDates = [...markedDates]
                        updatedMarkedDates.splice(markedDateIndex, 1)

                        setMarkedDates(updatedMarkedDates)
                    }

                }
            } else {
                // If the timeSlot is not found, add it to the array
                foundArray.push(timeSlot)

                //doing + 1 on month here
                if(!markedDateIndex > -1){
                    setMarkedDates([...markedDates, new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate())])
                }

            }

            setSelectedTimeSlots({
                ...selectedTimeSlots,
                [dateStringKey]: foundArray
            })

            return
        }

        setSelectedTimeSlots({
            ...selectedTimeSlots,
            [dateStringKey]: [timeSlot]
        })

        setMarkedDates([...markedDates, new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate())])

    }

    useEffect(()=>{console.log(markedDates)}, [markedDates])

  return (
    <SafeAreaView className="bg-bgSecondary h-full">
        <View className="flex flex-col justify-between h-full">
            <StatusBar style={'dark'} />
            <View className="flex flex-row justify-between items-center pt-20 pb-4 -mt-16 px-4 bg-bgSecondary">
                <TouchableOpacity onPress={handleBack}>
                    <MaterialIcons name="arrow-back-ios-new" size={24} color="#232323" />
                </TouchableOpacity>
                <Text className="text-textPrimary text-xl" bold>Tvoji termini</Text>
            </View>

            <View className="px-4 flex-1">
                <View className="flex flex-col justify-between items-start px-2 mt-4">
                    <View className="flex flex-row justify-start items-center">
                        <View className="h-3 w-3 bg-appColorDark rounded-full"></View>
                        <Text className="text-textMid ml-2" semi>Datumi na kojima su postavljeni termini</Text>
                    </View>

                    <View className="flex flex-row justify-start items-center">
                        <View className="h-3 w-3 bg-appColor rounded-full"></View>
                        <Text className="text-textMid ml-2" semi>Trenutno izabran datum</Text>
                    </View>
                </View>

                <View className="mt-8">
                    <Text className="text-textMid" semi>Izaberi datum i označi željene termine</Text>
                </View>

                <Animated.View className="bg-bgPrimary mt-3 py-5 rounded-xl">
                    <CalendarPicker 
                        previousComponent={
                            <View className="ml-2">
                                <MaterialIcons name="arrow-back-ios" size={24} color="#000" />
                            </View>
                        }
                        nextComponent={
                            <View className="mr-1">
                                <MaterialIcons name="arrow-forward-ios" size={24} color="#000" />
                            </View>
                        }
                        onDateChange={onDateChange}
                        months={monthsArray}
                        weekdays={weekdaysArray}
                        width={370}
                        textStyle={{fontWeight: 'bold'}}
                        selectedDayColor='#5F9EA0'
                        selectedDayTextColor='#fff'
                        todayBackgroundColor="transparent"
                        todayTextStyle={{ color: '#000' }}
                        disabledDates={(date) => {
                            const normalizedDate = new Date(date);
                            normalizedDate.setHours(0, 0, 0, 0); // Normalize the date to 00:00:00
                        
                            return normalizedDate < today; // Disable dates before today
                          }}
                        disabledDatesTextStyle={{ color: '#babbb6' }}
                        customDatesStyles={customDatesStyles}
                        allowBackwardRangeSelect={true}
                    />
                </Animated.View>

                {selectedStartDate !== null &&
                
                <View>
                    <View className="flex flex-row justify-between items-center">
                        <Text className={`mb-1 text-md mt-4`}>Termini za: <Text semi>{selectedStartDate.getDate()}. {monthsArray[selectedStartDate.getMonth()]}</Text></Text>
                        <Text className={`mb-1 text-xs mt-4`}>Skroluj desno za još</Text>
                    </View> 
                    {!refreshTimeSlots && <Animated.View entering={BounceInRight}>
                    <ScrollView 
                        className="mb-2 -mr-10"
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft: 5,
                            paddingVertical: 20
                    }}>
                        {timeSlots.map((timeSlot, index) => {
                            const indexPlusOne = index + 1
                            const lastItem = timeSlots.length == indexPlusOne
                            let isSelected = false
                            let hasReservation = false
                            const dateStringKey = `${selectedStartDate.getDate()}-${selectedStartDate.getMonth()}-${selectedStartDate.getFullYear()}`
                            const foundArray = selectedTimeSlots[dateStringKey]

                            if(foundArray){
                                const timeSlotIndex = foundArray.findIndex(slot => slot.value === timeSlot.value)

                                if (timeSlotIndex > -1){
                                    isSelected = true

                                    if(foundArray[timeSlotIndex]?.isReserved){
                                        hasReservation = true
                                    }
                                }
                                
                            }

                            const now = new Date()
                            const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

                            if(timeSlot.value < currentSeconds + 2000 && isTodaySelected) return null

                            
                            return (
                                <TouchableOpacity 
                                    onPress={() => {handleSelectTimeSlot(timeSlot)}}
                                    key={index} 
                                    className={`w-24 h-14 ${isSelected ? 'bg-appColor' : 'bg-bgPrimary'} ml-2 rounded-xl flex flex-row justify-center items-center ${lastItem && 'mr-20'} relative`}>
                                    {hasReservation && 
                                        <View className="absolute z-10 rounded-full top-1 right-1">
                                            <FontAwesome6 name="clock" size={16} color="white" />
                                        </View>
                                    }
                                    <Text semi className={`${isSelected ? 'text-white' : 'text-textPrimary'}`}>{timeSlot.label}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    </Animated.View>}
                </View>}
            </View>
            
            <View className="flex flex-row justify-center items-center h-5 mb-6">
                <Text className="text-red-700 text-center">{errorMessage}</Text>
            </View>

            <View className="px-4 mb-8">
                <CustomButton 
                    text={'Sačuvaj'}
                    onPress={handleUpdateTimeSlots}
                    isError={!!errorMessage}
                    isSuccess={isSuccess}
                    isLoading={isUpdateUserLoading}
                    variant={'dark'}
                />
            </View>
        </View>

        <ReservationExistsModal 
            isModalVisible={isReservationExistsModalVisible}
            setIsModalVisible={setIsReservationExistsModalVisible}
            handleConfirm={handleConfirm}
            isLoading={isCheckReservationLoading}
            reservationDetails={existingReservation}
            setExistingReservation={setExistingReservation}
            isSuccess={reservationRejected}
            setIsSuccess={setReservationRejected}
            isError={rejectionError}
            setIsError={setRejectionError}
            rejectionLoading={customRejectionLoading || isRejectingReservation}
        />
    </SafeAreaView>
  )
}

export default WorkerScreen