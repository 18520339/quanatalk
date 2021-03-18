import React, { Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import TipButton from '../Shared/TipButton';

// Redux
import { useDispatch } from 'react-redux';
import { uploadAvatar } from '../../redux/actions/user.actions';

export default function Avatar({ isMe, avatarUrl }) {
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
            {isMe && (
                <Fragment>
                    <input
                        id='avatar-input'
                        type='file'
                        hidden='hidden'
                        onChange={onAvatarChange}
                    />
                    <TipButton tip='Change your avatar' onClick={onChooseImage}>
                        <EditIcon color='primary' />
                    </TipButton>
                </Fragment>
            )}
        </div>
    );
}
