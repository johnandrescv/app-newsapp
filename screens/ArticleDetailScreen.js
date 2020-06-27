import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View, Linking} from 'react-native';
import MainButton from '../components/MainButton';

const ArticleDetailScreen = props => {
    const detail = props.navigation.getParam('detail');
    const [title, setTitle] = useState(detail.title);
    const [desc, setDesc] = useState(detail.content);
    const [btnText, setBtnText] = useState('Read More');
    const [lang, setLang] = useState('en');

    const changeLangHandler = async (confLang) => {
        const reqBody = new FormData();
        reqBody.append('title', title);
        reqBody.append('description', desc);
        reqBody.append('additionalText', btnText);
        reqBody.append('lang', confLang);
        const response = await fetch('https://jac-translate-api.herokuapp.com/api/v1/translate', {
            method: 'POST',
            body: reqBody
        });
        const translateData = await response.json();
        setTitle(translateData.result[0].translatedText);
        setDesc(translateData.result[1].translatedText);
        setBtnText(translateData.result[2].translatedText);
        setLang(confLang);
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
            <Image style={styles.image} source={{uri: detail.urlToImage ? detail.urlToImage : 'https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png'}} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{desc}</Text>
            <Text style={styles.source}>{detail.author}, {detail.source.name}</Text>
            <MainButton btnText={btnText} onClick={() => { Linking.openURL(detail.url).catch((err) => console.error('An error occurred', err)); }} />
            <View style={styles.langContainer}>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Translate/Traducir/Traduire</Text>
                </View>
                <TouchableOpacity disabled={lang === 'en'} onPress={changeLangHandler.bind(this, 'en')}>
                    <Image style={styles.langImg} source={require('../assets/images/en.png')}/>
                </TouchableOpacity>

                <TouchableOpacity disabled={lang === 'es'} onPress={changeLangHandler.bind(this, 'es')}>
                    <Image style={styles.langImg} source={require('../assets/images/es.png')}/>
                </TouchableOpacity>

                <TouchableOpacity disabled={lang === 'fr'} onPress={changeLangHandler.bind(this, 'fr')}>
                    <Image style={styles.langImg}  source={require('../assets/images/fr.png')}/>
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
        height: 200
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
          width: '80%',
          alignContent: 'center',
          justifyContent: 'space-around',
          marginVertical: 20,
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
      langImg: {
        width: 30,
        height: 30
    }
});

export default ArticleDetailScreen;