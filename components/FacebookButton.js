import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const FacebookButton = props => {

    return (
        <View style={{...props.style}}>
            <TouchableOpacity onPress={props.onClick}>
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