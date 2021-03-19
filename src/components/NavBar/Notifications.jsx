import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, MenuItem } from '@material-ui/core';
import { Chat as ChatIcon, Favorite as FavoriteIcon } from '@material-ui/icons';

// Day.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Notifications = React.forwardRef(({ notifications, onClick }, ref) => {
    dayjs.extend(relativeTime);
    return notifications.map(
        ({ type, read, recipient, sender, createdAt, screamId }) => {
            const action = type === 'like' ? 'liked' : 'commented on';
            const time = dayjs(createdAt).fromNow();
            const color = read ? 'primary' : 'secondary';

            return (
                <MenuItem key={createdAt} ref={ref} onClick={onClick}>
                    {type === 'like' ? (
                        <FavoriteIcon
                            color={color}
                            style={{ marginRight: 10 }}
                        />
                    ) : (
                        <ChatIcon color={color} style={{ marginRight: 10 }} />
                    )}
                    <Typography
                        variant='body1'
                        component={Link}
                        to={`/user/${recipient}/scream/${screamId}`}
                    >
                        {sender} {action} your scream {time}
                    </Typography>
                </MenuItem>
            );
        }
    );
});
export default Notifications;
