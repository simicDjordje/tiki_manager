import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AccountScreen, HomeScreen, StatisticsScreen, ReservationsScreen } from '../Screens'
import { View } from "react-native"
import Text from "../Components/CustomComponents/CustomText"

import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator()

const MainTab = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
        headerShown: false,
        tabBarHideOnKeyborad: true,
        tabBarStyle: {
          marginTop: -50
        },
    }}
    >
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons stroke={focused ? 3 : 2} name="options" size={24} color={focused ? '#232323' : '#babbb6'} />
                  <Text semi style={{color: focused ? '#232323': '#babbb6', fontSize: 12}}>Početna</Text>
                </View>
            )
        }}/>

        <Tab.Screen name="ReservationsScreen" component={ReservationsScreen} options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <FontAwesome5 stroke={focused ? 3 : 2} name="user-clock" size={24} color={focused ? '#232323' : '#babbb6'} />
                  <Text semi style={{color: focused ? '#232323': '#babbb6', fontSize: 12}}>Rezervacije</Text>
                </View>
            )
        }}/>

        <Tab.Screen name="StatisticsScreen" component={StatisticsScreen} options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <AntDesign stroke={focused ? 3 : 2} name="areachart" size={24} color={focused ? '#232323' : '#babbb6'} />
                  <Text semi style={{color: focused ? '#232323': '#babbb6', fontSize: 12}}>Rezultati</Text>
                </View>
            )
        }}/>

        <Tab.Screen name="AccountScreen" component={AccountScreen} options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <FontAwesome stroke={focused ? 3 : 2} name="user" size={24} color={focused ? '#232323' : '#babbb6'} />
                  <Text semi style={{color: focused ? '#232323': '#babbb6', fontSize: 12}}>Profil</Text>
                </View>
            )
        }}/>

        
    </Tab.Navigator>
  )
}

export default MainTab