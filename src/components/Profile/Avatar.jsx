import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { useSelector, useDispatch } from 'react-redux';
import { uploadAvatar } from '../../redux/actions/user.actions';

export default function Avatar() {
    const { avatarUrl } = useSelector(state => state.user.credentials);
    const dispatch = useDispatch();

    const onAvatarChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        dispatch(uploadAvatar(formData));
    };
    const onChooseImage = () => {
        const fileInput = document.getElementById('avatar-input');
        fileInput.click();
    };
    return (
        <div className='image-wrapper'>
            <img
                className='profile-image'
                src={avatarUrl}
                alt='Profile avatar'
            />
            <input
                id='avatar-input'
                type='file'
                hidden='hidden'
                onChange={onAvatarChange}
            />
            <Tooltip title='Change your avatar' placement='top'>
                <IconButton className='button' onClick={onChooseImage}>
                    <EditIcon color='primary' />
                </IconButton>
            </Tooltip>
        </div>
    );
}
