const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../models/usersModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const db = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(db).then((con) => {
  console.log('db connection seccessfull');
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'),
);

//create Users
const importData = async () => {
  try {
    await User.create(users);
    console.log('Users created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete Users
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Users deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
