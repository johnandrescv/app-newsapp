import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Facebook from 'expo-facebook'; 

const fbid = '284026302953409';
const ProfileScreen = props => {
    
    const loginFb = async() => {
        await Facebook.initializeAsync(fbid, 'NewsApp');
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(fbid, {permissions: ['public_profile']});
        if(type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userinfo = await response.json();
            console.log(userinfo);
        } else {
            console.log('Error');
        }
    };

    return (
        <View>
            <Text>Profile Screen</Text>
            <TouchableOpacity onPress={loginFb}>
                <View>
                    <Text>Login with Facebook</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;