import { GET_NEWS } from "../actions/news";

const initialState = {
    articles: [],
};

export default (state = initialState, action) => {
    switch (action.type){
        case GET_NEWS:
            return {
                articles: action.news
            }
        default:
            return state;
    }
};