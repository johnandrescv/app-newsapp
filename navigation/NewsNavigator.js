import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewsScreen from '../screens/NewsScreen';
import CustomColors from '../constants/CustomColors';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import StartupScreen from '../screens/StartupScreen';
import { Text } from 'react-native';
import EditProfileScreen from '../screens/EditProfileScreen';

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
    Detail: ArticleDetailScreen
}, {
    defaultNavigationOptions: headerOptions
});

const LoginNavigator = createStackNavigator({
    Login: LoginScreen,
}, {
    defaultNavigationOptions: headerOptions,
});

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen,
    Edit: EditProfileScreen
}, {
    defaultNavigationOptions: headerOptions,
    mode: 'modal'
});

const SwitchNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Login: LoginNavigator,
    Profile: ProfileNavigator,
});

const tabConfig = {
    News: {screen: NewsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => <Ionicons name='md-paper' size={25} color={tabInfo.tintColor} />,
        tabBarColor: CustomColors.primary,
        tabBarLabel:  Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>News</Text> : 'News',
    }},
    Profile: {screen: SwitchNavigator, navigationOptions: {
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