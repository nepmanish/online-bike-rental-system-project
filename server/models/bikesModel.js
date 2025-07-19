const mongoose = require('mongoose');
const slugify = require('slugify');

// const validator = require('validator');


const bikeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Bike must have a name'],
      // unique: true,
      trim: true,
      maxlength: [40, 'a Bike name must have max 40 length charecters'],
    },
    slug: String,
    engineCC: {
      type: Number,
      required: [true, 'Bike must have engine cc'],
    },
    weight: {
      type: Number,
      require: [true, 'Bike must have weight'],
    },
    clusterId: Number,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1.0, 'ratings must be min 1.0'],
      max: [5.0, 'ratings must be max 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Bike must have price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount ({VALUE}) is greater than price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a Bike must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      // required: [true, 'a Bike must have a cover imgage'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretBike: {
      type: Boolean,
      default: false,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bikeSchema.virtual('weightPounds').get(function () {
  return this.weight * 2.2;
});

bikeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
bikeSchema.post('save', (doc, next) => {
  console.log(doc);
  next();
});
bikeSchema.pre('/^find/', function (next) {
  this.where({ secretBike: { $ne: true } }); //cuz other Bikes arenot set to false they don't have this field
  this.start = Date.now();
  next();
});
bikeSchema.post('/^find/', function (doc, next) {
  console.log(`query took ${Date.now() - this.start}millisecs`);
  console.log(doc);
  next();
});
bikeSchema.pre('aggregate', function (next) {
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretBike: { $ne: true } } });
  next();
});


const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
