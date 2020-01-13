
/**
* @author     : Elamaran
* @description: Controller for the CRUD oerations on users
*/

const quizModel = require('../models/quiz');
const mongoose = require('mongoose');
const constants = require('../utilities/constants');
const logger = require('../../utilities/logger');
const utils = require('../utilities/utils');
const moment = require('moment');
/**
  @method Inserts a new employee
  @param req
  @param res
 **/
exports.addQuestion = function (req, res) {
  let request = req.body;

  let newquest = new quizModel({
    _id: mongoose.Types.ObjectId(),
 
    questionName: request.questionName ? request.questionName : undefined,
    topicName: request.topicName,
    topicId: request.topicId ? request.topicId : undefined,
    options: request.options,
    isActive: true,
    answer:request.answer,
    createdAt: moment.utc().format(),
    updatedAt: moment.utc().format()
  });
  newquest.save().then(result => {
                        if (result) {
                            logger.info('addQuestion: ' + constants.QUESTION_ADDED);
                            res.status(201).json({ message: constants.QUESTION_ADDED });
                        } else {
                            logger.error('addQuestion: ' + constants.INVALID_INPUT);
                            res.status(400).json({ message: constants.INVALID_INPUT });
                        }
                    })
                    .catch(function(err) {
                        logger.error('addQuestion: ' + err);
                        res.status(400).json({ message: constants.INVALID_INPUT });
                    });
//             }
//             else{
//                 logger.error('addUser: Invalid N1');
//                 res.status(404).json({ message: "N1 employee not found" });
//             }
//         })
//         .catch(err => {
//             logger.error('addUser: ' + err);
//             res.status(400).json({ message: constants.INVALID_INPUT });
//         });
}

exports.createQuestionObject = function(questObj){
  console.log('hhi ',questObj)
return {
  topicName: questObj.topicName,
  topicId: questObj.topicId,
  questionName: questObj.questionName,
  options:questObj.options,
  answer:questObj.answer
}
}
  
/**
   @method Fetches all/specific employee(s)
   @param req
   @param res
   Returns all active users with active subdetails.
   Returns specific user(isActive is not checked) with active subdetails.
  **/
exports.getQuestion = function (req, res) {
    let topicId =req.params.id;
    let unwantedField = { createdAt:0, updatedAt:0, isActive:0, __v:0, _id:0 };
    if (topicId){
        // query = quizModel.find({topicId: topicId,isActive: true},unwantedField);
        query =  quizModel.aggregate([
          { $match: { isActive: true } },
          { $sample: { size: 1 } },
          {$limit : 2} 
      ]);
      // query = quizModel.aggregate([{ $match: { topicId: 1 } }]).pipeline();
    }
    else{
    query = quizModel.find({isActive: true}, unwantedField);
    }
    query.exec()
        .then(response =>  {
            if (response) {
                var questions = [];
                // findOne gives null or user object while find results array
                // if(questions){
                //     let questionsObj = exports.createQuestionObject(response);
                //     questions.push(questionsObj);
                // }else{
                    response.map(question => {
                        let questionsObj = exports.createQuestionObject(question);
                        questions.push(questionsObj);
                    })
                // }
                console.log(questions);
                logger.info('getQuestion: ' + constants.QUESTION_RETRIEVED);
                res.status(200).json({ message: constants.QUESTION_RETRIEVED, questions: questions });
            } else {
                res.status(404).json({ message: constants.QUESTION_UNAVAILABLE });
                logger.info('getQuestion: ' + constants.EMPTY);
            }
        })
        .catch(err => {
            logger.error('getQuestion: ' + err);
            res.status(400).json({ message: constants.INVALID_INPUT });
        });
}

/**
  @method Updates existing emloyee details
  @param req
  @param res
 **/
exports.updateUser = function (req, res) {
  let request = req.body;
  let userDetails = {};
  request.level ? userDetails.level = request.level : '';
  request.role ? userDetails.role = request.role : '';
  request.n1 ? userDetails.n1 = request.n1 : '';
  request.email ? userDetails.email = request.email : '';
  request.phone ? userDetails.phone = request.phone : '';
  request.address ? userDetails.address = request.address : '';
  userDetails.updatedAt = moment.utc().format();
  
  let updatedUser = new UserModel(userDetails);

  UserModel.findByIdAndUpdate(
    req.params.id, { $set: updatedUser }, { new: true }).exec()  
    .then(updateResponse => {
      if (updateResponse) {
        logger.error('updateUser: ' + req.params.id + ' - ' + constants.EMP_UPDATED);
        res.status(200).json({ message: constants.EMP_UPDATED });
      } else {
        res.status(400).json({ message: constants.EMP_UNAVAILABLE });
        logger.info('updateUser: ' + constants.EMP_UNAVAILABLE);
      }
    })
    .catch(err => {
      logger.error('updateUser: ' + err);
      res.status(500).json({ error: constants.UNEXPECTED_ERROR });
    });
}

/**
  @method Soft deletes existing employee
  @param req
  @param res
 **/
exports.deleteUser = function (req, res) {
    let updatedUser = new UserModel({
        isActive : false,
        updatedAt : moment.utc().format()
    });
  
    UserModel.findByIdAndUpdate(
      req.params.id, { $set: updatedUser }, { new: true }).exec()  
      .then(updateResponse => {
        if (updateResponse) {
          logger.error('updateUser: ' + req.params.id + ' - ' + constants.EMP_ERASED);
          res.status(200).json({ message: constants.EMP_ERASED });
        } else {
          res.status(400).json({ message: constants.EMP_UNAVAILABLE });
          logger.info('updateUser: ' + constants.EMP_UNAVAILABLE);
        }
      })
      .catch(err => {
        logger.error('updateUser: ' + err);
        res.status(500).json({ error: constants.UNEXPECTED_ERROR });
      });
  }
  exports.addBulkUser = function (req, res) {
    const errorList = req.IncorrectData; 
  UserModel.collection.insert(req.body,function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.info('%d Users were successfully stored.', docs.insertedCount);
        
        res.json({message: `${docs.insertedCount} Users were successfully stored.`, error:(errorList)?{message:`${errorList.length} users not inserted `,data:req.IncorrectData} :''})
      }
    });
}