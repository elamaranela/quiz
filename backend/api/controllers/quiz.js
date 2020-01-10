
/**
* @author     : Elamaran
* @description: Controller for the CRUD oerations on users
*/

const UserModel = require('../models/quiz');
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
exports.addUser = function (req, res) {
  let request = req.body.user;

  let newUser = new UserModel({
    _id: mongoose.Types.ObjectId(),
    name: {
        firstName: request.name.firstName ? request.name.firstName : undefined,
        lastName: request.name.lastName ? request.name.lastName : "",
    },
    level: request.level ? request.level : undefined,
    role: request.role,
    n1: request.n1 ? request.n1 : undefined,
    gender: request.gender,
    employeeId: request.employeeId ? request.employeeId : undefined,
    dob: request.dob ? utils.localMMDDYYYYToUTC(request.dob) : undefined,
    doj: request.doj ? utils.localMMDDYYYYToUTC(request.doj) : undefined,
    email: {
        personal: request.email ? request.email.personal : "",
        company:  request.email ? request.email.company : ""
    },
    phone: {
        personal: request.phone ? request.phone.personal : "",
        company:  request.phone ? request.phone.company : "",
        emergency: request.phone ? request.phone.emergency : ""
    },
    address: {
        present: request.address ? request.address.present : "",
        permanent: request.address ? request.address.permanent : ""
    },
    isActive: true,
    createdAt: moment.utc().format(),
    updatedAt: moment.utc().format()
  });

//   UserModel.findOne({employeeId: request.n1}).exec()
//         .then(users => {
//             if(users){
                newUser.save()
                    .then(result => {
                        if (result) {
                            logger.info('addUser: ' + constants.EMP_ADDED);
                            res.status(201).json({ message: constants.EMP_ADDED });
                        } else {
                            logger.error('addUser: ' + constants.INVALID_INPUT);
                            res.status(400).json({ message: constants.INVALID_INPUT });
                        }
                    })
                    .catch(function(err) {
                        logger.error('addUser: ' + err);
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

exports.createUserObject = function(userObj){
    return {
        name: {
            firstName: userObj.name.firstName,
            lastName: userObj.name.lastName,
        },
        level: userObj.level,
        role: userObj.role,
        n1: userObj.n1,
        gender: userObj.gender,
        employeeId: userObj.employeeId,
        dob: utils.UTCtoLocalMMDDYYYY(userObj.dob),
        doj: utils.UTCtoLocalMMDDYYYY(userObj.doj),
        email: {
            personal: userObj.email.personal,
            company:  userObj.email.company
        },
        phone: {
            personal: userObj.phone.personal,
            company:  userObj.phone.company,
            emergency: userObj.phone.emergency
        },
        address: {
            present: userObj.address.present,
            permanent: userObj.address.permanent
        }
    }
}
  
/**
   @method Fetches all/specific employee(s)
   @param req
   @param res
   Returns all active users with active subdetails.
   Returns specific user(isActive is not checked) with active subdetails.
  **/
exports.getUser = function (req, res) {
    let empId = req.params.id;
    let unwantedField = { createdAt:0, updatedAt:0, isActive:0, __v:0, _id:0 };
    if (empId)
        query = UserModel.findOne({employeeId: empId}, unwantedField);
    else
        query = UserModel.find({isActive: true}, unwantedField);

    query.exec()
        .then(response => {
            if (response) {
                var users = [];
                // findOne gives null or user object while find results array
                if(empId){
                    let userObj = exports.createUserObject(response);
                    users.push(userObj);
                }else{
                    response.map(user => {
                        let userObj = exports.createUserObject(user);
                        users.push(userObj);
                    })
                }
                logger.info('getUser: ' + constants.EMP_RETRIEVED);
                res.status(200).json({ message: constants.EMP_RETRIEVED, users: users });
            } else {
                res.status(404).json({ message: constants.EMP_UNAVAILABLE });
                logger.info('getUsers: ' + constants.RESP_EMPTY);
            }
        })
        .catch(err => {
            logger.error('getUser: ' + err);
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