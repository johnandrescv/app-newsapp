import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-google-app-auth'; 
import { googleandroid, googleios } from '../constants/Config';
import { loginRequest } from '../services/request';
import { useDispatch } from 'react-redux';
import * as loginActions from '../store/actions/user';

const GoogleButton = props => {
    const dispatch = useDispatch();

    const loginGoogle = async () => {
        try{
            const result = await Google.logInAsync({
                iosClientId: googleios,
                androidClientId: googleandroid,
                success: ['profile', 'email']
            });
            if(result.type === 'success') {
                const loginData = await loginRequest({ id: result.user.id, type: 'G', name: result.user.givenName, image: result.user.photoUrl });
                if(loginData){
                    dispatch(loginActions.saveUser(loginData));
                    props.navigation.navigate('Profile');
                }
            }else{
                return;
            }
        } catch(e) {
            return;
        }
    };

    return (
        <View style={{...props.style}}>
            <TouchableOpacity onPress={loginGoogle}>
                <View style={styles.btnContainer}>
                    <Image style={styles.btnImage} source={require('../assets/images/g-logo.png')} />
                    <Text style={styles.btnText}>Sign In With Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10
    },
    btnImage: {
        width: 20,
        height: 20
    },
    btnText: {
        fontFamily: 'open-sans-bold',
        marginHorizontal: 10,
        fontSize: 16,
        color: '#888'
    }
});

export default GoogleButton;