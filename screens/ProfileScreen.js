import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomColors from '../constants/CustomColors';
import MainButton from '../components/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from '../services/request';
import * as loginActions from '../store/actions/user';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const ProfileScreen = props => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const logOutHandler = () => {
        removeUserData();
        dispatch(loginActions.saveUser({}));
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image fadeDuration={300} style={styles.image} resizeMode="cover" source={{uri: user.image}} />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.secondary}>Welcome, <Text style={styles.highlight}>{user.name}</Text></Text>
            </View>
            <MainButton btnText="Sign out" onClick={logOutHandler} />
        </View>
    );
};

ProfileScreen.navigationOptions = (navOptions) => {
    return {
      headerTitle: 'My Profile',
      headerRight: () => {
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}><Item title='Edit' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => { navOptions.navigation.navigate('Edit'); }} /></HeaderButtons>
      },
    }
  };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 10
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderRadius: 200,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: CustomColors.primary,
        fontFamily: 'open-sans-bold'
    },
    secondary: {
        fontFamily: 'open-sans',
        color: '#888'
    },
});

export default ProfileScreen;