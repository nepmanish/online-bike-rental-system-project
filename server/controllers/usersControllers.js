const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

exports.createUser = (_req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};

exports.getUser = (_req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};

exports.updateUser = (_req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};

exports.deleteUser = (_req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};
