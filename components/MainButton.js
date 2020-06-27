import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CustomColors from '../constants/CustomColors';

const MainButton = props => {
    return (            
    <View style={{...styles.btnContainer, ...props.style}}>
        <TouchableOpacity onPress={props.onClick}>
            <View style={styles.button}>
            <Text style={styles.btntitle}>{props.btnText}</Text>
            </View>
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
    btnContainer:{
        alignItems: 'center'
    },
    button: {
        backgroundColor: CustomColors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btntitle: {
      fontFamily: 'open-sans-bold',
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      marginVertical: 10
    },
});

export default MainButton;