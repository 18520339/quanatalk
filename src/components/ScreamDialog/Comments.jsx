import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

export default function Comments({ classes, comments }) {
    return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userAvatar, userHandle } = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img
                                        src={userAvatar}
                                        className={classes.commentAvatar}
                                        alt='comment'
                                    />
                                </Grid>
                                <Grid item sm={9}>
                                    <div style={{ marginLeft: 35 }}>
                                        <Typography
                                            variant='h5'
                                            color='primary'
                                            component={Link}
                                            to={`/user/${userHandle}`}
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='textSecondary'
                                        >
                                            {dayjs(createdAt).format(
                                                'h:mm A, MMMM DD YYYY'
                                            )}
                                        </Typography>
                                        <hr className={classes.invisibleSep} />
                                        <Typography variant='body1'>
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length - 1 && (
                            <hr className={classes.visibleSep} />
                        )}
                    </Fragment>
                );
            })}
        </Grid>
    );
}
