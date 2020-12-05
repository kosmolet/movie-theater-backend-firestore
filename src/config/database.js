const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

const db = new Firestore({
  keyFilename: path.join(__dirname, '../config/credentials.json'),
});

module.exports = { db };
