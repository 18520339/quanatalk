import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Material UI
import { Link as MuiLink, Typography } from '@material-ui/core';
import {
    LocationOn,
    Link as LinkIcon,
    CalendarToday,
} from '@material-ui/icons';

export default function UserInfos({ profile }) {
    const { bio, website, location, createdAt, handle } = profile;
    return (
        <div className='profile-infos'>
            <MuiLink
                component={Link}
                to={`/user/${handle}`}
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
