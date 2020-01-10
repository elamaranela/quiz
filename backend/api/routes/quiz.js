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

router.get('/:id', requestValidator.getOne, userController.getUser);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Skill related APIs
/*
router.get('/:id/skills', skillController.getUserSkill);
router.post('/:id/skills', skillController.addUserSkill);
router.put('/:id/skills/:skillId', skillController.updateUserSkill);
router.delete('/:id/skills/:skillId', skillController.deleteUserSkill);
*/

module.exports = router;