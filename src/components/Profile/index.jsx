import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Material Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser, uploadAvatar } from '../../redux/actions/user.actions';

import dayjs from 'dayjs';
import styles from './styles';

function Profile({ classes }) {
    const {
        authenticated,
        credentials: { avatarUrl, bio, website, location, createdAt, handle },
        loading,
    } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const onAvatarChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        dispatch(uploadAvatar(formData));
    };
    const onChooseImage = () => {
        const fileInput = document.getElementById('avatar-input');
        fileInput.click();
    };

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
                    <input
                        id='avatar-input'
                        type='file'
                        hidden='hidden'
                        onChange={onAvatarChange}
                    />
                    <Tooltip title='Change your avatar' placement='top'>
                        <IconButton className='button' onClick={onChooseImage}>
                            <EditIcon color='primary' />
                        </IconButton>
                    </Tooltip>
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
