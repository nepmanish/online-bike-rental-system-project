const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/toursModel');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(db).then((con) => {
  console.log('db connection seccessfull');
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/bikes.json`, 'utf-8'),
);

//create tours
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('tours created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete tours
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('tours deleted');
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
