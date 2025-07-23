const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Bike = require('./models/bikesModel');
const User = require('./models/usersModel');
const Booking = require('./models/bookingsModel');
const Centroid = require('./models/centroidsModel');
const { recluster } = require('./utils/recluster');

dotenv.config({ path: './config.env' });

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

// Read JSON files
const bikes = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/bikes.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf-8'));

// Import data
const importData = async () => {
  try {
    console.log('Deleting existing data...');
    await Bike.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    await Centroid.deleteMany();

    console.log('Creating bikes...');
    await Bike.create(bikes);

    console.log('Creating users...');
    if (users.length > 0) {
      await User.create(users, { validateBeforeSave: false });
    }

    console.log('Creating admin user...');
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@bikerental.com',
      password: 'admin123',
      passwordConfirm: 'admin123',
      role: 'admin'
    });
    await adminUser.save({ validateBeforeSave: false });

    console.log('Creating regular user...');
    const testUser = new User({
      name: 'Test User',
      email: 'user@bikerental.com',
      password: 'user123',
      passwordConfirm: 'user123',
      role: 'user',
      preferences: {
        price: 2000,
        engineCC: 200,
        weight: 150
      }
    });
    await testUser.save({ validateBeforeSave: false });

    console.log('Clustering bikes...');
    const numClusters = await recluster(3);
    console.log(`Created ${numClusters} clusters`);

    console.log('Data imported successfully!');
    console.log('\n=== Login Credentials ===');
    console.log('Admin: admin@bikerental.com / admin123');
    console.log('User:  user@bikerental.com / user123');
    console.log('========================\n');
    
  } catch (err) {
    console.log('Error importing data:', err);
  }
  process.exit();
};

// Delete data
const deleteData = async () => {
  try {
    console.log('Deleting all data...');
    await Bike.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    await Centroid.deleteMany();
    console.log('Data deleted successfully!');
  } catch (err) {
    console.log('Error deleting data:', err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Usage:');
  console.log('  node setup.js --import   # Import sample data');
  console.log('  node setup.js --delete   # Delete all data');
  process.exit();
}