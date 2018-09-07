import userApi from './userAPI';
import tokenService from './tokenService';

function signup(user) {
    return userApi.signup(user)
    .then(token => tokenService.setToken(token));
}

function getUser() {
    return tokenService.getUserFromToken();
}

function logout() {
    tokenService.removeToken()
}

function login(user) {
    return userApi.login(user)
    .then(token => tokenService.setToken(token));
}

export default {
    signup,
    getUser,
    logout,
    login
}