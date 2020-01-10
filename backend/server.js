/**
* @author     : Elamaran
* @description: server start page
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./utilities/logger');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fs = require('fs');
const connectionString = fs.readFileSync('./utilities/db.key', 'utf8');
const localDB = 'mongodb://'+process.env.DB_HOST+process.env.DB_NAME; 
mongoose.connect(localDB, {useNewUrlParser: true, useCreateIndex: true})  // , autoIndex: false }
    .then(connect => {
        console.log('People DB has connected');
        logger.info('People DB has connected');
    })
    .catch(error => {
        console.log("Error occured during DB connection");
        logger.info(error);
    });
    const allowCrossDomain = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept, Content-Length, X-Requested-With, X-Date');
      
        // intercept OPTIONS method
        if (req.method === 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
          return res.status(200).json({});
        }
        next();
      };
      app.use(allowCrossDomain);

      app.get('/', function (req, res) {
        res.status(200).json({ "message": "You are connected to Quiz API." });
        logger.info('Quiz API has connected');
      });
      require('./api/routes')(app, {});
      app.listen(port, () => {
        console.log('People Management app listening on port ' + port);
        logger.info('API server has created on port ' + port);
      });