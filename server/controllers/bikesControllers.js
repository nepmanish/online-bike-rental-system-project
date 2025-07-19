const Bike = require('../models/bikesModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { recluster } = require('../utils/recluster');

exports.aliasTopBikes = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};

exports.getAllBikes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Bike.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const bikes = await features.query;

  res.status(200).json({
    status: 'success',
    results: bikes.length,
    data: bikes,
  });
});

exports.createBike = catchAsync(async (req, res, next) => {
  const newBike = await Bike.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newBike,
  });
});

exports.getBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.findById(req.params.id);
  //Bike.findOne({_id: req.params.id}) bts this happens
  if (!bike) {
    return next(new AppError('no bike found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: bike,
  });
});

exports.updateBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bike) {
    return next(new AppError('no bike found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: bike,
  });
});

exports.deleteBike = catchAsync(async (req, res, next) => {
  const bike = await Bike.findByIdAndDelete(req.params.id);
  if (!bike) {
    return next(new AppError('no bike found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getBikeStats = catchAsync(async (req, res, next) => {
  const stats = await Bike.aggregate([
    {
      $match: { ratingsAverage: { $gte: 2 } },
    },
    {
      $group: {
        _id: { $toUpper: '$clusterId' },
        numBikes: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        bikeNames: { $push: '$name' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: {_id: {$ne: 'EASY'}} //can repeat stages
    // },
  ]);
  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

exports.reclusterBikes = catchAsync(async (req, res, next) => {
  const k = parseInt(req.query.k) || 3; // optional dynamic k from query

  const numClusters = await recluster(k); // runs clustering

  res.status(200).json({
    status: 'success',
    message: `Clustering complete. ${numClusters} clusters created.`,
  });
});


