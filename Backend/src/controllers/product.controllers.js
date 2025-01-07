import Product from "../models/products.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';


// Add a Product
const addProduct = asyncHandler(async (req, res) => {
    const { name, originalPrice, newPrice, description, mfgDate, expiryDate, rating, company, category, size,flavor  } = req.body;

    // Upload image to Cloudinary
    const imagePath = req.files?.image[0].path;
    if (!imagePath) {
        throw new ApiError(400, "No image provided");
    }
    const image = await uploadOnCloudinary(imagePath);
    if(!image){
        throw new ApiError(400, "Invalid image");
    }

    const formattedMFG = new Date(mfgDate);
    const formattedEXP = new Date(expiryDate);
        

    const product = await Product.create({
        name,
        originalPrice,
        description,
        mfgDate: formattedMFG,
        expiryDate: formattedEXP,
        rating,
        company,
        category,
        size,
        flavor,
        newPrice,
        image: image.secure_url,
    })
    const createdProduct = await Product.findById(product._id);
    if(!createdProduct){
        throw new ApiError(400,"Product wasn't added");
    }

    return res.status(200)
        .json(new ApiResponse(
            201,
            createdProduct,
            'Product created successfully'
        ))
});

// Get all Products or by ID
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new ApiError(404, "Product not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            product,
            'Product fetched successfully'
        ));
});

const getAllProducts = asyncHandler( async(_,res) => {
    try {
        const products = await Product.find({});
        if(!products){
            throw new ApiError(404, "No products found");
        }
        return res.status(200).json(new ApiResponse(
            200,
            products,
            'Products fetched successfully'
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong in fetching the products");
    }
})

// Update a Product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {name,originalPrice,newPrice,rating,mfgDate,expiryDate,company,size,category,flavor,description} = req.body;
    const formattedMFG = new Date(mfgDate);
    const formattedEXP = new Date(expiryDate);

    const updatedProduct = await Product.findByIdAndUpdate(id, {
        name,
        originalPrice,
        newPrice,
        rating,
        mfgDate: formattedMFG,
        expiryDate: formattedEXP,
        company,
        size,
        category,
        flavor,
        description,
    }, { new: true, runValidators: true });
    if (!updatedProduct) throw new ApiError(400,'Product not found');

    res.status(200).json(new ApiResponse(
        200,
        updatedProduct,
        'Product updated successfully'
    ));
});

// Delete a Product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ApiError(400,'Product not found');

    res.status(200).json(new ApiResponse(
        200,
        product,
        'Product deleted successfully'
    ));
});

export {
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
 };

