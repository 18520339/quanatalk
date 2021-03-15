import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Button, Typography } from '@material-ui/core';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/actions/user.actions';

// Components
import Avatar from './Avatar';
import UserInfos from './UserInfos';
import EditInfos from './EditInfos';
import TipButton from '../Shared/TipButton';

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
                <TipButton tip='Sign out' onClick={onSignOut}>
                    <KeyboardReturn color='primary' />
                </TipButton>
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
