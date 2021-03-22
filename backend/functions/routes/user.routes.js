const express = require('express');
const router = express.Router();

const {
    signUp,
    signIn,
    getMe,
    getUserByHandle,
    editUserInfos,
    uploadAvatar,
} = require('../services/user.service');
const { validateSignUp, validateSignIn } = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth');

router.get('/user/me', authenticate, getMe);
router.get('/user/:handle', getUserByHandle);
router.post('/user', authenticate, editUserInfos);
router.post('/user/avatar', authenticate, uploadAvatar);

router.post('/user/signup', validateSignUp, signUp);
router.post('/user/signin', validateSignIn, signIn);
module.exports = router;
