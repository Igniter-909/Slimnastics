import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    },
    capacity:{
        type: Number,
        required: true
    },
    trainer:{
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true
    },
    students:[
        {
            name:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status:{
                type: String,
                enum: ['Enrolled', 'Cancelled'],
                default: 'Enrolled'
            }
        }
    ]
},{timestamps: true});

const Class = mongoose.model('Class', classSchema);

export default Class;