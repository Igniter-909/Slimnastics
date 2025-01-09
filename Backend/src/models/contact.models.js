import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    type:{
        type: String,
        required: true,
        enum: ['Help','Suggestion','Feedback','Complaint']
    },
    message:{
        type: String,
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
