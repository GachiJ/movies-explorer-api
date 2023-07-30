const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./meddlwares/error-handler');
const { errorLogger, requestLogger } = require('./meddlwares/logger');
const limiter = require('./meddlwares/rateLimiter');
const { DB_URL, PORT } = require('./utilits/constants');

const app = express();
app.use(helmet());
app.use(limiter);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cors({
  credentials: true,
  origin: 'https://diplomfront.nomoredomains.xyz',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
