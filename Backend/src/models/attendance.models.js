import mongoose, { Schema } from 'mongoose';

const attendanceSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    status:{
        type:String,
        enum: ['Present','Ansent','On Leave'],
        required: true
    },
    remarks:{
        type: Number,
        required: true,
        minvalue: 1,
        maxvalue: 10
    }
},{timestamps:true});

const Attendance = mongoose.model('Attendance',attendanceSchema);

export default Attendance;