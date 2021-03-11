import React from 'react';
import { Route, Redirect } from 'react-router';

export default function AuthRoute({
    component: Component,
    authenticated,
    ...rest
}) {
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
