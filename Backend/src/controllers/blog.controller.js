import Blog from "../models/blog.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addBlog = asyncHandler(async(req,res) => {
    try {
        const {title,tags,description,content,penName} = req.body;
        if(!title ||!tags ||!description ||!content ||!penName) {
            throw new ApiError(400, "All fields are required")
        }
        const thumbnailFilePath = req.files?.thumbnail[0]?.path;
        if(!thumbnailFilePath) {
            throw new ApiError(400,"Thumbnail file is required")
        }
        const thumbnail = await uploadOnCloudinary(thumbnailFilePath)
        const newBlog = await Blog.create({
            title,
            tags: tags,
            description,
            content,
            penName,
            thumbnail:thumbnail.url
        })
        const createdBlog = await Blog.findById(newBlog._id);

        if(!createdBlog){
            console.log("New Blog",newBlog)
            throw new ApiError(404,"Blog wasn't created");
        }

        return res.status(200).json(new ApiResponse(200, createdBlog,"New Blog created successfully"))

    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while adding a blog")
    }
})

const getAllBlogs = asyncHandler(async(req,res) => {
    try {
        const allBlogs = await Blog.find({}).sort({createdAt: -1});
        if(!allBlogs){
            throw new ApiError(200,"No blogs found!!");
        }
        return res.status(200).json(new ApiResponse(200, allBlogs,"All blogs fetched successfully"))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while ftching all data")
    }
})

const deleteBlog = asyncHandler(async(req,res) => {
    try {
        
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
        if(!deleteBlog){
            throw new ApiError(404,"Blog not found");
        }
        return res.status(200).json(new ApiResponse(200, {},"Blog deleted successfully"))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while deleting the blog");
    }
})

export {addBlog,getAllBlogs,deleteBlog};