import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import { useDispatch } from 'react-redux';
import * as loginActions from '../store/actions/user';
import CustomColors from '../constants/CustomColors';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        console.log(userData);
        props.navigation.navigate('Login');
        return;
      }
      const user = JSON.parse(userData);
      dispatch(loginActions.saveUser(user));
      props.navigation.navigate('Profile');
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={CustomColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
