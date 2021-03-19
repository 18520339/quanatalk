import React, { Fragment } from 'react';
import skeletonImage from '../../images/skeleton.png';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardMedia, CardContent } from '@material-ui/core';

function ScreamSkeleton({ classes }) {
    return (
        <Fragment>
            {Array.from({ length: 5 }).map((item, index) => (
                <Card key={index} className={classes.card}>
                    <CardMedia
                        className={classes.image}
                        image={skeletonImage}
                    />
                    <CardContent className={classes.skeletonContent}>
                        <div className={classes.handle} />
                        <div className={classes.date} />
                        <div className={classes.fullLine} />
                        <div className={classes.fullLine} />
                        <div className={classes.halfLine} />
                    </CardContent>
                </Card>
            ))}
        </Fragment>
    );
}
export default withStyles(styles)(ScreamSkeleton);
