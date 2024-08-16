import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddSalonScreen, SalonScreen } from "../Screens";

const Stack = createNativeStackNavigator();

const StackTab = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddSalonScreen" component={AddSalonScreen} />
      <Stack.Screen name="SalonScreen" component={SalonScreen} />
    </Stack.Navigator>
  )
}

export default StackTab