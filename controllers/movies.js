const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../meddlwares/errors/BadRequestError');
const NotFoundError = require('../meddlwares/errors/NotFoundError');
const ForbiddenError = require('../meddlwares/errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    return next(new BadRequestError('Недействительный идентификатор фильма'));
  }

  return Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найдена');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не имеете права удалять чужой фильм');
      }

      return Movie.findByIdAndDelete(req.params._id);
    })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  deleteMovieById,
  createMovie,
};
