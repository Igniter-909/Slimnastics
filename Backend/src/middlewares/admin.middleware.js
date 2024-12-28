import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";


const verifyAdmin = asyncHandler ( async (req,_,next) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(401, "Unauthorized User")
        }
        if(user.role !== "Admin"){
            throw new ApiError(401, "Unauthorized User")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(500,error?.message || "Unauthorized User")
    }
})
export default verifyAdmin;