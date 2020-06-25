import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FacebookButton from '../components/FacebookButton';
import GoogleButton from '../components/GoogleButton';

const ProfileScreen = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Sign In Now!</Text>
            <FacebookButton style={styles.btnLogin} />
            <GoogleButton style={styles.btnLogin} />
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

export default ProfileScreen;