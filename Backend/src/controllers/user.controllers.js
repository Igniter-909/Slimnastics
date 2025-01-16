import asyncHandler from '../utils/asyncHandler.js';
import {ApiError }from '../utils/ApiError.js';
import User from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken";
import logger from '../../logger.js';
import Membership from '../models/membership.models.js';
import Attendance from '../models/attendance.models.js';
import moment from 'moment/moment.js';
import Progress from '../models/progress.models.js';

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token!!");
    }
}
const registerUser = asyncHandler( async (req, res) => {
    // Register user logic here

    const { name, email, password, DOB, gender,  joinDate, experience, expertise,bio,socialMedia,role } = req.body;

    if ( 
        [name, email, password, gender, DOB, joinDate,expertise,experience,bio,socialMedia].some((field) => field?.trim() == "")
    ){
        throw new ApiError(400,"All fields must be present!!");
    };

    const existedUser = await User.findOne( {email} );

    if(existedUser) {
        throw new ApiError(400,"User is already registered!!");
    }

    const avatarFilePath = req.files?.avatar[0]?.path;
    if(!avatarFilePath) {
        throw new ApiError(400,"Avatar file is required !!");
    }

    const avatar = await uploadOnCloudinary(avatarFilePath);

    if(!avatar) {
         throw new ApiError (500, "Avatar could not be uploaded on cloudinary!!");
    }

    const user = await User.create({
            name,
            email,
            password,
            DOB,
            gender,
            role,
            joinDate,
            experience,
            expertise,
            bio,
            socialMedia,
            cart:[],
            avatar: avatar.url,
            membershipPlan: {}
        });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user!!")
    };

    return res
        .status(200)
        .json(
            new ApiResponse(200,createdUser,"User registered successsfully !! ")
        )

});

const loginUser = asyncHandler( async (req,res ) => {
    
    const { email, password } = req.body;
    
    if(!email || !password){
        throw new ApiError(400,"Email and password are required!!");
    }

    const user = await User.findOne(
        { email: email }
    );

    if(!user) {
        throw new ApiError(401,"Invalid email or password!!");
    }

    const isPasswordCorrect = await user.isPasswordCorrect( password );

    if(!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect Password!!");
    }

    const {accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const loggedinUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    
    const options = {
        maxAge: 24 * 60 * 60*7*1000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    };

    return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200, {
                user: loggedinUser,
                accessToken,
                refreshToken
            }, "Log in successful")
        )


})

const logoutUser = asyncHandler( async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );
    const options = {
        httpOnly: true,
        secure: true    
    };

    return res
       .status(200)
       .clearCookie("accessToken", options)
       .clearCookie("refreshToken", options)
       .json(
            new ApiResponse(200, {}, "Logged out successfully")
        )

});


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    } 

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const getUserProfile = asyncHandler( async (req,res ) => {
    try {
        const user = await req.user.populate('membershipPlan.planId');
        const user2 = await req.user.populate('cart.productId');
        if(!user){
            throw new ApiError(401, "User not found");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    req.user,
                    "User profile fetched successfully!!"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid User");
    }
})

const updateAccountDetails = asyncHandler(async (req,res ) => {
    try {
        const { name, oldPassword, newPassword, gender, expertise, experience, bio, socialMedia  } = req.body;
        if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
            throw new ApiError(400, "All required fields must be provided.");
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }
        
        if (oldPassword && newPassword) {
            const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
            if (!isPasswordCorrect) {
                throw new ApiError(401, "Incorrect old password.");
            }

            // Hash the new password before saving
            user.password = newPassword;
            await user.save(); 
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    name,
                    bio,
                    socialMedia,
                    gender,
                    expertise,
                    experience,
                },
            },
            { new: true, runValidators: true }
        ).select("-password");

        console.log(updatedUser)

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedUser,
                    "Account details updated successfully!!"
                )
            )


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid user");
    }
});

const updateAvatar = asyncHandler( async( req,res) => {
    try {
        const avatarFilePath = req.files?.avatar[0].path;
        if(!avatarFilePath) {
            throw new ApiError(400,"Avatar file is required!!");
        }
        const avatar = await uploadOnCloudinary(avatarFilePath);
        if(!avatar.url) {
            throw new ApiError(500, "Avatar could not be uploaded on cloudinary!!");
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    avatar: avatar.url
                },
            },
            {
                new: true,
                runValidators: true
            }
        )
        if(!user){
            throw new ApiError(404, "User not found");
        }
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Avatar updated successfully!!"
            )
        );
    } catch (error) {
        logger.error(error.message)
        throw new ApiError(400,error?.message || "Avatar could not be updated !!");
    }
})



const deleteAccount = asyncHandler ( async (req,res) => {
    try {
        const {password} = req.body;
        logger.info(password)
        if(!password){
            throw new ApiError(400, "Password is required!!");
        }
        const user = await User.findById(req.user._id);
        logger.info("User",user)
        if(!user){
            throw new ApiError(404, "User not found");
        } 

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Incorrect password.");
        }
        console.log(user.role)
        if(user.role === "Admin"){
            throw new ApiError(403, "Admins cannot delete their account.");
        }

        const deleteResult = await user.deleteOne();

        return res
       .status(200)
       .json(
        new ApiResponse(
            200,
            deleteResult,
            "Account deleted successfully!"
        )
       )
    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong while trying to delete the account ")
    }
})

