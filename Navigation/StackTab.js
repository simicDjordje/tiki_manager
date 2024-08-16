import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddSalonScreen, SalonImagesScreen, SalonLogoScreen, SalonScreen } from "../Screens";

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
      <Stack.Screen name="SalonLogoScreen" component={SalonLogoScreen} />
      <Stack.Screen name="SalonImagesScreen" component={SalonImagesScreen} />
    </Stack.Navigator>
  )
}

export default StackTab