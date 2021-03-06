import axios from 'axios';
import {
    SET_SCREAMS,
    LOADING_SCREAMS,
    SET_UNAUTHENTICATED,
    SET_USER,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
} from '../constants';

const setAuthorizationHeader = token => {
    const qntToken = `Bearer ${token}`;
    localStorage.setItem('QntToken', qntToken);
    axios.defaults.headers.common['Authorization'] = qntToken;
};

export const signUpUser = (authData, history) => (dispatch, getState) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/signup', authData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getMe());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const signInUser = (authData, history) => (dispatch, getState) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/signin', authData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getMe());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const signOutUser = () => (dispatch, getState) => {
    localStorage.removeItem('QntToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getMe = () => (dispatch, getState) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user/me')
        .then(res => dispatch({ type: SET_USER, payload: res.data }))
        .catch(console.error);
};

export const getUserByHandle = userHandle => (dispatch, getState) => {
    dispatch({ type: LOADING_SCREAMS });
    axios
        .get(`/user/${userHandle}`)
        .then(res => dispatch({ type: SET_SCREAMS, payload: res.data.screams }))
        .catch(() => dispatch({ type: SET_SCREAMS, payload: null }));
};

export const uploadAvatar = formData => (dispatch, getState) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('/user/avatar', formData)
        .then(() => dispatch(getMe()))
        .catch(console.error);
};

export const editUserInfos = userInfos => (dispatch, getState) => {
    dispatch({ type: LOADING_USER });
    axios
        .post('/user', userInfos)
        .then(() => dispatch(getMe()))
        .catch(console.error);
};

export const markNotificationsRead = unReadIds => (dispatch, getState) => {
    axios
        .post('/notifications', unReadIds)
        .then(() => dispatch({ type: MARK_NOTIFICATIONS_READ }))
        .catch(console.error);
};
