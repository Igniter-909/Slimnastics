import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type:String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    DOB: {
        type: Date,
        required: true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    role:{
        type: String,
        enum: ['User', 'Admin','Trainer'],
        default: 'User'
    },
    joinDate: {
        type: Date,
        default: Date.now,
        required:true
    },
    avatar:{
        type: String
    }
},{timestamps: true})

const User = mongoose.Model('User', userSchema);

export default User;