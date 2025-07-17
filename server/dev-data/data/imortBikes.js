const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bike = require('../../models/bikesModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const db = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(db).then((con) => {
  console.log('db connection seccessfull');
});

const bikes = JSON.parse(
  fs.readFileSync(`${__dirname}/bikes.json`, 'utf-8'),
);

//create bikes
const importData = async () => {
  try {
    await Bike.create(bikes);
    console.log('bikes created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete bikes
const deleteData = async () => {
  try {
    await Bike.deleteMany();
    console.log('bikes deleted');
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
