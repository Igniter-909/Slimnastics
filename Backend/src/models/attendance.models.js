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
        enum: ['Present','Absent','On Leave'],
        required: true,
        default: 'Absent'
    }
},{timestamps:true});

const Attendance = mongoose.model('Attendance',attendanceSchema);

export default Attendance;