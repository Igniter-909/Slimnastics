import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        lowercase: true,
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
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})


userSchema.pre('save', async function (next) {

    if(!this.modified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)

    next();
});

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}


const User = mongoose.Model('User', userSchema);

export default User;