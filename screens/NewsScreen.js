import React, { useState, createRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as newsAction from '../store/actions/news';
import SegmentedButtons from '../components/SegmentedButtons';
import NewsItem from '../components/NewsItem';

const NewsScreen = props => {
    const dispatch = useDispatch();
    const flatList = createRef();
    const news = useSelector(state => state.news.articles);
    const [category, setCategory] = useState(0);
    const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

    const changeCategoryHandler = (index) => {
        dispatch(newsAction.fetchNews(categories[index]));
        setCategory(index);
        flatList.current.scrollToIndex({ index: 0 });
    };

    useEffect(() => {
        dispatch(newsAction.fetchNews(categories[category]));
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <View style={styles.segmentedContainer}>
                <SegmentedButtons categories={categories} selection={category} onChange={changeCategoryHandler} />
            </View>
            <View style={styles.listContainer}>
                <FlatList ref={flatList} keyExtractor={(item, index) => item.title} data={news} renderItem={itemData => <NewsItem article={itemData.item} onArticleSelection={() => { props.navigation.navigate('Detail', {detail: itemData.item}); }} />} />
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