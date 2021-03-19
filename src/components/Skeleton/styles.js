const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    content: {
        width: '100%',
        flexDirection: 'column',
        padding: 25,
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover',
    },
    handle: {
        width: 60,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7,
    },
});
export default styles;
