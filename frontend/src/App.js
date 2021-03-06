import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './App.css';

// Redux
import { useDispatch } from 'react-redux';
import { signOutUser, getMe } from './redux/actions/user.actions';
import { SET_AUTHENTICATED } from './redux/constants';

// Components
import { Home, User, SignIn, SignUp } from './pages';
import AuthRoute from './components/Shared/AuthRoute';
import NavBar from './components/NavBar';

axios.defaults.baseURL = `https://asia-southeast2-quanatalk.cloudfunctions.net/api`;
export default function App() {
    const dispatch = useDispatch();
    const token = localStorage.QntToken;

    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(signOutUser());
            window.location.href = '/signin';
        } else {
            dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common['Authorization'] = token;
            dispatch(getMe());
        }
    }
    return (
        <BrowserRouter>
            <NavBar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <AuthRoute exact path='/signin' component={SignIn} />
                    <AuthRoute exact path='/signup' component={SignUp} />
                    <Route exact path='/user/:handle' component={User} />
                    <Route
                        exact
                        path='/user/:handle/scream/:screamId'
                        component={User}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
