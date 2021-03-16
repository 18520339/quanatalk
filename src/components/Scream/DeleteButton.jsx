import React, { useState, Fragment } from 'react';
import TipButton from '../Shared/TipButton';

// Material UI
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteScream } from '../../redux/actions/scream.actions';

export default function DeleteButton({ classes, screamId, userHandle }) {
    const { authenticated, credentials } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onDeleteScream = () => dispatch(deleteScream(screamId));
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        authenticated &&
        userHandle === credentials.handle && (
            <Fragment>
                <TipButton
                    tip='Delete Scream'
                    className={classes.deleteButton}
                    onClick={onOpen}
                >
                    <DeleteOutline color='secondary' />
                </TipButton>
                <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
                    <DialogTitle>
                        Are you sure you want to delete this scream ?
                    </DialogTitle>
                    <DialogActions>
                        <Button color='primary' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button color='secondary' onClick={onDeleteScream}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    );
}
