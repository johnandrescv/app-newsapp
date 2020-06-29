import React, { useState, createRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as newsAction from '../store/actions/news';
import SegmentedButtons from '../components/SegmentedButtons';
import NewsItem from '../components/NewsItem';
import Loading from '../components/Loading';

const NewsScreen = props => {
    const dispatch = useDispatch();
    const flatList = createRef();
    const news = useSelector(state => state.news.articles);
    const [category, setCategory] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

    const changeCategoryHandler = async (index) => {
        setCategory(index);
        flatList.current.scrollToIndex({ index: 0 });
        setIsLoading(true);
        await dispatch(newsAction.fetchNews(categories[index]));
        setIsLoading(false);
    };

    useEffect(() => {
        const loadFirst = async() => {
            setIsLoading(true);
            await dispatch(newsAction.fetchNews(categories[category]));
            setIsLoading(false);
        }
        loadFirst();
    }, [dispatch]);

    let FinalView =  <View style={styles.listContainer}>
                        <FlatList ref={flatList} keyExtractor={(item, index) => item.title} data={news} renderItem={itemData => <NewsItem article={itemData.item} onArticleSelection={() => { props.navigation.navigate('Detail', {detail: itemData.item}); }} />} />
                    </View>;
    
    if (isLoading) {
        FinalView = <Loading />;
    }

    return (
        <View style={styles.screen}>
            <View style={styles.segmentedContainer}>
                <SegmentedButtons categories={categories} selection={category} onChange={changeCategoryHandler} />
            </View>
            { FinalView }
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