const styles = theme => ({
    paper: {
        padding: 20,
    },
    textField: {
        margin: '10px auto',
    },
    editInfos: {
        float: 'right',
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%',
            },
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-infos': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle',
            },
            '& a': {
                color: theme.palette.primary.main,
            },
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0',
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto',
    },
    fullLine: {
        height: 15,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 10,
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 10,
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px',
        },
    },
});
export default styles;
