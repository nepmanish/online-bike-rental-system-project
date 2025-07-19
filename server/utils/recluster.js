const kmeans = require('node-kmeans');
const Bike = require('../models/bikesModel');
const Centroid = require('../models/centroidsModel');
const AppError = require('./appError');

function normalizePoints(points) {
  const dims = points[0].length;

  const min = Array(dims).fill(Infinity); // returns [Infinity, Infinity, Infinity]
  const max = Array(dims).fill(-Infinity); // returns [-Infinity, -Infinity, -Infinity]

  // find min and max for all feature dimensions
  points.forEach(pt =>
    pt.forEach((v, i) => {
      min[i] = Math.min(min[i], v);
      max[i] = Math.max(max[i], v);
    })
  );

  // normalize using (value - min) / (max - min) — || 1 prevents divide-by-zero
  const normPoints = points.map(pt =>
    pt.map((v, i) => (v - min[i]) / (max[i] - min[i] || 1))
  );

  return { normPoints, min, max };
}

const recluster = async (k = 3) => {
  const bikes = await Bike.find();

  if (bikes.length < k) {
    throw new AppError(`Need at least ${k} bikes to perform clustering`, 409);
  }

  const features = ['price', 'engineCC', 'weight'];
  const rawPoints = bikes.map(bike => features.map(f => bike[f]));

  const { normPoints, min, max } = normalizePoints(rawPoints);

  return new Promise((resolve, reject) => {
    kmeans.clusterize(normPoints, { k }, async (err, results) => {
      if (err) return reject(new AppError('Clustering failed: ' + err.message, 500));

      try {
        await Centroid.deleteMany({}); // remove previous centroids if any

        for (let i = 0; i < results.length; i++) {
          const cluster = results[i]; // each cluster has centroid, cluster[], clusterInd[]

          await Centroid.create({
            clusterId: i,
            vector: cluster.centroid,
            rawVector: cluster.centroid.map(
              (v, j) => v * (max[j] - min[j]) + min[j] // denormalize to get original values
            ),
          });

          // assign bikes to the new cluster and save
          await Promise.all(
            cluster.clusterInd.map(async idx => {
              bikes[idx].clusterId = i;
              await bikes[idx].save();
            })
          );
        }

        // clustering successful — resolve with number of clusters created
        resolve(results.length);
      } catch (e) {
        reject(new AppError('Failed to save clustering results', 500));
      }
    });
  });
};

module.exports = { recluster };
