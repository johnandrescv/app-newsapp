const API_KEY = '148a8d80a62c4e4fa301bf8a5f400683';
export const GET_NEWS = 'GET_NEWS';

export const fetchNews = (category) => {
    return async dispatch => {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
        const newsData = await response.json();
        dispatch({ type: GET_NEWS, news: newsData.articles });
    };
};
