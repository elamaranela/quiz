
/**
* @author     : Pawan Kumar
* @description: Middleware to validate the request params.
*/

const constants = require('../utilities/constants');
const logger = require('../../utilities/logger');
const utils = require('../utilities/utils');

/**
  @method Validates the parameters for the add user API
  @param req
  @param res
  @param next
 **/
exports.addOne = function(req, res,next){
    try{
        let request = req.body.user;
        let errorObj = {};
        var userValue = ''; // variable to store current value of user detail
        // Validating name field
        if(request.name){
            userValue = request.name.firstName;
            if(typeof userValue === "string"){
                request.name.firstName = userValue.trim();
            }
            userValue = request.name.lastName;
            if(typeof userValue === "string"){
                request.name.lastName = userValue.trim();
            }
        }
        else{
            errorObj.name = "User name is not provided";
        }
        // Validating level field
        userValue = request.level;
        if(typeof userValue === "string"){
            request.level = userValue.trim();
        }
        // Validating n1 field
        userValue = request.n1;
        if(typeof userValue === "string"){
            request.n1 = userValue.trim();
        }
        // Validating gender field
        userValue = request.gender;
        if(typeof userValue === "string"){
            request.gender = userValue.trim();
        }
        // Validating employeeId field
        userValue = request.employeeId;
        if(typeof userValue === "string"){
            request.employeeId = userValue.trim();
        }
        // Validating dob field
        userValue = request.dob;
        if(typeof userValue === "string"){
            let valid = userValue.trim() ? utils.isDateFormat(userValue.trim()) : true;
            valid ? request.dob = userValue.trim() : errorObj.dob = "Invalid date";
        }
        // Validating doj field
        userValue = request.doj;
        if(typeof userValue === "string"){
            let valid = userValue.trim() ? utils.isDateFormat(userValue.trim()) : true;
            valid ? request.doj = userValue.trim() : errorObj.doj = "Invalid date";
        }
        // Validating email field
        if(request.email){
            userValue = request.email.personal;
            if(typeof userValue === "string"){
                userValue = userValue.trim();
                let valid = userValue.length ? utils.isEmailFormat(userValue) : true;
                valid ? request.email.personal = userValue : errorObj.mail = "Invalid mail id";
            }
            userValue = request.email.company;
            if(typeof userValue === "string"){
                userValue = userValue.trim();
                let valid = userValue.length ? utils.isEmailFormat(userValue) : true;
                valid ? request.email.company = userValue : errorObj.mail = "Invalid mail id";
            }
        }
        // Validating name field
        if(request.phone){
            userValue = request.phone.personal;
            if(typeof userValue === "string"){
                request.phone.personal = userValue.trim();
            }
            userValue = request.phone.company;
            if(typeof userValue === "string"){
                request.phone.company = userValue.trim();
            }
            userValue = request.phone.emergency;
            if(typeof userValue === "string"){
                request.phone.emergency = userValue.trim();
            }
        }
        // Validating name field
        if(request.address){
            userValue = request.address.present;
            if(typeof userValue === "string"){
                request.address.present = userValue.trim();
            }
            userValue = request.address.permanent;
            if(typeof userValue === "string"){
                request.address.permanent = userValue.trim();
            }
        }
        if(Object.keys(errorObj).length){
            logger.error('requestValidator addOne: '+ JSON.stringify(errorObj));
            res.status(400).json({ message: errorObj });
            return;
        }
        else
            next();

    }catch(err){
        logger.error('requestValidator addOne catch: ' + err);
        res.status(400).json({ message: constants.INVALID_INPUT });
        return;
    }
},

/**
  @method Validates the employee Id params
  @param req
  @param res
  @param next
 **/
exports.getOne = function(req, res,next){
    let empId = req.params.id;
    
    if(typeof empId === "string" && empId.trim()){
        req.params.id = empId.trim();
        next();
    }
    else{
        logger.error('requestValidator getOne: Invalid employee Id');
        res.status(400).json({ message: constants.INVALID_INPUT });
        return;
    }
}