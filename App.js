import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigation';
import * as Font from 'expo-font'
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const loadFonts = async () => {
  await Font.loadAsync({
    'Inter': require('./assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  if (!fontsLoaded) {
    return <View className="mt-56"><Text>Loading fontss wait....</Text></View>
  }

  return (
    <Navigation />
  );
}

