import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from "../../layout/HomeLayout";
import home from "../../assets/blogs/home.jpg";
import { MdOpenInNew } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../Redux/Slices/BlogSlice';

function ShowBlogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBlogs = async() => {
      await dispatch(getAllBlogs());
    };
    fetchAllBlogs();
  }, [dispatch]);

  const allBlogs = useSelector(state => state.blog?.allBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < Math.ceil(allBlogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      navigate(`/blog/${allBlogs[indexOfLastBlog % allBlogs.length]._id}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      // Navigate to the last blog of the previous page
      const lastIndex = allBlogs.length - 1;
      navigate(`/blog/${allBlogs[lastIndex]._id}`);
    }
  };

  return (
    <HomeLayout>
      <div className='w-full h-fit flex flex-col justify-center items-center p-4 md:p-6'>
        <div 
          className='relative w-full md:w-5/6 rounded-3xl overflow-hidden h-fit flex flex-col gap-2 justify-center items-center py-20 md:py-40 bg-cover bg-center'
          style={{ backgroundImage: `url(${home})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div> 
          <div className="relative z-10 flex flex-col gap-3 md:gap-5 items-center justify-center h-full text-white px-4 md:px-0"> 
            <p className='font-aclonica text-3xl md:text-5xl text-white text-center'>
              The <span className='text-[#D90A14]'>Blog</span>
            </p> 
            <p className='text-xs md:text-sm font-vazirmatn text-center text-white max-w-2xl'> 
              Welcome to our blog section, where our expert coaches and trainers share their knowledge and insights on fitness, nutrition, and wellness. Discover the best diets, effective workout practices, and tips to help you achieve your fitness goals. Stay informed and inspired with our latest articles and updates. 
            </p> 
          </div>
        </div>

        {/* Recent Blog Posts */}
        <p className='text-xl justify-start w-full h-fit pt-10 px-4 md:px-0'>Recent Blog Posts</p>
        <div className='flex flex-col lg:flex-row gap-6 w-full md:w-5/6 h-fit items-center'>  
          {/* Featured blog */}
          <div className='w-full lg:w-1/2 h-fit flex flex-col gap-3 p-3'>
            {allBlogs[0] && (
              <Link to={`/blog/${allBlogs[0]._id}`} className='w-full rounded-lg h-auto'>
                <img src={allBlogs[0].thumbnail} alt="thumbnail" className='w-full h-auto rounded-lg overflow-hidden' />
                <div className='w-full h-fit flex flex-col justify-start mt-3'>
                  <p className='text-sm text-[#815cd6] font-vazirmatn'>
                    {allBlogs[0].penName} : {new Date(allBlogs[0].createdAt).toLocaleDateString()}
                  </p>
                  <div className='justify-between flex'>
                    <p className='text-lg font-aclonica'>{allBlogs[0].title}</p>
                    <MdOpenInNew />
                  </div>
                  <p className='text-sm font-vazirmatn line-clamp-3 md:line-clamp-none'>{allBlogs[0].description}</p>
                  <div className='font-vazirmatn text-[#f7e736] flex gap-x-16 mt-2'>
                    {String(allBlogs[0].tags).split(',').map((tag, index) => <p key={index}>{tag.trim()}</p>)}
                  </div>
                </div>
              </Link>
            )}
          </div>
          {/* Other recent blogs */}
          <div className='flex flex-col w-full lg:w-1/2 h-full gap-6 md:gap-20'>
            {allBlogs.slice(1, 3).map((blog, index) => (
              <Link key={blog._id} to={`/blog/${blog._id}`} className='w-full h-fit flex flex-col md:flex-row rounded-lg overflow-hidden'>
                <div className='w-full md:w-1/2 h-48 md:h-auto'>
                  <img src={blog.thumbnail} alt="thumbnail" className='w-full h-full object-cover rounded-lg md:rounded-none overflow-hidden' />
                </div>
                <div className='flex flex-col w-full md:w-1/2 h-full p-3 md:px-3'>
                  <p className='text-sm text-[#815cd6] font-vazirmatn'>
                    {blog.penName} : {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className='justify-between flex'>
                    <p className='text-lg font-aclonica'>{blog.title}</p>
                    <MdOpenInNew />
                  </div>
                  <p className='text-sm font-vazirmatn line-clamp-3'>{blog.description}</p>
                  <div className='font-vazirmatn text-[#f7e736] flex pt-2 gap-x-16'>
                    {String(blog.tags).split(',').slice(0, 2).map((tag, index) => <p key={index}>{tag.trim()}</p>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Blog Posts */}
        <p className='text-xl justify-start w-full h-fit pt-10 px-4 md:px-0'>All Blog Posts</p>
        <div className='w-full h-fit flex flex-col justify-center items-center p-4 md:p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
            {currentBlogs.map(blog => (
              <Link key={blog._id} to={`/blog/${blog._id}`} className='w-full flex flex-col md:flex-row gap-4 md:gap-6'>
                <div className='w-full md:w-1/2'>
                  <img src={blog.thumbnail} alt="thumbnail" className='w-full h-48 md:h-40 object-cover rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 h-full flex flex-col'>
                  <p className='text-sm text-[#815cd6] font-vazirmatn'>
                    {blog.penName} : {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className='justify-between flex'>
                    <p className='text-lg font-aclonica'>{blog.title}</p>
                    <MdOpenInNew />
                  </div>
                  <p className='text-sm font-vazirmatn line-clamp-3'>{blog.description}</p>
                  <div className='font-vazirmatn text-[#f7e736] flex gap-x-16 mt-2'>
                    {String(blog.tags).split(',').slice(0, 2).map((tag, index) => <p key={index}>{tag.trim()}</p>)}
                  </div>                          
                </div>
              </Link>
            ))}
          </div>
          <div className='flex justify-between mt-6 w-full md:w-auto'>
            <button onClick={prevPage} className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14] mr-4 md:mr-6'>
              <IoIosArrowDropleft className='text-[#D90A14] text-2xl hover:text-white'/>
            </button>
            <button onClick={nextPage} className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14]'>
              <IoIosArrowDropright className='text-[#D90A14] text-2xl hover:text-white'/>
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ShowBlogs;

