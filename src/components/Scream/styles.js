const styles = theme => ({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%',
    },
    image: {
        minWidth: 200,
        objectFit: 'cover',
    },
    skeletonContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25,
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7,
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        marginBottom: 10,
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 10,
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 10,
    },
});
export default styles;
