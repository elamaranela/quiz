
/**
* @author     : Pawan Kumar
* @description: Middleware to generate/validate session.
*/

const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./utilities/session.key', 'utf8');
const logger = require('../../utilities/logger');
const constants = require('../utilities/constants');

/**
  @method Generates new session for login the user
  @param [payload] User cred
 **/
exports.generate = function (payload) {
    let token = jwt.sign(payload, privateKey,
        {
            expiresIn: 3600 // In seconds
        }
    );
    return token;
}

/**
  @method Generates new session for login the user
  @param req
  @param res
  @param next
 **/
exports.validate = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        jwt.verify(token, privateKey, function (err, decoded) {
            if (err) {
                logger.error('validateSession: ' + constants.INVALID_SESSION);
                res.status(400).send({ message: constants.INVALID_SESSION });
                return;
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        logger.error('validateSession: ' + constants.INVALID_SESSION);
        res.status(400).send({ message: constants.INVALID_SESSION });
        return;
    }
}