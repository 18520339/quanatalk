import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppLogo from '../images/logo.png';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    form: {
        textAlign: 'center',
    },
    logo: {
        animation: '$logoSpin infinite 20s linear',
        margin: '10px auto',
    },
    loginTitle: {
        margin: '10px auto',
    },
    textField: {
        margin: '10px auto',
    },
    button: {
        position: 'relative',
        marginTop: 20,
    },
    progress: {
        position: 'absolute',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10,
    },
    '@keyframes logoSpin ': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
};

function Login(props) {
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
            .post('/user/login', credential)
            .then(res => {
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
                <Typography variant='h2' className={classes.loginTitle}>
                    Login
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
                        Login
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
                        <Link to='/user/signup'> Sign up</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    );
}
export default withStyles(styles)(Login);
