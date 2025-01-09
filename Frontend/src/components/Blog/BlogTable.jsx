import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, deleteBlog } from "../../Redux/Slices/BlogSlice.js";

const BlogTable = () => {
    const dispatch = useDispatch();
    const allBlogs = useSelector(state => state.blog.allBlogs);
    const [selectedBlog, setSelectedBlog] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    
    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);


    useEffect(() => {
            setFilteredBlogs(allBlogs);
    }, [allBlogs]);


    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (Array.isArray(allBlogs)) {
            const filtered = allBlogs.filter(
                (blog) => 
                    blog.title.toLowerCase().includes(term) || 
                    blog.description.toLowerCase().includes(term) || 
                    blog.penName.toLowerCase().includes(term)
            );
            setFilteredBlogs(filtered);
        }
    };

    const handleDeleteClick = (_id) => {
        setSelectedBlog(_id);
        setIsDialogOpen(true);
    };

    const handleConfirm = async () => {
        await dispatch(deleteBlog(selectedBlog));
        setFilteredBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== selectedBlog));
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelectedBlog("");
    };

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#D90A14]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Blogs</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search blogs...'
                        className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto max-h-96'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Blog Title
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Pen Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Tags
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Description
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-700'>
                        {filteredBlogs.map((blog) => (
                            <motion.tr
                                key={blog._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium text-gray-100'>{blog.title}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-300'>{blog.penName}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
                                        {blog.tags[0]}
                                    </span>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-600 text-pink-100'>
                                        {blog.description.slice(0,8)}...
                                    </span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <button className='text-red-400 hover:text-red-300' onClick={() => handleDeleteClick(blog._id)}>Delete</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90">
                    <div className="bg-black rounded-lg shadow-xl p-6 w-fit">
                        <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14]">
                            Are you sure you want to delete this blog?
                        </h2>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-2 bg-[#D90A14] text-white rounded hover:bg-[#a22c32]"
                                onClick={handleConfirm}
                            >
                                OK
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} 
        </motion.div>
    );
};

export default BlogTable;

