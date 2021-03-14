import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './styles';

function Scream({ classes, scream }) {
    const {
        body,
        userAvatar,
        userHandle,
        createdAt,
        likeCount,
        commentCount,
    } = scream;
    dayjs.extend(relativeTime);

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userAvatar}
                title='Profile image'
            />
            <CardContent className={classes.content}>
                <Typography
                    variant='h5'
                    component={Link}
                    to={`/users/${userHandle}`}
                    color='primary'
                >
                    {userHandle}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant='body1'>{body}</Typography>
            </CardContent>
        </Card>
    );
}
Scream.propTypes = {
    classes: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
};
export default withStyles(styles)(Scream);
