import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.models.js";

const verifyJWT = asyncHandler( async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token) {
            throw new ApiError(401,"Unauthorized User");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user) {
            throw new Error(401,"User not found");
        }

        req.user = user;
        next();


    } catch (error) {
        throw new ApiError(400,error?.message || "Something went wrong!!");
    }
});

export default verifyJWT;