import mongoose, { Schema } from 'mongoose';

const progressSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    weight:{
        type: Number
    },
    height:{
        type: Number
    },
    bmi:{
        type: Number
    },
    fatPercent:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    },
    targetWeight:{
        type: Number
    }
},{timestamps: true});

const Progress = mongoose.Model('Progress', progressSchema);

export default Progress;