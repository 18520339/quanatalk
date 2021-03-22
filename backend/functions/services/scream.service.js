const { firestore, functions } = require('../firebase');

exports.getScreams = (req, res) => {
    firestore
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            const screams = data.docs.map(doc => ({
                screamId: doc.id,
                ...doc.data(),
            }));
            return res.status(200).json(screams);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.getScreamById = (req, res) => {
    let screamData;
    firestore
        .doc(`/screams/${req.params.screamId}`)
        .get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Scream not found' });

            screamData = doc.data();
            screamData.screamId = doc.id;
            return firestore
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('screamId', '==', doc.id)
                .get();
        })
        .then(data => {
            screamData.comments = data.docs.map(doc => doc.data());
            return res.status(200).json(screamData);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.createScream = (req, res) => {
    if (!req.body.body.trim())
        return res.status(400).json({ body: 'Must not be empty' });

    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        userAvatar: req.user.avatarUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
    };

    firestore
        .collection('screams')
        .add(newScream)
        .then(doc => res.status(201).json({ screamId: doc.id, ...newScream }))
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.deleteScream = (req, res) => {
    const screamDoc = firestore.doc(`/screams/${req.params.screamId}`);
    screamDoc
        .get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Scream not found' });
            if (doc.data().userHandle !== req.user.handle)
                return res.status(403).json({ error: 'Unauthorized' });
            return screamDoc.delete();
        })
        .then(() => {
            return res.status(200).json({
                message: 'Scream deleted successfully',
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.likeScream = (req, res) => {
    let screamData;
    const screamDoc = firestore.doc(`/screams/${req.params.screamId}`);
    const newLike = {
        screamId: req.params.screamId,
        userHandle: req.user.handle,
    };
    screamDoc
        .get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Scream not found' });

            screamData = doc.data();
            screamData.screamId = doc.id;
            return firestore
                .collection('likes')
                .where('userHandle', '==', req.user.handle)
                .where('screamId', '==', req.params.screamId)
                .limit(1)
                .get();
        })
        .then(data => {
            if (!data.empty)
                return res.status(400).json({ error: 'Scream already liked' });
            return firestore
                .collection('likes')
                .add(newLike)
                .then(() => {
                    const likeCount = ++screamData.likeCount;
                    return screamDoc.update({ likeCount });
                })
                .then(() => res.status(200).json(screamData));
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.unlikeScream = (req, res) => {
    let screamData;
    const screamDoc = firestore.doc(`/screams/${req.params.screamId}`);
    screamDoc
        .get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Scream not found' });

            screamData = doc.data();
            screamData.screamId = doc.id;
            return firestore
                .collection('likes')
                .where('userHandle', '==', req.user.handle)
                .where('screamId', '==', req.params.screamId)
                .limit(1)
                .get();
        })
        .then(data => {
            if (data.empty)
                return res.status(400).json({ error: 'Scream not liked' });
            return firestore
                .doc(`/likes/${data.docs[0].id}`)
                .delete()
                .then(() => {
                    const likeCount = --screamData.likeCount;
                    return screamDoc.update({ likeCount });
                })
                .then(() => res.status(200).json(screamData));
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.commentScream = (req, res) => {
    if (!req.body.body.trim())
        return res.status(400).json({ comment: 'Must not be empty' });

    const newComment = {
        screamId: req.params.screamId,
        body: req.body.body,
        userHandle: req.user.handle,
        userAvatar: req.user.avatarUrl,
        createdAt: new Date().toISOString(),
    };

    firestore
        .doc(`screams/${req.params.screamId}`)
        .get()
        .then(doc => {
            if (!doc.exists)
                return res.status(404).json({ error: 'Scream not found' });
            return doc.ref.update({
                commentCount: doc.data().commentCount + 1,
            });
        })
        .then(() => firestore.collection('comments').add(newComment))
        .then(doc => res.status(201).json({ commentId: doc.id, ...newComment }))
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};

exports.onScreamDelete = functions.firestore
    .document('/screams/{screamId}')
    .onDelete(snapshot => {
        const batch = firestore.batch();
        return firestore
            .collection('comments')
            .where('screamId', '==', snapshot.id)
            .get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(firestore.doc(`/comments/${doc.id}`));
                });
                return firestore
                    .collection('likes')
                    .where('screamId', '==', snapshot.id)
                    .get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(firestore.doc(`/likes/${doc.id}`));
                });
                return firestore
                    .collection('notifications')
                    .where('screamId', '==', snapshot.id)
                    .get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(firestore.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch(console.error);
    });
