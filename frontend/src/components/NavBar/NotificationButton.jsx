import React, { useState, Fragment } from 'react';

// Material UI
import { Badge, Menu, MenuItem } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/user.actions';

// Components
import Notifications from './Notifications';
import TipButton from '../Shared/TipButton';

export default function NotificationButton() {
    const { notifications } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const unReadNotifications = notifications.filter(
        notification => !notification.read
    );

    const onOpen = event => setAnchorEl(event.target);
    const onClose = () => setAnchorEl(null);
    const onEntered = () => {
        const unReadIds = unReadNotifications.map(
            notification => notification.notificationId
        );
        dispatch(markNotificationsRead(unReadIds));
    };

    return (
        <Fragment>
            <TipButton
                title='Notifications'
                aria-owns={anchorEl && 'simple-menu'}
                aria-haspopup='true'
                onClick={onOpen}
            >
                {notifications &&
                notifications.length > 0 &&
                unReadNotifications.length > 0 ? (
                    <Badge
                        badgeContent={unReadNotifications.length}
                        color='secondary'
                    >
                        <NotificationsIcon />
                    </Badge>
                ) : (
                    <NotificationsIcon />
                )}
            </TipButton>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onEntered={onEntered}
                onClose={onClose}
            >
                {notifications && notifications.length > 0 ? (
                    <Notifications
                        notifications={notifications}
                        onClick={onClose}
                    />
                ) : (
                    <MenuItem onClick={onClose}>
                        You have no notifications yet
                    </MenuItem>
                )}
            </Menu>
        </Fragment>
    );
}
