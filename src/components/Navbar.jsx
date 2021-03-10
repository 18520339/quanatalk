import React from 'react';
import Link from 'react-router-dom/Link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function Navbar() {
    return (
        <AppBar>
            <Toolbar>
                <Button color='inherit' component={Link} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={Link} to='/signup'>
                    SignUp
                </Button>
                <Button color='inherit' component={Link} to='/login'>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
