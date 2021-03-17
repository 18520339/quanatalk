import {
    SET_SCREAMS,
    POST_SCREAM,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_SCREAMS,
} from '../constants';

const initialState = { allScreams: [], scream: {}, loading: false };
export default function screamReducer(state = initialState, action) {
    switch (action.type) {
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            const index = state.allScreams.findIndex(
                scream => scream.screamId === action.payload.screamId
            );
            state.allScreams[index] = action.payload;
            return { ...state };
        case SET_SCREAMS:
            return { ...state, allScreams: action.payload, loading: false };
        case POST_SCREAM:
            return {
                ...state,
                allScreams: [action.payload, ...state.allScreams],
            };
        case DELETE_SCREAM:
            const deletedIndex = state.allScreams.findIndex(
                scream => scream.screamId === action.payload
            );
            state.allScreams.splice(deletedIndex, 1);
            return { ...state };
        case LOADING_SCREAMS:
            return { ...state, loading: true };
        default:
            return state;
    }
}
