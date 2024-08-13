import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthScreen, RegisterScreen } from "../Screens"

const Stack = createNativeStackNavigator();

const AuthTab = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthTab