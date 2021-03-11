const authForm = {
    form: {
        textAlign: 'center',
    },
    logo: {
        animation: '$logoSpin infinite 20s linear',
        margin: '10px auto',
    },
    title: {
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
export default authForm;
