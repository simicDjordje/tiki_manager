import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddSalonScreen, NotificationsScreen, SalonImagesScreen, SalonLocationScreen, SalonLogoScreen, SalonNameDescScreen, SalonScreen, SalonServicesCategoriesScreen, SalonServicesScreen, SalonSingleWorkerScreen, SalonWorkersScreen, ServiceScreen, WorkerScreen } from "../Screens";

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
      <Stack.Screen name="SalonNameDescScreen" component={SalonNameDescScreen} />
      <Stack.Screen name="SalonLocationScreen" component={SalonLocationScreen} />
      <Stack.Screen name="SalonServicesCategoriesScreen" component={SalonServicesCategoriesScreen} />
      <Stack.Screen name="SalonServicesScreen" component={SalonServicesScreen} />
      <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
      <Stack.Screen name="SalonWorkersScreen" component={SalonWorkersScreen} />
      <Stack.Screen name="SalonSingleWorkerScreen" component={SalonSingleWorkerScreen} />
      <Stack.Screen name="WorkerScreen" component={WorkerScreen} />

      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />

    </Stack.Navigator>
  )
}

export default StackTab