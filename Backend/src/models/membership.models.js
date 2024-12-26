import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema ({
    plan:{
        type: String,
        required: true,
        enum: ['premium', 'standard','standard_cardio','cardio','zumba']
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: [String]
    },
    duration:{
        type: Number,
        required: true
    },
    participants:[
        {
            userId:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            startDate:{
                type: Date,
                required: true
            },
            endDate:{
                type: Date,
                required: true
            },
            status:{
                type: String,
                required: true,
                enum: ['active','inactive','cancelled']
            }
        }
    ]
},{timestamps: true});

const Membership = mongoose.Model('Membership',membershipSchema);

export default Membership;