import React, { useState, useEffect, Fragment } from 'react';
import TipButton from '../Shared/TipButton';

// Material UI
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
} from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { postScream } from '../../redux/actions/scream.actions';
import { clearErrors } from '../../redux/actions/ui.actions';

export default function PostButton({ classes }) {
    const { UI } = useSelector(state => state);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    const onOpen = () => setOpen(true);
    const onClose = () => {
        setOpen(false);
        setErrors({});
        dispatch(clearErrors());
    };

    const onChange = event => setBody(event.target.value);
    const onSubmit = event => {
        event.preventDefault();
        dispatch(postScream({ body }));
    };

    useEffect(() => {
        if (UI.errors) setErrors(UI.errors);
        if (!UI.loading && Object.keys(UI.errors).length === 0) {
            setBody('');
            setOpen(false);
            setErrors({});
        }
    }, [UI]);

    return (
        <Fragment>
            <TipButton title='Post a Scream!' onClick={onOpen}>
                <AddIcon />
            </TipButton>
            <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
                <TipButton
                    title='Close'
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </TipButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent style={{ paddingBottom: 20 }}>
                    <form onSubmit={onSubmit}>
                        <TextField
                            name='body'
                            type='text'
                            label='NEW SCREAM!!!'
                            placeholder='QuanaTalk about what ?'
                            className={classes.textField}
                            onChange={onChange}
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            rows='3'
                            multiline
                            fullWidth
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submitButton}
                            disabled={UI.loading}
                        >
                            Submit
                            {UI.loading && (
                                <CircularProgress
                                    className={classes.progressSpinner}
                                    size={30}
                                />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
