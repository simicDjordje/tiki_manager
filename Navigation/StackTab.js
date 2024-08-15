import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AddSalonScreen from '../Screens/AddSalonScreen'

const Stack = createNativeStackNavigator();

const StackTab = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddSalonStepOne" component={AddSalonScreen} />
    </Stack.Navigator>
  )
}

export default StackTab