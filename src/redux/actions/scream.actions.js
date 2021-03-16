import axios from 'axios';
import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_SCREAMS,
} from '../constants';

export const getScreams = () => (dispatch, getState) => {
    dispatch({ type: LOADING_SCREAMS });
    axios
        .get('/screams')
        .then(res => dispatch({ type: SET_SCREAMS, payload: res.data }))
        .catch(err => dispatch({ type: SET_SCREAMS, payload: [] }));
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
