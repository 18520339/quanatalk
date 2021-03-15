import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

// Material UI
import {
    Paper,
    Tooltip,
    Button,
    IconButton,
    Typography,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/actions/user.actions';

// Components
import Avatar from './Avatar';
import UserInfos from './UserInfos';
import EditInfos from './EditInfos';

function Profile({ classes }) {
    const { authenticated, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onSignOut = () => dispatch(signOutUser());

    if (loading) return <p>Loading...</p>;
    return authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <Avatar />
                <hr />
                <UserInfos />
                <Tooltip title='Sign out' placement='top'>
                    <IconButton onClick={onSignOut}>
                        <KeyboardReturn color='primary' />
                    </IconButton>
                </Tooltip>
                <EditInfos classes={classes} />
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant='body2' align='center'>
                No profile found, please sign in again
            </Typography>
            <div className={classes.buttons}>
                <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to='/signin'
                >
                    Sign in
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    component={Link}
                    to='/signup'
                >
                    Sign up
                </Button>
            </div>
        </Paper>
    );
}
export default withStyles(styles)(Profile);
