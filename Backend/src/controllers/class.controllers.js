import Class from "../models/class.models";
import User from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const createClass = asyncHandler(async (req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(401, "User not found");
        }
        if(user.role !== "Trainer"){
            throw new ApiError(403, "Unauthorized to create a class");
        };

        const { name, description,startTime, endTime, capacity, date }  = req.body;

        const newClass = await Class.create({
            name,
            description,
            startTime,
            endTime,
            capacity,
            date: date,
            trainer: user._id
        })
        const createdClass = await Class.findById(newClass._id);
        if(!createdClass) {
            throw new ApiError(403,"Class couldn't be created")
        };
        return res
        .status(201)
        .json(new ApiResponse(
            201,
            createdClass,
            "Class created successfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while creating a class!!")
    }
})


const getClass = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params;
        const classData = await Class.findById(id)
        if(!classData) {
            throw new ApiError(404,"Class not found")
        };

        return res
        .status(201)
        .json(new ApiResponse(
            201,
            classData,
            "Fetched class data scuuessfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching class data!!")
    }
})

const updateClass = asyncHandler(async (req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(401, "User not found");
        }
        if(user.role !== "Trainer"){
            throw new ApiError(403, "Unauthorized to create a class");
        };
        const {id} = req.params;
        const { name, description,startTime, endTime, capacity, date }  = req.body;
        const classData = await Class.findById(id);
        if(!classData) {
            throw new ApiError(404,"Class not found")
        };
        if (!classData.trainerId.equals(user._id)) {
            throw new ApiError(403, "Unauthorized to update this class");
        }

        if (name) classData.name = name;
        if (description) classData.description = description;
        if (startTime) classData.startTime = startTime;
        if (endTime) classData.endTime = endTime;
        if (capacity) classData.capacity = capacity;
        if (date) classData.date = date;

        const updatedClass = await classData.save();
        
        return res
        .status(201)
        .json(new ApiResponse(
            201,
            updatedClass,
            "Class updated successfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while updating a class!!")
    }
})

const deleteClass = asyncHandler(async (req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(401, "User not found");
        }
        if(user.role!== "Trainer"){
            throw new ApiError(403, "Unauthorized to delete a class");
        };
        const {id} = req.params;
        const classData = await Class.findById(id);
        if(!classData) {
            throw new ApiError(404,"Class not found")
        };
        if (!classData.trainerId.equals(user._id)) {
            throw new ApiError(403, "Unauthorized to delete this class");
        }
        await classData.remove();
        
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Class deleted successfully"
        ))
        
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while deleting a class!!")
    }
});

const enrollUser = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(401, "User not found");
        }
        if(user.role!== "User"){
            throw new ApiError(403, "Unauthorized to enroll in a class");
        };
        const {id} = req.params;
        const classData = await Class.findById(id);
        if(!classData) {
            throw new ApiError(404,"Class not found")
        };
        if(classData.students.includes(user._id)){
            throw new ApiError(400,"User already enrolled in this class")
        };
        if(classData.capacity <= classData.students.length){
            throw new ApiError(400,"Class capacity reached")
        };
        classData.students.push(user._id);
        await classData.save();
        
        return res
        .status(201)
        .json(new ApiResponse(
            201,
            classData,
            "User enrolled successfully"
        ))
        
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while enrolling user in a class!!")
    }
})
const cancelEnrollment = asyncHandler( async(req,res) =>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(401, "User not found");
        }
        if(user.role!== "User"){
            throw new ApiError(403, "Unauthorized to cancel the enrollment");
        };
        const {id} = req.params;
        const classData = await Class.findById(id);
        if(!classData) {
            throw new ApiError(404,"Class not found")
        };
        if(!classData.students.includes(user._id)){
            throw new ApiError(400,"User not enrolled in this class")
        };
        const index = classData.students.indexOf(user._id);
        classData.students.splice(index, 1);
        await classData.save();
        
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            classData,
            "User cancelled the enrollment successfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while cancelling the enrollment")
    }
})

const getAvailableClass = asyncHandler( async(req,res) => {
    try {
        const {date} = req.query;
        const availableClasses = await Class.find({
            date: new Date(date).toUTCString(),
            capacity: {$gt: 0}
        });
        if(!availableClasses){
            throw new ApiError(404,"No available classes found on the given date")
        }
        return res
       .status(200)
       .json(new ApiResponse(
            200,
            availableClasses,
            "Fetched available classes successfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching available classes")
    }
})



export {
    createClass,
    getClass,
    updateClass,
    deleteClass,
    enrollUser,
    cancelEnrollment,
    getAvailableClass
}