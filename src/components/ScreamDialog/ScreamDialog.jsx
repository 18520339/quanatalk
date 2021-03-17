import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Grid,
    Typography,
    Dialog,
    DialogContent,
    CircularProgress,
} from '@material-ui/core';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    UnfoldMore,
} from '@material-ui/icons';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getScreamById } from '../../redux/actions/scream.actions';

// Components
import Comments from './Comments';
import LikeButton from '../Shared/LikeButton';
import TipButton from '../Shared/TipButton';

function ScreamDialog({ classes, screamId }) {
    const {
        body,
        userAvatar,
        userHandle,
        createdAt,
        likeCount,
        commentCount,
        comments,
    } = useSelector(state => state.scream.scream);
    const { loading } = useSelector(state => state.UI);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true);
        dispatch(getScreamById(screamId));
    };
    const onClose = () => setOpen(false);

    return (
        <Fragment>
            <TipButton
                tip='Expand scream'
                className={classes.expandButton}
                onClick={onOpen}
            >
                <UnfoldMore color='primary' />
            </TipButton>
            <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
                <TipButton
                    tip='Close'
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </TipButton>
                <DialogContent className={classes.content}>
                    {loading ? (
                        <div className={classes.spinner}>
                            <CircularProgress size={200} thickness={2} />
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item sm={5}>
                                <img
                                    src={userAvatar}
                                    alt='Profile avatar'
                                    className={classes.profileImage}
                                />
                            </Grid>
                            <Grid item sm={7}>
                                <Typography
                                    component={Link}
                                    color='primary'
                                    variant='h5'
                                    to={`/user/${userHandle}`}
                                >
                                    @{userHandle}
                                </Typography>
                                <hr className={classes.invisibleSep} />
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    {dayjs(createdAt).format(
                                        'h:mm A, MMMM DD YYYY'
                                    )}
                                </Typography>
                                <hr className={classes.invisibleSep} />
                                <Typography variant='body1'>{body}</Typography>
                                <LikeButton screamId={screamId} />
                                <span>{likeCount} Likes</span>
                                <TipButton tip='Comments'>
                                    <ChatIcon color='primary' />
                                </TipButton>
                                <span>{commentCount} Comments</span>
                            </Grid>
                            <hr className={classes.visibleSep} />
                            <Comments classes={classes} comments={comments} />
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
export default withStyles(styles)(ScreamDialog);
