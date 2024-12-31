import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema ({
    plan:{
        type: String,
        required: true
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
    }
},{timestamps: true});

const Membership = mongoose.model('Membership',membershipSchema);

export default Membership;