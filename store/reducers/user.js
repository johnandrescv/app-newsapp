import { LOGIN_DATA } from "../actions/user";

const initialState = {
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type){
        case LOGIN_DATA:
            return {
                user: action.user
            }
        default:
            return state;
    }
};