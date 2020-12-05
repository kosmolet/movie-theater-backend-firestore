const db = require('./config/database');
const app = require('./server');

const PORT = process.env.PORT || 5005;

if (db) {
  // eslint-disable-next-line no-console
  console.log('Connected to Firestore');
}

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
