import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

// Material Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

import dayjs from 'dayjs';
import styles from './styles';

function Profile(props) {
    const { classes } = props;
    const {
        authenticated,
        credentials: { avatarUrl, bio, website, location, createdAt, handle },
        loading,
    } = useSelector(state => state.user);

    if (loading) return <p>Loading...</p>;
    return authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img
                        className='profile-image'
                        src={avatarUrl}
                        alt='Profile image'
                    />
                </div>
                <hr />
                <div className='profile-details'>
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        color='primary'
                        variant='h5'
                    >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && (
                        <Fragment>
                            <Typography variant='body2'>{bio}</Typography>
                            <hr />
                        </Fragment>
                    )}
                    {location && (
                        <Fragment>
                            <LocationOn color='primary' />
                            <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color='primary' />{' '}
                            <a
                                href={website}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color='primary' />
                    <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
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
