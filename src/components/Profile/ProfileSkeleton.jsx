import React from 'react';
import Avatar from './Avatar';
import skeletonImage from '../../images/skeleton.png';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {
    LocationOn,
    Link as LinkIcon,
    CalendarToday,
} from '@material-ui/icons';

function ProfileSkeleton({ classes }) {
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <Avatar isMe={false} avatarUrl={skeletonImage} />
                <hr />
                <div className='profile-infos'>
                    <div className='handle' />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color='primary' /> Location
                    <hr />
                    <LinkIcon color='primary' /> https://website.com
                    <hr />
                    <CalendarToday color='primary' /> Joined date
                </div>
            </div>
        </Paper>
    );
}
export default withStyles(styles)(ProfileSkeleton);
