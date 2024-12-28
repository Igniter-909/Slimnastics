import Progress from "../models/progress.models";
import User from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const addProgress = asyncHandler( async (req,res ) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) {
            throw new ApiError(404, "User not found");
        }
        const { weight, height,fatPercent, date, targetWeight } = req.body;
        if(weight <=0 || height <=0 || targetWeight <=0 || fatPercent <=0){
            throw new ApiError(400, "Invalid weight, height, target weight, or fat percent");
        }
        const bmi = weight / (height * height);

        const progress = await Progress.create({
            userId: user._id,
            weight,
            height,
            bmi,
            fatPercent,
            date,
            targetWeight
        });

        const createdProgress = await Progress.findById(progress._id);
        if(!createdProgress){
            throw new ApiError(400, "Failed to add progress");
        }
        res.status(201).json(new ApiResponse(
            200,
            createdProgress,
            "Progress added successfully"
        ));
    } catch (error) {
        throw new ApiError(500,error?.message|| "Something went wrong during adding a progress")
    }
})

const getProgress = asyncHandler(async (req, res ) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user) {
            throw new ApiError(404, "User not found");
        }
        const progress = await Progress.find({ userId: user._id }).sort({date: -1});
        if(!progress){
            throw new ApiError(404, "No progress found for this user");
        }
        res.status(200).json(new ApiResponse(
            200,
            progress,
            "Progress retrieved successfully"
        ));
    } catch (error) {
        throw new ApiError(500,error?.message|| "Something went wrong during retrieving progress")
    }
})

export {
    addProgress,
    getProgress,
 };