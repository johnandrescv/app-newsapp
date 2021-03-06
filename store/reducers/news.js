import { GET_NEWS, LOGIN_DATA } from "../actions/news";

const initialState = {
    articles: [],
};

export default (state = initialState, action) => {
    switch (action.type){
        case GET_NEWS:
            return {
                articles: action.news
            }
        case LOGIN_DATA:
            return {
                user: action.user
            }
        default:
            return state;
    }
};