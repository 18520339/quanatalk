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

function SignIn(props) {
    const { classes } = props;
    const [credential, setCredential] = useState({ email: '', password: '' });
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
            .post('/user/signin', credential)
            .then(res => {
                localStorage.setItem('QntToken', `Bearer ${res.data.token}`);
                setLoading(false);
                props.history.push('/');
            })
            .catch(err => {
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
