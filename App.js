import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import NewsNavigator from './navigation/NewsNavigator';
import { AppLoading } from 'expo';
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}></AppLoading>
  }

  return (
    <NewsNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
