import { NavigationContainer } from "@react-navigation/native"
import MainTab from "./MainTab"
import StackTab from './StackTab'
import AuthTab from "./AuthTab"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="AuthTabScreens" component={AuthTab} />
            <Stack.Screen name="MainTabScreens" component={MainTab} />
            <Stack.Screen name="StackTabScreens" component={StackTab} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation