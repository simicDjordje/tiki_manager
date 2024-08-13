import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Salon from '../Screens/Salon'

const Stack = createNativeStackNavigator();

const StackTab = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Salon" component={Salon} />
    </Stack.Navigator>
  )
}

export default StackTab