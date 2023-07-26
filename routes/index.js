const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login, getLogout } = require('../controllers/users');
const { validationCreatUser, validationLogin } = require('../meddlwares/validation');
const auth = require('../meddlwares/auth');
const NotFoundError = require('../meddlwares/errors/NotFoundError');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreatUser, createUser);

router.use(auth);
router.get('/logout', getLogout);
router.use(userRoutes);
router.use(movieRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

module.exports = router;
