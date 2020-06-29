import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const GoogleButton = props => {
    return (
        <View style={{...props.style}}>
            <TouchableOpacity onPress={props.onClick}>
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