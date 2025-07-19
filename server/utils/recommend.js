const User = require('../models/usersModel');
const Bike = require('../models/bikesModel');
const Centroid = require('../models/centroidsModel');
const AppError = require('./appError');

function normalizeSingle(vec, min, max) {
  return vec.map((v, i) => (v - min[i]) / (max[i] - min[i] || 1));
}

function euclideanDistance(a, b) {
  return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
}

const recommend = async (userId, limit = 5) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  if (
    !user.preferences ||
    typeof user.preferences.price !== 'number' ||
    typeof user.preferences.engineCC !== 'number' ||
    typeof user.preferences.weight !== 'number'
  ) {
    throw new AppError('User preferences are missing or invalid goto /users/setPreferences', 400);
  }

  const bikes = await Bike.find();
  const validBikes = bikes.filter(b =>
    typeof b.price === 'number' &&
    typeof b.engineCC === 'number' &&
    typeof b.weight === 'number'
  );

  if (validBikes.length === 0) throw new AppError('No valid bikes to recommend', 404);

  const points = validBikes.map(b => [b.price, b.engineCC, b.weight]);

  const centroids = await Centroid.find();
  if (centroids.length === 0) throw new AppError('No centroids found', 500);

  const dims = points[0].length;
  const min = Array(dims).fill(Infinity);
  const max = Array(dims).fill(-Infinity);

  points.forEach(pt =>
    pt.forEach((v, i) => {
      min[i] = Math.min(min[i], v);
      max[i] = Math.max(max[i], v);
    })
  );

  const userVec = normalizeSingle(
    [user.preferences.price, user.preferences.engineCC, user.preferences.weight],
    min, max
  );

  let closest = centroids[0];
  let minDist = euclideanDistance(userVec, closest.vector);

  for (const c of centroids.slice(1)) {
    const d = euclideanDistance(userVec, c.vector);
    if (d < minDist) {
      minDist = d;
      closest = c;
    }
  }

  await User.findByIdAndUpdate(userId, { clusterId: closest.clusterId });

  const recommendations = await Bike.find({ clusterId: closest.clusterId })
    .sort({ price: 1 })
    .limit(limit);

  return recommendations;
};

module.exports = { recommend };
