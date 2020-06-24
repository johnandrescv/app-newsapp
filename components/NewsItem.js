import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CustomColors from '../constants/CustomColors';

const NewsItem = props => {
    return (<View style={styles.container}>
        <TouchableOpacity onPress={props.onArticleSelection}>
            <View>
                <View style={{...styles.newsRow, ...styles.newsHeader}}>
                    <ImageBackground source={{uri: props.article.urlToImage ? props.article.urlToImage : 'https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png'}} style={styles.bgImage}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={2}>{props.article.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{...styles.newsRow,...styles.newsBody}}>
                    <Text style={styles.dateText}>{moment(props.article.publishedAt).format('LLL')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        height: 200, 
        width: '100%',
        backgroundColor: '#f2f0f0',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f2f0f0',
        marginVertical: 5
    },
    newsRow: {
        flexDirection: 'row'
    },
    newsHeader: {
        height: '85%'
    },
    newsBody: {
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
        height: '15%',
        alignItems: 'center',
        backgroundColor: CustomColors.primary
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
    dateText: {
        color: 'white',
        fontFamily: 'open-sans'
    }
});

export default NewsItem;