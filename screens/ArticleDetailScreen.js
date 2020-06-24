import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import CustomColors from '../constants/CustomColors';

const ArticleDetailScreen = props => {
    const detail = props.navigation.getParam('detail');
    const [title, setTitle] = useState(detail.title);
    const [desc, setDesc] = useState(detail.content);
    const [btnText, setBtnText] = useState('Read More');

    const changeLangHandler = async (lang) => {
        const response = await fetch('https://jac-translate-api.herokuapp.com/api/v1/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `title=${title}&description=${desc}&additionalText=${btnText}&lang=${lang}`
        });
        const translateData = await response.json();
        setTitle(translateData.result[0].translatedText);
        setDesc(translateData.result[1].translatedText);
        setBtnText(translateData.result[2].translatedText);
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
            <Image style={styles.image} source={{uri: detail.urlToImage ? detail.urlToImage : 'https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png'}} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{desc}</Text>
            <Text style={styles.source}>{detail.author}, {detail.source.name}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity>
                    <View style={styles.button}>
                    <Text style={styles.btntitle}>{btnText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.langContainer}>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Translate/Traducir/Traduire</Text>
                </View>
                <TouchableOpacity onPress={changeLangHandler.bind(this, 'en')}>
                    <Image source={require('../assets/images/en.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={changeLangHandler.bind(this, 'es')}>
                    <Image source={require('../assets/images/es.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={changeLangHandler.bind(this, 'fr')}>
                    <Image source={require('../assets/images/fr.png')}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

ArticleDetailScreen.navigationOptions = (navOptions) => {
    const details = navOptions.navigation.getParam('detail');
    return {
      headerTitle: details.source.name,
    }
  }

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
      },
      title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 10
      },
      description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'justify',
        paddingHorizontal: 10
      },
      source: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'justify',
        paddingHorizontal: 10
      }, 
      langContainer: {
          flexDirection: 'row',
          width: '100%',
          alignContent: 'center',
          justifyContent: 'space-around',
          marginVertical: 20
      },
      subtitleContainer: {
          alignItems: 'center',
          justifyContent: 'center'
      },
      subtitle: {
          fontFamily: 'open-sans',
          color: '#888',
          fontSize: 12
      },
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

export default ArticleDetailScreen;