import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SegmentedButtons from '../components/SegmentedButtons';

const NewsScreen = props => {
    const [category, setCategory] = useState('Business');
    const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
    const changeCategoryHandler = (category) => {
        setCategory(category);
    };
    return (
        <View>
            <SegmentedButtons categories={categories} selection={category} onChange={changeCategoryHandler} />
            <Text>News</Text>
        </View>
    );
};

export default NewsScreen;