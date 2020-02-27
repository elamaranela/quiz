/**
* @author     : Elamaran
* @description: result schema
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ResultSchema = new Schema({
    _id: Schema.Types.ObjectId,
    ref_Id: String,
    name:String,
    email:String,
    isActive: {
        type: Boolean,
        default: true
    },
    score:Number,
    timespent:Number,
    createdAt: Date,
});



module.exports = mongoose.model('result', ResultSchema);