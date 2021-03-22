const app = require('express')();
const cors = require('cors');
const functions = require('./firebase').functions;

const screamRoute = require('./routes/scream.routes');
const userRoute = require('./routes/user.routes');
const notificationRoute = require('./routes/notification.routes');

const { onScreamDelete } = require('./services/scream.service');
const { onAvatarChange } = require('./services/user.service');
const {
    createNotificationOnLike,
    createNotificationOnComment,
    deleteNotificationOnUnlike,
} = require('./services/notification.service');

app.use(cors());
app.use('/', screamRoute);
app.use('/', userRoute);
app.use('/', notificationRoute);

exports.api = functions.https.onRequest(app);
exports.onScreamDelete = onScreamDelete;
exports.onAvatarChange = onAvatarChange;
exports.createNotificationOnLike = createNotificationOnLike;
exports.createNotificationOnComment = createNotificationOnComment;
exports.deleteNotificationOnUnlike = deleteNotificationOnUnlike;
