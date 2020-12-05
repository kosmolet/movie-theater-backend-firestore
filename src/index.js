const { connect } = require('./config/database');
const app = require('./server');

const PORT = process.env.PORT || 5005;

connect();
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
