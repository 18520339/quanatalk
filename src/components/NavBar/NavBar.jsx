import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

export default function NavBar() {
    return (
        <Fragment>
            <AppBar>
                <Toolbar>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button color='inherit' component={Link} to='/signin'>
                            Sign in
                        </Button>
                        <Button color='inherit' component={Link} to='/signup'>
                            Sign up
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}
