import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Facebook from 'expo-facebook';
import { fbid } from '../constants/Config';
import { Ionicons } from '@expo/vector-icons';

const FacebookButton = props => {
    
    const loginFb = async() => {
        await Facebook.initializeAsync(fbid, 'NewsApp');
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(fbid, {permissions: ['public_profile']});
        if(type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userinfo = await response.json();
            console.log(userinfo);
        }else{
            console.log('cancel by user');
        }
    };

    return (
        <View style={{...props.style}}>
            <TouchableOpacity onPress={loginFb}>
                <View style={styles.btnContainer}>
                    <Ionicons name='logo-facebook' color='white' size={22} />
                    <Text style={styles.btnText}>Login with Facebook</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: '#4267B2',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10
    },
    btnText: {
        fontFamily: 'open-sans-bold',
        marginHorizontal: 10,
        fontSize: 16,
        color: 'white'
    }
});

export default FacebookButton;