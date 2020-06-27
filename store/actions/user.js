export const LOGIN_DATA = 'LOGIN_DATA';

export const saveUser = (user) => {
    return { type: LOGIN_DATA, user };
}