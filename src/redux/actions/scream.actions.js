import axios from 'axios';
import {
    SET_SCREAMS,
    SET_SCREAM_BY_ID,
    POST_SCREAM,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    SUBMIT_COMMENT,
    LOADING_SCREAMS,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
} from '../constants';

export const getScreams = () => (dispatch, getState) => {
    dispatch({ type: LOADING_SCREAMS });
    axios
        .get('/screams')
        .then(res => dispatch({ type: SET_SCREAMS, payload: res.data }))
        .catch(err => dispatch({ type: SET_SCREAMS, payload: [] }));
};

export const getScreamById = screamId => (dispatch, getState) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/scream/${screamId}`)
        .then(res => {
            dispatch({ type: SET_SCREAM_BY_ID, payload: res.data });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(console.err);
};

export const postScream = newScream => (dispatch, getState) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/scream', newScream)
        .then(res => {
            dispatch({ type: POST_SCREAM, payload: res.data });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};

export const likeScream = screamId => (dispatch, getState) => {
    axios
        .get(`/scream/${screamId}/like`)
        .then(res => dispatch({ type: LIKE_SCREAM, payload: res.data }))
        .catch(console.error);
};

export const unlikeScream = screamId => (dispatch, getState) => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then(res => dispatch({ type: UNLIKE_SCREAM, payload: res.data }))
        .catch(console.error);
};

export const deleteScream = screamId => (dispatch, getState) => {
    axios
        .delete(`/scream/${screamId}`)
        .then(() => dispatch({ type: DELETE_SCREAM, payload: screamId }))
        .catch(console.error);
};

export const submitComment = (screamId, comment) => (dispatch, getState) => {
    axios
        .post(`/scream/${screamId}/comment`, comment)
        .then(res => {
            dispatch({ type: SUBMIT_COMMENT, payload: res.data });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
};
