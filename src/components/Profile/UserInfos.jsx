import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

export default function UserInfos() {
    const { bio, website, location, createdAt, handle } = useSelector(
        state => state.user.credentials
    );
    return (
        <div className='profile-infos'>
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
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                        {website}
                    </a>
                    <hr />
                </Fragment>
            )}
            <CalendarToday color='primary' />
            <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
    );
}
