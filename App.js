import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import NewsNavigator from './navigation/NewsNavigator';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import newsReducer from './store/reducers/news';
import userReducer from './store/reducers/user';
import ReduxThunk from 'redux-thunk';

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const rootReducer = combineReducers({
  news: newsReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}></AppLoading>
  }

  return (
    <Provider store={store}>
      <NewsNavigator />
    </Provider>
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
