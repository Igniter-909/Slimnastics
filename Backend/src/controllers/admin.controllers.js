import Attendance from "../models/attendance.models.js";
import Progress from "../models/progress.models.js";
import Membership from "../models/membership.models.js";
import Product from "../models/products.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import moment from 'moment';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Contact from "../models/contact.models.js";

const getAllUsers = asyncHandler( async(req,res) => {
    try {
        const users = await User.find({});
        if(users.length <= 0){
            throw new ApiError(404, "No users found");
        }
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                users,
                "Users fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch all users")
    }
})

const removeUser = asyncHandler(async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        return res
         .status(200)
         .json(new ApiResponse(
                200,
                user,
                "User removed successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not remove the user")
    }
})

const getUserAttendance = asyncHandler( async(req,res) => {
    try {
        
        const attendance = await Attendance.find().populate('user');
        if(attendance.length <= 0){
            throw new ApiError(404, "No attendance records found");
        }

        const filteredAttendance = attendance.filter(record => (
            record.user.role.toString() === "User"
        ))

        return res
           .status(200)
           .json(new ApiResponse(
                200,
                filteredAttendance,
                "Attendance records fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not get all attendance")
    }
})

const getTrainerAttendance = asyncHandler( async(req,res) => {
    try {
        const attendance = await Attendance.find().populate('user');
        if(attendance.length <= 0){
            throw new ApiError(404, "No attendance records found");
        }

        const filteredAttendance = attendance.filter(record => (
            record.user.role.toString() === "Trainer"
        ))

        return res
           .status(200)
           .json(new ApiResponse(
                200,
                filteredAttendance,
                "Attendance records fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not get all attendance")
    }
})

const getAllClass = asyncHandler( async(request,res) =>{
    try {
        const classes = await Class.find({});
        if(classes.length <= 0){
            throw new ApiError(404, "No classes found");
        }
        return res
           .status(200)
           .json(new ApiResponse(
                200,
                classes,
                "Classes fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch all classes")
    }
})

const getAllProgress = asyncHandler( async(request,res) => {
    try {
        const progress = await Progress.find({});
        if(progress.length <= 0){
            throw new ApiError(404, "No progress records found");
        }
        return res
         .status(200)
         .json(new ApiResponse(
                200,
                progress,
                "Progress records fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Could not fetch all progress");
    }
})

const getActiveUserCount = asyncHandler( async(request,res) => {
    try {
        const currentDate = new Date();
        const activeUsers = await User.countDocuments({
            membershipPlan: {
                $elemMatch:{
                    startDate: {$lte: currentDate},
                    endDate: {$gte: currentDate}
                }
            }
        });
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            activeUsers,
            "Active users fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch active users"); 
    }
})

const getUserCountByGender = asyncHandler(async(req,res) => {
    try {
        const userCounts = await User.aggregate([
            {$group:{_id:"$gender",count:{$sum:1}}}
        ]);
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            userCounts,
            "User count fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch active users")
    }
})

const getAttendanceSummary = asyncHandler(async(req,res) => {
    try {
        const attendanceSummary = await Attendance.aggregate([
            {$group:{_id:{date:"$date",status:"$status"},count:{$sum:1}}},
            {$sort: {"_id.date":1}}
        ]);
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            attendanceSummary,
            "Attendance summary fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch attendance summary")
    }
})

const getProductSalesSummary = asyncHandler(async(req,res) => {
    try {
        const productSales = await Product.aggregate([
            {$group:{_id:"$company",averageRating:{$avg:"$rating"}}}
        ]);
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            productSales,
            "Product sales fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch product sales summary")
    }
})

const getMembershipPlanCount = asyncHandler(async(req,res) => {
    try {
        const planCounts = await Membership.aggregate([
            {$group:{_id:"$plan",count:{$sum : 1}}}
        ]);
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            planCounts,
            "Membership plan count fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch membership")
    }
})

const getNewUsersCount = asyncHandler(async (req,res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() -1);
        const newUsersCount = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo}
        })

        return res
           .status(200)
           .json(new ApiResponse(
                200,
                newUsersCount,
                "New users count fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch new users count");
    }
})

const getLastDayPresntUserCount = asyncHandler(async(req,res) => {
    try {
        const lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 1);
        const lastDayPresent = await Attendance.aggregate([
            {$match: {
                date:{
                    $gte: new Date(lastDate.setHours(0,0,0,0,)),
                    $lte: new Date(lastDate.setHours(23,59,59,999))
                },
                status: "Present"
            }},
            {$group: {_id: "$user"}}
        ])
        const presentUsers = lastDayPresent.length;
        return res.status(200).json(new ApiResponse(200,presentUsers,"Last day present users fetched successfully"))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch last day presnt user count")
    }
})

const getUpcomingExpirations = asyncHandler(async(req,res) => {
    try {
        const today = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(today.getDate() + 7);

        const upcomingExpirations = await User.aggregate([
            {
                $unwind: "$membershipPlan"
            },
            {
                $match:{
                    "membershipPlan.endDate":{
                        $gte: today,
                        $lte: sevenDaysLater
                    },
                }
             },
            
        ]);

        
        return res.status(200).json(new ApiResponse(200,upcomingExpirations,"fetched upcoming expiring memberships"))

    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch upcoming expirations");
    }
})

const userGrowthData = asyncHandler(async(req,res) => {
    try {
        const oneYearAgo = moment().subtract(1,'year').startOf('month').toDate();
        const now = moment().endOf('month').toDate();

        const growthData = await User.aggregate([
            {$match:{createdAt:{$gte:oneYearAgo,$lte:now}}},
            {$group:{_id:{$dateToString:{format:"%Y-%m",date:"$createdAt"}},count:{$sum:1}}},
            {$sort:{_id:1}}
        ])
        const result = [];
        let current = moment(oneYearAgo);
        while(current.isSameOrBefore(now,'month')){
            const month = current.format("YYYY-MM");
            const dataForMonth = growthData.find(data => data._id === month);
            result.push({month,count:dataForMonth ? dataForMonth.count : 0 });
            current.add(1,'month')
        }
        return res.status(200).json(new ApiResponse(200,result,"User growth data fetched successfully"))

    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch user growth data");
    }
})

const getAllContacts = asyncHandler(async(req,res) => {
    try {
        const allContacts = await Contact.find({}).sort({createdAt: -1});
        if(allContacts.length <= 0){
            throw new ApiError(404, "No contacts found");
        }
        return res 
        .status(200)
        .json(new ApiResponse(
                200,
                allContacts,
                "All contacts fetched successfully"
            )) 

    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch all contacts");
    }
})


export {
    getAllUsers,
    removeUser,
    getUserAttendance,
    getTrainerAttendance,
    getAllClass,
    getAllProgress,
    getActiveUserCount,
    getUserCountByGender,
    getAttendanceSummary,
    getProductSalesSummary,
    getMembershipPlanCount,
    getNewUsersCount,
    getLastDayPresntUserCount,
    getUpcomingExpirations,
    userGrowthData,
    getAllContacts,
 };
