import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles/';
import jwtDecode from 'jwt-decode';

import { Home, SignIn, SignUp } from './pages';
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

import palette from './styles/palette';
import './styles/App.css';

const theme = createMuiTheme(palette);
export default function App() {
    let authenticated = false;
    if (localStorage.QntToken) {
        const decodedToken = jwtDecode(localStorage.QntToken);
        if (decodedToken.exp * 1000 > Date.now()) authenticated = true;
        else window.location.href = '/signin';
    }
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <div className='container'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <AuthRoute
                            exact
                            path='/signin'
                            component={SignIn}
                            authenticated={authenticated}
                        />
                        <AuthRoute
                            exact
                            path='/signup'
                            component={SignUp}
                            authenticated={authenticated}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}
