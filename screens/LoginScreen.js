import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FacebookButton from '../components/FacebookButton';
import GoogleButton from '../components/GoogleButton';
import { loginRequest } from '../services/request';
import * as loginActions from '../store/actions/user';
import { useDispatch } from 'react-redux';
import * as Facebook from 'expo-facebook';
import { fbid, googleandroid, googleios, googlestandalone } from '../constants/Config';
import * as Google from 'expo-google-app-auth'; 
import Loading from '../components/Loading';

const LoginScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const loginFb = async() => {
        setIsLoading(true);
        await Facebook.initializeAsync(fbid, 'NewsApp');
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(fbid, {permissions: ['public_profile']});
        if(type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userinfo = await response.json();
            const loginData = await loginRequest({ id: userinfo.id, type: 'F', name: userinfo.name, image: userinfo.picture.data.url });
            if(loginData){
                setIsLoading(false);
                dispatch(loginActions.saveUser(loginData));
                props.navigation.navigate('Profile');
            }
        }else{
            setIsLoading(false);
            return;
        }
    };

    const loginGoogle = async () => {
        try{
            setIsLoading(true);
            const result = await Google.logInAsync({
                iosClientId: googleios,
                androidClientId: googleandroid,
                androidStandaloneAppClientId: googlestandalone,
                success: ['profile', 'email']
            });
            if(result.type === 'success') {
                const loginData = await loginRequest({ id: result.user.id, type: 'G', name: result.user.givenName, image: result.user.photoUrl });
                if(loginData){
                    setIsLoading(false);
                    dispatch(loginActions.saveUser(loginData));
                    props.navigation.navigate('Profile');
                }
            }else{
                setIsLoading(false);
                return;
            }
        } catch(e) {
            setIsLoading(false);
            return;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Sign In Now!</Text>
            <FacebookButton onClick={loginFb} navigation={props.navigation} style={styles.btnLogin} />
            <GoogleButton onClick={loginGoogle} navigation={props.navigation} style={styles.btnLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    label:{
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 16,
    },
    btnLogin: {
        marginVertical: 5,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: '10%'
    }
});

export default LoginScreen;