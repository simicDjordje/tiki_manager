import { View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Text from '../Components/CustomComponents/CustomText'
import CalendarPicker from 'react-native-calendar-picker'
import { timeSlotsConstants } from '../constants'
import CustomButton from '../Components/CustomComponents/CustomButton'


const monthsArray = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"]
const weekdaysArray = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"]

const WorkerScreen = ({navigation}) => {
    const today = new Date()
    const salonName = 'Beauty salon PK'
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const markedDates = [
        new Date(2024, 7, 23),
        new Date(2024, 7, 24),
        new Date(2024, 7, 25),
        new Date(2024, 7, 26),
        new Date(2024, 7, 30),
        new Date(2024, 7, 31),
        new Date(2024, 8, 1),
        new Date(2024, 8, 4),
        new Date(2024, 8, 5),
        new Date(2024, 8, 6),
        new Date(2024, 8, 7),
        new Date(2024, 8, 8),
        new Date(2024, 8, 9),
        new Date(2024, 8, 10),
        new Date(2024, 8, 11),
        new Date(2024, 8, 19),
        new Date(2024, 8, 27),
        new Date(2024, 8, 28),
        new Date(2024, 8, 16),
    ]
    const [timeSlots, setTimeSlots] = useState([...timeSlotsConstants])
    const [selectedTimeSlots, setSelectedTimeSlots] = useState({})

    const customDatesStyles = []

    markedDates.sort((a, b) => a - b)

    for (let i = 0; i < markedDates.length; i++) {
        const current = markedDates[i];
        const next = markedDates[i + 1];
    
        const isStart = i === 0 || (markedDates[i - 1] && markedDates[i - 1].getTime() !== current.getTime() - 86400000);
        const isEnd = !next || next.getTime() !== current.getTime() + 86400000;
    
        customDatesStyles.push({
          date: current,
          style: { 
            backgroundColor: '#00505b',
            borderTopLeftRadius: isStart ? 20 : 0,
            borderBottomLeftRadius: isStart ? 20 : 0,
            borderTopRightRadius: isEnd ? 20 : 0,
            borderBottomRightRadius: isEnd ? 20 : 0,
            paddingLeft: 50
            
          },
          textStyle: { color: '#fff', marginLeft: -50 },
        });
      }

    const handleBack = () => {
        navigation.navigate('MainTabScreens', {screen: 'HomeScreen'})
    }

    const onDateChange = (date) => {
        console.log(date.toString())
        console.log(date.toString().split(' '))
        setSelectedStartDate(date)
    }

    // const handleSelectTimeSlot = {
    //     const selectedStartDateArray = selectedStartDate.toString().split(' ')
    // }

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
                <View className="mt-8">
                    <Text className="text-textMid" semi>Izaberi datum i označi željene termine</Text>
                </View>

                <View className="bg-bgPrimary mt-3 py-5 rounded-xl">
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
                        disabledDates={(date) => date < today}
                        disabledDatesTextStyle={{ color: '#babbb6' }}
                        customDatesStyles={customDatesStyles}
                        allowBackwardRangeSelect={true}
                    />
                </View>

                {selectedStartDate !== null &&
                
                <View>
                    <View className="flex flex-row justify-between items-center">
                        <Text className={`mb-1 text-md mt-4`}>Termini za: <Text semi>{selectedStartDate.getDate()}. {monthsArray[selectedStartDate.getMonth()]}</Text></Text>
                        <Text className={`mb-1 text-xs mt-4`}>Skroluj desno za još</Text>
                    </View> 
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
                            const isSelected = indexPlusOne % 2 === 0

                            const now = new Date()
                            const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

                            if(timeSlot.value < currentSeconds) return null

                            return (
                                <TouchableOpacity key={index} className={`w-24
                                    h-14 ${isSelected ? 'bg-appColor' : 'bg-bgPrimary'} ml-2 rounded-xl flex flex-row justify-center items-center ${lastItem && 'mr-20'}`}>
                                    <Text semi className={`${isSelected ? 'text-white' : 'text-textPrimary'}`}>{timeSlot.label}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>}
            </View>

            <View className="px-4 mb-8">
                <CustomButton 
                    text={'Sačuvaj'}
                    onPress={()=>{}}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default WorkerScreen