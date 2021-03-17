const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    expandButton: {
        position: 'absolute',
        left: '90%',
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '3%',
    },
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%',
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    commentAvatar: {
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    commentData: {
        marginLeft: 35,
    },
    spinner: {
        textAlign: 'center',
        margin: '20px auto',
    },
    visibleSep: {
        width: '100%',
        borderBottom: '1px solid rgb(0, 0, 0, 0.1)',
        marginBottom: 20,
    },
    invisibleSep: {
        border: 'none',
        margin: 4,
    },
    image: {
        minWidth: 200,
        objectFit: 'cover',
    },
    content: {
        padding: 25,
    },
};
export default styles;
