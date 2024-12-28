import Comment from "../models/comment.models";
import User from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

// add comeent
const addComment = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        const {text}  = req.body;
        const comment = await Comment.create({
            user: user._id,
            productId: req.params.productId,
            text: text
        });
        const createdComment = await Comment.findById(comment._id);
        if(!createdComment){
            throw new ApiError(404, "Comment not found");
        }
        return res
        .status(201)
        .json(new ApiResponse(
            200,
            createdComment,
            "Comment added successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while adding a comment");
    }
})

// update comment
const updateComment = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        const {text}  = req.body;
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            throw new ApiError(404, "Comment not found");
        }
        if(comment.user.toString()!== user._id.toString()){
            throw new ApiError(403, "You are not authorized to update this comment");
        }
        comment.text = text;
        await comment.save();
        const updatedComment = await Comment.findById(comment._id);
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            updatedComment,
            "Comment updated successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while updating a comment");
    }
})

// delete comment
const deleteComment = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if(!comment){
            throw new ApiError(404, "Comment not found");
        }
        if(comment.user.toString()!== user._id.toString()){
            throw new ApiError(403, "You are not authorized to delete this comment");
        }
        return res
        .status(201)
        .json(new ApiResponse(
            200,
            comment,
            "Comment deleted successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while deleting a comment");
    }
})



// read comment
const getComment = asyncHandler( async(req,res) => {
    try {
        const productId = req.params.productId;
        const comments = await Comment.find({productId}).populate('user', 'name avatar');
        if(!comments){
            throw new ApiError(404, "No comments found for this product");
        }
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                comments,
                "Comments fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while adding a comment");
    }
})

export {
    addComment,
    updateComment,
    deleteComment,
    getComment
};