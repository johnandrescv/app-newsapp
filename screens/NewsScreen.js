import React, { useState, createRef } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as newsAction from '../store/actions/news';
import SegmentedButtons from '../components/SegmentedButtons';
import NewsItem from '../components/NewsItem';

const NewsScreen = props => {
    const dispatch = useDispatch();
    const flatList = createRef();
    const news = useSelector(state => state.news.articles);
    const [category, setCategory] = useState('Business');
    const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

    const changeCategoryHandler = (index) => {
        dispatch(newsAction.fetchNews(categories[index]));
        setCategory(index);
        flatList.current.scrollToIndex({ index: 0 });
    };

    return (
        <View style={styles.screen}>
            <View style={styles.segmentedContainer}>
                <SegmentedButtons categories={categories} selection={category} onChange={changeCategoryHandler} />
            </View>
            <View style={styles.listContainer}>
                <FlatList ref={flatList} keyExtractor={(item, index) => item.title} data={news} renderItem={itemData => <NewsItem article={itemData.item} />} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    segmentedContainer: {
        height: '10%'
    },
    listContainer: {
        margin: 10,
        height: '90%'
    }
});

export default NewsScreen;