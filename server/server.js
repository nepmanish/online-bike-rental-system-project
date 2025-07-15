const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  console.log(err.name, err.message, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(app.get('env'));

const db = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(db).then((con) => {
  console.log('db connection seccessfull');
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`listening to port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
