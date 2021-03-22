import { CLEAR_ERRORS } from '../constants';

export const clearErrors = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_ERRORS });
};
