import React, { useState, useEffect, Fragment } from 'react';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { editUserInfos } from '../../redux/actions/user.actions';

function EditInfos({ classes }) {
    const { credentials } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [userInfos, setUserInfos] = useState({
        bio: '',
        website: '',
        location: '',
    });

    const mapInfosToState = () => {
        const { bio, website, location } = credentials;
        setUserInfos({
            ...userInfos,
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : '',
        });
    };
    const onChange = event => {
        const { name, value } = event.target;
        setUserInfos({ ...userInfos, [name]: value });
    };
    const onSubmit = () => {
        dispatch(editUserInfos(userInfos));
        setOpen(false);
    };
    const onOpen = () => {
        mapInfosToState();
        setOpen(true);
    };
    const onClose = () => setOpen(false);
    useEffect(() => mapInfosToState(), []);

    return (
        <Fragment>
            <Tooltip title='Edit infos' placement='top'>
                <IconButton className={classes.button} onClick={onOpen}>
                    <EditIcon color='primary' />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            id='bio'
                            name='bio'
                            type='text'
                            label='Bio'
                            className={classes.textField}
                            placeholder='A short bio about yourself'
                            value={userInfos.bio}
                            onChange={onChange}
                            rows={3}
                            multiline
                            fullWidth
                        />
                        <TextField
                            id='website'
                            name='website'
                            type='text'
                            label='Website'
                            className={classes.textField}
                            placeholder='Your personal website'
                            value={userInfos.website}
                            onChange={onChange}
                            fullWidth
                        />
                        <TextField
                            id='location'
                            name='location'
                            type='text'
                            label='Location'
                            className={classes.textField}
                            placeholder='Where you live'
                            value={userInfos.location}
                            onChange={onChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
export default withStyles(styles)(EditInfos);
