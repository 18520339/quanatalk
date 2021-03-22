import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
} from '../constants';

const initialState = { loading: false, errors: {} };
export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return { ...state, loading: false, errors: action.payload };
        case CLEAR_ERRORS:
            return initialState;
        case LOADING_UI:
            return { ...state, loading: true };
        case STOP_LOADING_UI:
            return { ...state, loading: false };
        default:
            return state;
    }
}
