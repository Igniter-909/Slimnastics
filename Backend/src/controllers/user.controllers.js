import asyncHandler from '../utils/asyncHandler.js';
import {ApiError }from '../utils/ApiError.js';
import User from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken";
import logger from '../../logger.js';

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

    const { name, email, password, DOB, gender, role,  joinDate } = req.body;

    if ( 
        [name, email, password, gender, DOB, joinDate].some((field) => field?.trim() == "")
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
        avatar:avatar.url
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
        httpOnly: true,
        securee: true
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
        const user = req.user;
        logger.info(user)
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
        const { name, oldPassword, newPassword, DOB, gender } = req.body;
        if (!name || !DOB || !gender || (oldPassword && !newPassword) || (!oldPassword && newPassword)) {
            throw new ApiError(400, "All required fields must be provided.");
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        if(user.role === "Admin"){
            throw new ApiError(403, "Admins cannot update their account details.");
        }
        
        if (oldPassword && newPassword) {
            const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
            if (!isPasswordCorrect) {
                throw new ApiError(401, "Incorrect old password.");
            }

            // Hash the new password before saving
            user.password = newPassword;
            await user.save(); // Ensures pre-save hooks for hashing run
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    name,
                    DOB,
                    gender,
                },
            },
            { new: true, runValidators: true }
        ).select("-password");

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
        throw new ApiError(400,"Avatar could not be updated !!");
    }
})

const deleteAccount = asyncHandler ( async (req,res) => {
    try {
        const {password} = req.body;
        if(!password){
            throw new ApiError(400, "Password is required!!");
        }
        const user = await User.findById(req.user._id);
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

        await user.deleteOne();

        return res
       .status(200)
       .json(
        new ApiResponse(
            200,
            {},
            "Account deleted successfully!"
        )
       )
    } catch (error) {
        throw new ApiError(400, error?.message || "Something went wrong while trying to delete the account ")
    }
})


export { registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
    updateAccountDetails,
    updateAvatar,
    deleteAccount
 };