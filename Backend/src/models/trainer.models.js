import mongoose, { Schema, Model } from "mongoose";

const trainerSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    expertise:{
        type: String,
        required: true
    },
    experience:{
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\+[1-9]\d{1,14}$/.test(value),
            message: "Invalid phone number. Please use a valid international phone number format."
        }
    },
    workingHours: {
        type: String,
        required: true
    },
    picture:{
        type: String
    }
},{timestamps: true});

const Trainer = Model('Trainer', trainerSchema);

export default Trainer;