const getAllUsers = asyncHandler(async (req,res) =>{
    try {
        const users = await User.find({}, "-password -refreshToken");
        return res
       .status(200)
       .json(new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while trying to get the users")
    }
})

const viewPlan = asyncHandler( async (req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        if(!user.membershipPlan || user.membershipPlan.length <= 0 ){
            throw new ApiError(404, "No active plan found");
        }

        const planData = await Promise.all(
            user.membershipPlan.map(async (plan) => {
                const membership = await Membership.findById(plan.planId);
                return {
                    ...plan.toObject(), 
                    membership, 
                };
            })
        );

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                planData,
                "Plan fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while trying to get the plan")
    }
})

const addPlan = asyncHandler( async(req,res) => {
    try { 
        console.log("Hello guys!!")

        const { planId, startDate } = req.body;
        
        if(!startDate){
            throw new ApiError(400, "Start date are required.");
        }
        const plan = await Membership.findById(planId);
        if(!plan){
            throw new ApiError(404, "Plan not found");
        }

        const endDate =  new Date(
            new Date(startDate).getTime() + plan.duration * 24 * 60 *60 *1000 * 30
        );

        let status;
        if(startDate < Date.now() && endDate > Date.now()){
            status="active";
        }
        else {
            status="inactive";
        }

        const membershipPlan = {
            planId:(plan._id),
            startDate: new Date(startDate),
            endDate:endDate,
            status: status
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $push:{
                    membershipPlan
                }
            },
            {
                new: true
            }
        )
        if(!user){
            throw new ApiError(404, "User not found");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user.membershipPlan,
                    "Plan added successfully to your account"
                ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while adding a plan")
    }
})

const addToCart = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const productIndex = user.cart.findIndex(item => item.productId?.toString() === productId.toString());

        if (productIndex > -1) {
            // If product already exists in cart, update the quantity
            user.cart[productIndex].quantity += quantity;
        } else {
            // If product does not exist in cart, add it
            user.cart.push({ productId, quantity });
        }

        await user.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                user.cart,
                "Product added to cart successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while adding a product to cart");
    }
});

const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Remove the product from the cart
        console.log(id )
        user.cart = user.cart.filter(item => item.productId.toString() !== id.toString());

        await user.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                user.cart,
                "Product removed from cart successfully"
            )
        );
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while removing a product from cart");
    }
});

const attendanceData = asyncHandler(async(req,res) => {
    try {
        const id = req.user._id;

        if(!id) {
            throw new ApiError(401,"User not found");
        }
        const user = await User.findById(id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        const userId = user._id;
        const today = moment().startOf('day');
        const oneYearAgo = moment().subtract(1,'year').startOf('day');

        const allDates = [];
        let currentDate = oneYearAgo.clone();
        while(currentDate.isBefore(today)){
            allDates.push(currentDate.format('YYYY-MM-DD'));
            currentDate.add(1,'day');
        }


        const attendanceRecords = await Attendance.find({
            user: userId,
            date: {$gte: oneYearAgo.toDate(), $lte:today.toDate()}
        }).select('date status -_id');

        const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
        const leaveCount = attendanceRecords.filter(record => record.status === "On Leave").length

        const STATUS_VALUES = {
            "Present": 10,
            "Absent": 0,
            "On Leave": 20
        }
        const attendanceLookup = {};
        attendanceRecords.forEach(record => {
            const formattedDate = moment(record.date).format("YYYY-MM-DD");
            attendanceLookup[formattedDate] = STATUS_VALUES[record.status] || 0
        })

        const attendanceData = allDates.map(date => ({
            date,
            value: attendanceLookup[date] || 0
        }));

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    data:attendanceData,
                    presentCount,
                    leaveCount,
                    absentCount:(attendanceData.length - (presentCount + leaveCount)),
                    startDate: oneYearAgo,
                    endDate: today
                },
                "Attendance data fetched successfully"
            )
        )

    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while fetching attendance data");
    }
})

const getProgressStats = asyncHandler(async(req,res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        const today = moment().startOf('day');
        const sixMonthAgo = moment().subtract(6,'month').startOf('day');

        const progressData = await Progress.find({
            userId: user._id,
            date:{$gte:sixMonthAgo, $lte:today}
        }).select('date weight fatPercent')

        return res.status(200).json(new ApiResponse(200,progressData,"Succefully fetched progress data"))


    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while fetching progress");
    }
})

const getTrainersData = asyncHandler(async(req,res) => {
    try {
        const users = await User.find({});
        const trainers = users.filter(user => user.role === "Trainer");
        return res.status(200).json(new ApiResponse(200,trainers,"Succefully fetched trainers data"))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while fetching trainers data");
    }
})


// add forgot password






export { registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
    updateAccountDetails,
    updateAvatar,
    deleteAccount,
    addPlan,
    viewPlan,
    getAllUsers,
    addToCart,
    removeFromCart,
    attendanceData,
    getProgressStats,
    getTrainersData,
 };