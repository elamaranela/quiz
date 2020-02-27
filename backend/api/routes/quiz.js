/**
* @author     : Elamaran
* @description: Users route
*/

const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz');
const requestValidator = require('../middlewares/requestValidator');

router.get('/:id', quizController.getQuestion);
router.get('/', quizController.getQuestion);
router.post('/',  quizController.addQuestion);
router.post('/addparticipant',  quizController.addparticipant);
router.post('/UpdateOutput',  quizController.UpdateOutput);

module.exports = router;