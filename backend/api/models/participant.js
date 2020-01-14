/**
* @author     : Elamaran
* @description: User schema
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParticipantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name:String,
    email:String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
});



module.exports = mongoose.model('participant', ParticipantSchema);