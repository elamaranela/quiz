/**
* @author     : Elamaran
* @description: User schema
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuizSchema = new Schema({
    _id: Schema.Types.ObjectId,
    topicName:String,
    topicId:{type:Number,
        required: [true, 'topicId is required']
    },
    questionName: {
            type: String,
            required: [true, 'question is required'],
        },
        questionId:Number,
    options: {
        type: Array
    },
    answer:{
        type:Array,
        required: [true, 'Answer is required'],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    updatedAt: Date,
    createdBy: { 
        type: [{ type: Schema.Types.ObjectId, ref: this }],
        default: undefined
    },
    updatedBy: {
        type: [{ type: Schema.Types.ObjectId, ref: this }],
        default: undefined
    }
});



module.exports = mongoose.model('questions', QuizSchema);