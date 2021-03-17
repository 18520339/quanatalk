import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

// DayJS
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import DeleteButton from './DeleteButton';
import LikeButton from '../Shared/LikeButton';
import TipButton from '../Shared/TipButton';

function Scream({ classes, scream, children }) {
    const {
        screamId,
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
                title='Profile avatar'
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
                <DeleteButton
                    classes={classes}
                    screamId={screamId}
                    userHandle={userHandle}
                />
                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant='body1'>{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                <TipButton tip='Comments'>
                    <ChatIcon color='primary' />
                </TipButton>
                <span>{commentCount} Comments</span>
                {children}
            </CardContent>
        </Card>
    );
}
export default withStyles(styles)(Scream);
