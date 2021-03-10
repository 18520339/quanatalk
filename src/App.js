import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles/';

import { Home, SignUp, Login } from './pages';
import Navbar from './components/Navbar';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff',
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <div className='container'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}
