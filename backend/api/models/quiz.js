/**
* @author     : Elamaran
* @description: User schema
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const QuizSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        firstName:{
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: String
    },
    level: {
        type: String,
        required: [true, 'Level is required'],
    },
    role: {
        type: Number, 
        required: [true, 'Role is required'],
        validate: {
            validator: function(v) {
                return /^[1-5]$/.test(v);
            },
            message: 'Invalid role value'
          }
    },
    n1: { 
        type: String,
        required: [true, 'N1 employee ID is required'],
    },
    gender: {
        type: String, 
        enum: ["Female", "Male", "Other"], 
        required: [true, 'Gender is required'],
    },
    employeeId: {
        type: String,
        required: [true, 'Employee ID is required'],
    },
    dob: {
        type: Date,
        required: [true, 'DOB is required in MM-DD-YYYY format'],
    },
    doj: {
        type: Date,
        required: [true, 'DOJ is required in MM-DD-YYYY format'],
    },
    email: {
        personal: String,
        company: String
    },
    phone: {
        personal: String,
        company: String,
        emergency: String
    },
    address: {
        present: String,
        permanent: String
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

userSchema.index({
    employeeId: 1
  }, {
    unique: true,
  });

module.exports = mongoose.model('User', userSchema);