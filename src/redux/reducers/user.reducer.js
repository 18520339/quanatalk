import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    LOADING_USER,
} from '../constants';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return { ...state, authenticated: true };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return { authenticated: true, loading: false, ...action.payload };
        case LOADING_USER:
            return { ...state, loading: true };
        default:
            return state;
    }
}
