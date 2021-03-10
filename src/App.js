import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, SignUp, Login } from './pages';
import Navbar from './components/Navbar';
import './App.css';

export default function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
