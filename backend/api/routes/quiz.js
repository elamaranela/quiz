/**
* @author     : Elamaran
* @description: Users route
*/

const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz');
const requestValidator = require('../middlewares/requestValidator');

router.get('/', quizController.getQuize);
router.post('/', requestValidator.addOne, quizController.addquiz);

module.exports = router;