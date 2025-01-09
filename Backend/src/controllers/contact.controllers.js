import Contact from "../models/contact.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// add comeent
const addContact = asyncHandler( async(req,res) => {
    try {
        
        const {firstName, lastName, type, phoneNumber, email, message}  = req.body;
        const newContact = await Contact.create({
            firstName,
            lastName,
            type,
            phoneNumber,
            email,
            message
        });
        const createdContact = await Contact.findById(newContact._id);
        if(!createdContact) {
            throw new ApiError(403,"Contact couldn't be created")
        };
    
        return res
        .status(201)
        .json(new ApiResponse(
            200,
            createdContact,
            "Feedback sent successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while adding a feedback");
    }
})

export {
    addContact,
};