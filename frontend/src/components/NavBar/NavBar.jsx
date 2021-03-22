import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles';

import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';

import PostButton from './PostButton';
import NotificationButton from './NotificationButton';
import TipButton from '../Shared/TipButton';

function NavBar({ classes }) {
    const { authenticated } = useSelector(state => state.user);
    return (
        <AppBar>
            <Toolbar className={classes.navContainer}>
                {authenticated ? (
                    <Fragment>
                        <PostButton classes={classes} />
                        <Link to='/'>
                            <TipButton title='Home'>
                                <HomeIcon />
                            </TipButton>
                        </Link>
                        <NotificationButton />
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
