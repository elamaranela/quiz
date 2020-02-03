/**
* @author     : Elamaran
* @description: user uploade validation
*/
const mongoose = require('mongoose');
const UserModel = require('../models/quiz');
const logger = require('../../utilities/logger');
const utils = require('../utilities/utils');
const moment = require('moment');

exports.validator = async (userObj) => {

  const saveStatus = userObj.filter((data) => data.answer !== '').map(async (request) => {
   const questions={
    questionName: request.question ? request.question : undefined,
    topicName: request.topic,
    topicId: request.topic ? request.topic : undefined,
    options: [request.a,request.b,request.c,request.d],
    isActive: true,
    questionId:request.questionId ? request.questionId : undefined,
    answer:request.answer,
    createdAt: moment.utc().format(),
    updatedAt: moment.utc().format(),
};
return questions
   
  });
 
  return  await Promise.all(saveStatus)
}

validate = async (data) => {
  try {
    const isEmpIdExit = await validateEmpId(data.employeeId);
    if (isEmpIdExit) {
      // const emailCheck = await validateEmail(data.email);
      data.type = 'questions';
     
      return data;
    }
  }
  catch (e) {
    data.type = 'error';
   
    data.errormessage = e.message;

    return data;
  }

}

validateEmpId = (empId) => {
  return new Promise((resolve, reject) => {
    UserModel.find({ employeeId: empId }, function (err, doc) {
      if (err) {
        throw err;
      }
      if (doc.length === 0) {
        resolve(true);
      }
      reject(new Error('Duplicates records found'));
    });
  })
}

validateEmail = (emailId) => {

}




