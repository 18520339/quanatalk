import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_ERRORS } from '../../redux/constants';

export default function AuthRoute({ component: Component, ...rest }) {
    const { authenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => dispatch({ type: CLEAR_ERRORS }));

    return (
        <Route
            {...rest}
            render={props => {
                return authenticated ? (
                    <Redirect to='/' />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
}
