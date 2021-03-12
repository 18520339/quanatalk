import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../constants';

export const signInUser = (authData, history) => (dispatch, getState) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/signin', authData)
        .then(res => {
            const qntToken = `Bearer ${res.data.token}`;
            localStorage.setItem('QntToken', qntToken);
            axios.defaults.headers.common['Authorization'] = qntToken;

            dispatch(getMe());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const getMe = () => (dispatch, getState) => {
    axios
        .get('/user/me')
        .then(res => dispatch({ type: SET_USER, payload: res.data }))
        .catch(console.error);
};
