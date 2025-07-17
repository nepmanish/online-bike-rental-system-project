const kmeans = require('node-kmeans');
const Bike = require('../models/bikesModel');
const Centroid = require('../models/centroidsModel');

function normalizePoints(points) {
  const dims = points[0].length;
  const min = Array(dims).fill(Infinity);
  const max = Array(dims).fill(-Infinity);

  points.forEach(pt =>
    pt.forEach((v, i) => {
      if (typeof v !== 'number') throw new Error(`Non-numeric value: ${v}`);
      min[i] = Math.min(min[i], v);
      max[i] = Math.max(max[i], v);
    })
  );

  const normPoints = points.map(pt =>
    pt.map((v, i) => (v - min[i]) / (max[i] - min[i] || 1))
  );

  return { normPoints, min, max };
}

async function runClustering(k = 3) {
  const bikes = await Bike.find();

  if (bikes.length < k) {
    console.log('Not enough bikes to cluster.');
    return;
  }

  const features = ['price', 'engineCC', 'weight'];
  const rawPoints = bikes.map(bike =>
    features.map(f => {
      const val = bike[f];
      if (typeof val !== 'number') throw new Error(`Invalid ${f} in bike`);
      return val;
    })
  );

  const { normPoints, min, max } = normalizePoints(rawPoints);

  return new Promise((resolve, reject) => {
    kmeans.clusterize(normPoints, { k }, async (err, results) => {
      if (err) return reject(err);

      try {
        await Centroid.deleteMany({});

        for (let i = 0; i < results.length; i++) {
          const cluster = results[i];

          await Centroid.create({
            clusterId: i,
            vector: cluster.centroid,
            rawVector: cluster.centroid.map((v, j) => v * (max[j] - min[j]) + min[j]),
          });

          await Promise.all(cluster.clusterInd.map(async idx => {
            bikes[idx].clusterId = i;
            await bikes[idx].save();
          }));
        }

        console.log(`Clustering complete: ${results.length} clusters created.`);
        resolve(results.length);
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = { runClustering };
