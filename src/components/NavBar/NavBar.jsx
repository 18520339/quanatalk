import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TipButton from '../Shared/TipButton';
import styles from './styles';

import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import {
    Add as AddIcon,
    Home as HomeIcon,
    Notifications,
} from '@material-ui/icons';

function NavBar({ classes }) {
    const { authenticated } = useSelector(state => state.user);
    return (
        <AppBar>
            <Toolbar className={classes.navContainer}>
                {authenticated ? (
                    <Fragment>
                        <TipButton tip='Post a Scream!'>
                            <AddIcon />
                        </TipButton>
                        <Link to='/'>
                            <TipButton tip='Home'>
                                <HomeIcon />
                            </TipButton>
                        </Link>
                        <TipButton tip='Notifications'>
                            <Notifications />
                        </TipButton>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button color='inherit' component={Link} to='/'>
                            Home
                        </Button>
                        <Button color='inherit' component={Link} to='/signin'>
                            Sign in
                        </Button>
                        <Button color='inherit' component={Link} to='/signup'>
                            Sign up
                        </Button>
                    </Fragment>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default withStyles(styles)(NavBar);
