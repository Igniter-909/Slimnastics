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
        type: String,
        required: true
    },
    endTime:{
        type: String,
        required: true
    },
    date:{
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
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{timestamps: true});

const Class = mongoose.model('Class', classSchema);

export default Class;