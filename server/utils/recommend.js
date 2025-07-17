const User = require('../models/usersModel');
const Bike = require('../models/bikesModel');
const Centroid = require('../models/centroidsModel');

function normalizeSingle(vec, min, max) {
  return vec.map((v, i) => (v - min[i]) / (max[i] - min[i] || 1));
}

function euclideanDistance(a, b) {
  return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
}

async function recommend(userId, limit = 5) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.preferences || typeof user.preferences.price !== 'number') {
    throw new Error('User preferences are missing or invalid');
  }

  // Filter bikes with valid data
  const bikes = await Bike.find();
  const validBikes = bikes.filter(b =>
    typeof b.price === 'number' &&
    typeof b.engineCC === 'number' &&
    typeof b.weight === 'number'
  );

  if (validBikes.length === 0) throw new Error('No valid bikes to recommend');

  const points = validBikes.map(b => [b.price, b.engineCC, b.weight]);

  const centroids = await Centroid.find();
  if (centroids.length === 0) throw new Error('No centroids found');

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

  return await Bike.find({ clusterId: closest.clusterId })
    .sort({ price: 1 }) // or another criterion
    .limit(limit);
}

module.exports = { recommend };

