import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
    authBtns: { marginLeft: 'auto' },
};

function Navbar(props) {
    const { classes } = props;
    return (
        <Fragment>
            <AppBar>
                <Toolbar>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <div className={classes.authBtns}>
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
export default withStyles(styles)(Navbar);
