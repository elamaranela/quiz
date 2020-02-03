/**
* @author     : Elamaran
* @description: Users route
*/

const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/uploads');
const quizController = require('../controllers/quiz');


router.post('/onetimeupload', uploadController.onetimeupload, quizController.addBulk);

module.exports = router;