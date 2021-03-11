import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from '../styles/authForm';
import AppLogo from '../images/logo.png';

function SignUp(props) {
    const { classes } = props;
    const [credential, setCredential] = useState({
        email: '',
        password: '',
        confirm: '',
        handle: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onChange = event => {
        const { name, value } = event.target;
        setCredential({ ...credential, [name]: value });
    };
    const onSubmit = event => {
        event.preventDefault();
        setLoading(true);
        axios
            .post('/user/signup', credential)
            .then(res => {
                localStorage.setItem('QntToken', `Bearer ${res.data.token}`);
                setLoading(false);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err.response.data);
                setErrors(err.response.data);
                setLoading(false);
            });
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
                        value={credential.email}
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
                        value={credential.password}
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
                        value={credential.confirm}
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
                        value={credential.handle}
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
