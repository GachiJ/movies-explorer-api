const mongoose = require('mongoose');
const { urlPattern } = require('../meddlwares/validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlPattern.test(v),
      message: 'Неверный формат URL для image',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlPattern.test(v),
      message: 'Неверный формат URL для trailerLink',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlPattern.test(v),
      message: 'Неверный формат URL для thumbnail',
    },
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
