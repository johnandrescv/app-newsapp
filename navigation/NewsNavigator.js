import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewsScreen from '../screens/NewsScreen';
import CustomColors from '../constants/CustomColors';
import ProfileScreen from '../screens/ProfileScreen';

const headerOptions = {
    headerStyle: {
        backgroundColor: CustomColors.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: '#fff'
}

const NewsNavigator = createStackNavigator({
    News: NewsScreen,
}, {
    defaultNavigationOptions: headerOptions
});

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen,
}, {
    defaultNavigationOptions: headerOptions
});

const tabConfig = {
    News: {screen: NewsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => <Ionicons name='md-paper' size={25} color={tabInfo.tintColor} />,
        tabBarColor: CustomColors.primary,
        tabBarLabel:  Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>News</Text> : 'News',
    }},
    Profile: {screen: ProfileNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => <Ionicons name='md-person' size={25} color={tabInfo.tintColor} />,
        tabBarColor: CustomColors.secondary,
        tabBarLabel:  Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Profile</Text> : 'Profile',
    }}
};

const MainTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabConfig, { 
    activeTintColor: 'white',
    shifting: true,
    //barStyle: { backgroundColor: Color.primary } /** AYUDA A QUE EL BACKGROUND COLOR CAMBIE */
}) : createBottomTabNavigator(tabConfig, {
    tabBarOptions: {
        activeTintColor: CustomColors.primary,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainTabNavigator);