const mongoose = require('mongoose');
const AppError = require('./appError');
const User = require('../models/usersModel');

const validateAndFindUser = async (id) => {
  if (!id) {
    throw new AppError('User ID must be provided in the request body', 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID format', 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError('No user found with that ID', 404);
  }

  return user;
};

module.exports = validateAndFindUser;
