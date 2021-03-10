import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppLogo from '../images/logo.png';

const styles = {
    form: {
        textAlign: 'center',
    },
    logo: {
        animation: '$logoSpin infinite 20s linear',
        margin: '12px auto',
    },

    '@keyframes logoSpin ': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
};

function Login(props) {
    const { classes } = props;
    return (
        <Grid container className={classes.form}>
            <Grid item sm></Grid>
            <Grid item sm>
                <img
                    className={classes.logo}
                    width='90'
                    src={AppLogo}
                    alt='logo'
                />
                <Typography variant='h2' className={classes.loginTitle}>
                    Login
                </Typography>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    );
}
export default withStyles(styles)(Login);
