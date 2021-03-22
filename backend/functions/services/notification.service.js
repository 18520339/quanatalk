const { firestore, functions } = require('../firebase');

exports.createNotificationOnLike = functions.firestore
    .document('likes/{id}')
    .onCreate(snapshot => {
        return firestore
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (
                    doc.exists && // Not notify on own like
                    doc.data().userHandle !== snapshot.data().userHandle
                )
                    return firestore.doc(`/notifications/${snapshot.id}`).set({
                        notificationId: snapshot.id,
                        screamId: doc.id,
                        sender: snapshot.data().userHandle,
                        recipient: doc.data().userHandle,
                        createdAt: new Date().toISOString(),
                        type: 'like',
                        read: false,
                    });
            })
            .catch(console.error);
    });

exports.createNotificationOnComment = functions.firestore
    .document('comments/{id}')
    .onCreate(snapshot => {
        return firestore
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (
                    doc.exists && // Not notify on own comment
                    doc.data().userHandle !== snapshot.data().userHandle
                )
                    return firestore.doc(`/notifications/${snapshot.id}`).set({
                        notificationId: snapshot.id,
                        screamId: doc.id,
                        sender: snapshot.data().userHandle,
                        recipient: doc.data().userHandle,
                        createdAt: new Date().toISOString(),
                        type: 'comment',
                        read: false,
                    });
            })
            .catch(console.error);
    });

exports.deleteNotificationOnUnlike = functions.firestore
    .document('likes/{id}')
    .onDelete(snapshot => {
        return firestore
            .doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(console.error);
    });

exports.markNotificationsRead = (req, res) => {
    const batch = firestore.batch();
    req.body.forEach(notificationId => {
        const notificationDoc = firestore.doc(
            `/notifications/${notificationId}`
        );
        batch.update(notificationDoc, { read: true });
    });
    batch
        .commit()
        .then(() => {
            return res.status(200).json({
                message: 'Notifications marked read',
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};
