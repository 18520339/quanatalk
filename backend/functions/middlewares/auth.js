const { admin, firestore } = require('../firebase');

exports.authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    let idToken;

    if (authorization && authorization.startsWith('Bearer ')) {
        idToken = authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {
            req.user = decodedIdToken;
            return firestore
                .collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            req.user.avatarUrl = data.docs[0].data().avatarUrl;
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token:', err.message);
            return res.status(403).json(err);
        });
};
