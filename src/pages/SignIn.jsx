import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signInUser } from '../redux/actions/user.actions';

// Styles
import styles from '../styles/authForm';
import AppLogo from '../images/logo.png';

function SignIn(props) {
    const { classes, history } = props;
    const [authData, setAuthData] = useState({ email: '', password: '' });

    const { loading, errors } = useSelector(state => state.UI);
    const dispatch = useDispatch();

    const onChange = event => {
        const { name, value } = event.target;
        setAuthData({ ...authData, [name]: value });
    };
    const onSubmit = event => {
        event.preventDefault();
        dispatch(signInUser(authData, history));
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
