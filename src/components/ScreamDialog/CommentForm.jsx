import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { submitComment } from '../../redux/actions/scream.actions';

export default function CommentForm({ classes, screamId }) {
    const { user, UI } = useSelector(state => state);
    const dispatch = useDispatch();

    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    const onChange = event => setBody(event.target.value);
    const onSubmit = event => {
        event.preventDefault();
        dispatch(submitComment(screamId, { body }));
    };

    useEffect(() => {
        if (UI.errors) setErrors(UI.errors);
        if (!UI.loading && Object.keys(UI.errors).length === 0) {
            setBody('');
            setErrors({});
        }
    }, [UI]);

    return (
        user.authenticated && (
            <Grid item sm={12} className={classes.commentForm}>
                <form onSubmit={onSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label='Comment on scream'
                        className={classes.textField}
                        onChange={onChange}
                        value={body}
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        fullWidth
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSep} />
            </Grid>
        )
    );
}
