const { celebrate, Joi } = require('celebrate');

const urlPattern = /^(http|https):\/\/(www\.)?([a-zA-Z0-9\-._~:/?#@!$&'()*+,;=]+#)?([a-zA-Z0-9\-._~:/?#@!$&'()*+,;=]+)$/;

const validationCreatUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlPattern),
  }),
});

const validationMovieById = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationCreatUser,
  validationLogin,
  validationUpdateUser,
  validationCreateMovie,
  validationMovieById,
};
