import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from '../images/logo.png';
import styles from './styles';

// Material UI
import {
    Grid,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signUpUser } from '../redux/actions/user.actions';

function SignUp({ classes, history }) {
    const { loading, errors } = useSelector(state => state.UI);
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        confirm: '',
        handle: '',
    });

    const onChange = event => {
        const { name, value } = event.target;
        setAuthData({ ...authData, [name]: value });
    };
    const onSubmit = event => {
        event.preventDefault();
        dispatch(signUpUser(authData, history));
    };

    return (
        <Grid container className={classes.form}>
            <Grid item sm></Grid>
            <Grid item sm>
                <img
                    className={classes.logo}
                    width='75'
                    src={AppLogo}
                    alt='logo'
                />
                <Typography variant='h2' className={classes.title}>
                    Sign up
                </Typography>
                <form noValidate onSubmit={onSubmit}>
                    <TextField
                        id='email'
                        name='email'
                        type='email'
                        label='Email'
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={authData.email}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        id='password'
                        name='password'
                        type='password'
                        label='Password'
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={authData.password}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        id='confirm'
                        name='confirm'
                        type='password'
                        label='Confirm Password'
                        className={classes.textField}
                        helperText={errors.confirm}
                        error={errors.confirm ? true : false}
                        value={authData.confirm}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        id='handle'
                        name='handle'
                        type='text'
                        label='Handle'
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={authData.handle}
                        onChange={onChange}
                        fullWidth
                    />
                    {errors.general && (
                        <Typography
                            variant='body2'
                            className={classes.customError}
                        >
                            {errors.general}
                        </Typography>
                    )}
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        disabled={loading}
                    >
                        Sign up
                        {loading && (
                            <CircularProgress
                                className={classes.progress}
                                size={30}
                            />
                        )}
                    </Button>
                    <br />
                    <br />
                    <small>
                        Already have an account ?
                        <Link to='/signin'> Sign in</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    );
}
export default withStyles(styles)(SignUp);
