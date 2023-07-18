const router = require('express').Router();
const { validationUpdateUser } = require('../meddlwares/validation');

const { upDateUser, getUserInfo } = require('../controllers/users');

router.get('/users/me', getUserInfo);

router.patch('/users/me', validationUpdateUser, upDateUser);

module.exports = router;