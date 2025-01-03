import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    originalPrice:{
        type: Number,
        required: true
    },
    salePrice:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    mfgDate: {
        type: Date,
        required: true
    },
    expiryDate:{
        type: Date,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        maxValue: 5
    },
    company:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    flavor:{
        type: String
    },
    size:{
        type: String
    },
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;