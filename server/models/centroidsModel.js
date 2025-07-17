const mongoose = require('mongoose');

const CentroidSchema = new mongoose.Schema({
  clusterId: Number,
  vector: [Number],//normalized centroids
  rawVector: [Number],//denormalized realworld values
});

const Centroid = mongoose.model('Centroid', CentroidSchema);

module.exports = Centroid;
