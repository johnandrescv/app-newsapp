import React from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { ScrollView, StyleSheet } from 'react-native';
import CustomColors from '../constants/CustomColors';

const SegmentedButtons = props => {
    return (
        <ScrollView horizontal={true} bounces={false} showsHorizontalScrollIndicator={false}>
            <SegmentedControlTab
                tabStyle={styles.tabStyle}
                firstTabStyle={styles.firstTabStyle}
                lastTabStyle={styles.lastTabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                values={props.categories}
                selectedIndex={props.selection}
                onTabPress={props.onChange}
                borderRadius={0}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tabStyle: {
        padding: 20,
        paddingVertical: 10,
        borderColor: CustomColors.primary
    },
    firstTabStyle: {
        borderRadius: 0
    },
    lastTabStyle: {
        borderRadius: 0
    },
    tabTextStyle: {
        color: CustomColors.primary,
        fontSize: 14,
        fontFamily: 'open-sans'
    },
    activeTabStyle: {
        borderBottomColor: CustomColors.primary,
        borderBottomWidth: 10,
        backgroundColor: 'transparent'
    },
    activeTabTextStyle: {
      color: CustomColors.primary,
      fontSize: 14,
      fontFamily: 'open-sans-bold'
    }
});

export default SegmentedButtons;