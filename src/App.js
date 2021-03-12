import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './styles/App.css';

// Redux
import { useDispatch } from 'react-redux';
import { signOutUser, getMe } from './redux/actions/user.actions';
import { SET_AUTHENTICATED } from './redux/constants';

// Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

export default function App() {
    const dispatch = useDispatch();
    const token = localStorage.QntToken;

    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            // localStorage.removeItem('QntToken');
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
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <AuthRoute exact path='/signin' component={SignIn} />
                    <AuthRoute exact path='/signup' component={SignUp} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
