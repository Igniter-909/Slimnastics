import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    allBlogs:[],
    currentBlog: {}
};

export const addBlog = createAsyncThunk(
    "/blog/addBlog",
    async(data) => {
        try {
            console.log("Data received",data);
            const res = axiosInstance.post("/users/addBlog", data);
            toast.promise(res,{
                loading: "Adding Blog...",
                success: "Blog Added Successfully",
                error: "Failed to Add Blog"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const getAllBlogs = createAsyncThunk(
    "/blogs/getAllBlogs",
    async() => {
        try {
            const res = axiosInstance.get("/users/getAllBlogs");
            toast.promise(res,{
                loading: "Fetching Blogs...",
                success: "Successfullt fetched",
                error: "Failed to Fetch Blogs"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const deleteBlog = createAsyncThunk(
    "/blogs/deleteBlog",
    async(id) => {
        try {
            const res = axiosInstance.delete(`/users/deleteBlog/${id}`);
            toast.promise(res,{
                loading: "Deleting Blog...",
                success: "Blog deleted successfully",
                error: "Failed to delete Blog"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBlog.fulfilled,(state,action) => {
            state.allBlogs.push(action.payload.data);
        })
        builder.addCase(getAllBlogs.fulfilled,(state,action) => {
            state.allBlogs = action.payload.data;
        })
        builder.addCase(deleteBlog.fulfilled,(state,action) => {
            state.allBlogs = state.allBlogs.filter(blog => blog._id!== action.payload._id);
        })  // Add reducers for other actions related to blogs
    } 
           // Add reducers for other actions related to blogs


});

export default blogSlice.reducer;;