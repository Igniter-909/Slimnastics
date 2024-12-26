import mongoose, { Schema } from 'mongoose';

const attendanceSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    checkin:{
        type: Date,
        required: true
    },
    checkout:{
        type: Date
    }
},{timestamps:true});

const Attendance = mongoose.Model('Attendance',attendanceSchema);

export default Attendance;