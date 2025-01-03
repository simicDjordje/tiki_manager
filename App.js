import Navigation from './Navigation';
import * as Font from 'expo-font'
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {store} from './redux/store'
import LoadingComponent from './Components/LoadingComponent';
import { SocketContextProvider } from './Context/SocketContext';

const loadFonts = async () => {
  await Font.loadAsync({
    'Inter': require('./assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'InterBlack': require('./assets/fonts/static/Inter_28pt-Black.ttf'),
    'InterSemi': require('./assets/fonts/static/Inter_28pt-SemiBold.ttf'),
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  if (!fontsLoaded) {
    return (
        <LoadingComponent />
      )
  }

  return (
    <Provider store={store}>
      <SocketContextProvider>
        <Navigation />
      </SocketContextProvider>
    </Provider>
  );
}

