import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    amount: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    transactionId:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:['pending', 'completed', 'failed']
    }

},{timestamps: true});

const Payment = mongoose.Model('Payment', paymentSchema);


export default Payment;