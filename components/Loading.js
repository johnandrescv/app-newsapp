import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import CustomColors from '../constants/CustomColors';

const Loading = props => {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={CustomColors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

export default Loading;