import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles/';
import palette from './styles/palette';
import './styles/App.css';

// Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

const theme = createMuiTheme(palette);
export default function App() {
    let authenticated = false;
    if (localStorage.QntToken) {
        const decodedToken = jwtDecode(localStorage.QntToken);
        if (decodedToken.exp * 1000 > Date.now()) authenticated = true;
        else {
            localStorage.removeItem('QntToken');
            window.location.href = '/signin';
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
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
            </Provider>
        </ThemeProvider>
    );
}
