import React, { useState, useEffect, Fragment } from 'react';
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

function Profile({ classes, profile }) {
    const { scream, user } = useSelector(state => state);
    const dispatch = useDispatch();

    const [isMe, setIsMe] = useState(false);
    const [userInfos, setUserInfos] = useState({});
    const onSignOut = () => dispatch(signOutUser());

    useEffect(() => {
        if (user.credentials.userId === profile.userId) {
            setIsMe(true);
            setUserInfos(user.credentials);
        } else {
            setIsMe(false);
            setUserInfos(profile);
        }
    }, [user.credentials, profile]);

    if (user.loading && scream.loading) return <p>Loading...</p>;
    return user.authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <Avatar isMe={isMe} avatarUrl={userInfos.avatarUrl} />
                <hr />
                <UserInfos profile={userInfos} />
                {isMe && (
                    <Fragment>
                        <TipButton tip='Sign out' onClick={onSignOut}>
                            <KeyboardReturn color='primary' />
                        </TipButton>
                        <EditInfos classes={classes} />
                    </Fragment>
                )}
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
