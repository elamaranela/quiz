/**
* @author     : Elamaran
* @description: Utility methods
*/

const moment = require('moment');

module.exports = {


  // parse and return string value
  parseString(value){
    if(typeof value === "string"){
       return value.trim();
    }
    return '';
   },

   // checks MM-DD-YYYY format with leap dates
   isDateFormat(dateString){
        // let regEx = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
        let regEx = /^((0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-[12]\d{3})$/;
        if(!dateString.match(regEx)) return false; 
        dateString = moment(dateString, 'MM-DD-YYYY').format('YYYY-MM-DD');
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
   },

   isEmailFormat(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  
  isPhoneFormat(phone) {
    var re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    return re.test(phone);
  },

  // Change local MM-DD-YYYY format to UTC format
  localMMDDYYYYToUTC(dateString) {
    if(moment(dateString, 'MM-DD-YYYY').isValid()){
        let date = moment(dateString, 'MM-DD-YYYY'); // get date in MM-DD-YYYY local format
        return date.utc().format(); // change local to UTC format
    }
    return 'Invalid Date';
  },

   // Change UTC format to local MM-DD-YYYY format
   UTCtoLocalMMDDYYYY(utcString) {
    let local = moment.utc(utcString).local().format("MM-DD-YYYY"); // UTC to local MM-DD-YYYY format
    return local;
  }
}