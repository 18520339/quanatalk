import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from '../images/logo.png';
import styles from './styles';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Grid,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from '@material-ui/core';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signInUser } from '../redux/actions/user.actions';

function SignIn({ classes, history }) {
    const { loading, errors } = useSelector(state => state.UI);
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({ email: '', password: '' });

    const onChange = event => {
        const { name, value } = event.target;
        setAuthData({ ...authData, [name]: value });
    };
    const onSubmit = event => {
        event.preventDefault();
        dispatch(signInUser(authData, history));
    };

    return (
        <Grid container style={{ textAlign: 'center' }}>
            <Grid item sm></Grid>
            <Grid item sm>
                <img
                    className={classes.logo}
                    width='75'
                    src={AppLogo}
                    alt='logo'
                />
                <Typography variant='h2' className={classes.title}>
                    Sign in
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
                        Sign in
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
                        Don't have an account ?
                        <Link to='/signup'> Sign up</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    );
}
export default withStyles(styles)(SignIn);
