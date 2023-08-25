const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { validationCreateMovie, validationMovieById } = require('../meddlwares/validation');

router.get('/movies', getMovies);

router.post('/movies', validationCreateMovie, createMovie);

router.delete('/movies/:_id', validationMovieById, deleteMovieById);

module.exports = router;
