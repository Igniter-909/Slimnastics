import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    penName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    }
},{timestamps:true})

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;