'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(require('../route/product-router.js'));
app.use(require('../lib/error-handler.js'));

app.use(cors());
app.use(morgan());

const serverControl = (module.exports = {});

serverControl.start = () => {
  return new Promise(resolve => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverControl.stop = () => {
  return new Promise(resolve => {
    server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    });
  });
};
