const mongoose = require('mongoose');
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { recommend } = require('../utils/recommend');
const validateAndFindUser = require('../utils/validateAndFindUser');
const { findByIdAndDelete } = require('../models/centroidsModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)create error is user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route is not for password updates. Please use /updateMyPassword',
        400,
      ),
    );
  }
  //2) filter out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  //3)update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = catchAsync(async(req, res) => {
    const { id } = req.body;
    const user = await validateAndFindUser(id);
    res.status(200).json({
      status: 'success',
      data: { user },
    });
});

exports.updateUser = catchAsync(async(req, res) => {
    const { id } = req.body;
    const user = await validateAndFindUser(id);
    user.name = req.body.name;
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    const updatedUser = await user.save();
    res.status(200).json({
      status: 'success',
      data: { updatedUser },
    });
});

exports.deleteUser = catchAsync(async(req, res) => {
    const { id } = req.body;
    await findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
});

exports.setPreferences = catchAsync(async (req, res, next) => {
      const { price, engineCC, weight } = req.body;
      if(!price && !engineCC && !weight) {
        return next(new AppError('please provide price, engineCC and weight you prefer', 400));
      }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        'preferences.price': price,
        'preferences.engineCC': engineCC,
        'preferences.weight': weight,
      },
      { new: true, runValidators: true }
    );
      res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

exports.recommendBikes = exports.getRecommendations = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 5;

  const bikes = await recommend(userId, limit);

  res.status(200).json({
    status: 'success',
    results: bikes.length,
    data: {
      bikes
    }
  });
});



