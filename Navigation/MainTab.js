import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from '../Screens'
import { View, Text } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const MainTab = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
        headerShown: false,
        tabBarHideOnKeyborad: true,
        // tabBarStyle: {
        //   backgroundColor: ThemeColors['dark'].color5, 
        //   borderTopWidth: 0, 
        //   paddingBottom: 2,
        //   paddingTop: 4
        // },
    }}
    >
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
            tabBarLabelStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons stroke={focused ? 3 : 2} name="options" size={24} color={focused ? '#232323' : '#babbb6'} />
                  <Text style={{color: focused ? '#232323': '#babbb6', fontSize: 12}}>Početna</Text>
                </View>
            )
        }}/>

        
    </Tab.Navigator>
  )
}

export default MainTab