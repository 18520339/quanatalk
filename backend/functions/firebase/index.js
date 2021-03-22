const functions = require('firebase-functions').region('asia-southeast2');
const firebase = require('firebase').default;
const admin = require('firebase-admin');
const config = require('./config');

firebase.initializeApp(config);
admin.initializeApp();
const firestore = admin.firestore();

module.exports = { admin, firebase, firestore, functions };
