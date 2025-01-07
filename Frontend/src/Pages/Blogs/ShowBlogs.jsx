import React, { useState } from 'react';
import HomeLayout from "../../layout/HomeLayout";
import home from "../../assets/blogs/home.jpg";
import { MdOpenInNew } from "react-icons/md";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const blogs = [
  { id: 1, title: "Blog 1", description: "Description for blog 1", image: home },
  { id: 2, title: "Blog 2", description: "Description for blog 2", image: home },
  { id: 3, title: "Blog 3", description: "Description for blog 3", image: home },
  { id: 4, title: "Blog 4", description: "Description for blog 4", image: home },
  { id: 5, title: "Blog 5", description: "Description for blog 5", image: home },
  { id: 6, title: "Blog 6", description: "Description for blog 6", image: home },
  { id: 7, title: "Blog 7", description: "Description for blog 7", image: home },
  { id: 8, title: "Blog 8", description: "Description for blog 8", image: home },
  { id: 9, title: "Blog 9", description: "Description for blog 9", image: home },
  { id: 10, title: "Blog 10", description: "Description for blog 10", image: home },
  { id: 11, title: "Blog 11", description: "Description for blog 11", image: home },
  { id: 12, title: "Blog 12", description: "Description for blog 12", image: home },
];

function ShowBlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < Math.ceil(blogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
            <p className='font-aclonica text-3xl md:text-5xl text-white text-center'>The <span className='text-[#D90A14]'>Blog</span></p>
            <p className='text-xs md:text-sm font-vazirmatn text-center text-white max-w-2xl'>
              Welcome to our blog section, where our expert coaches and trainers share their knowledge and insights on fitness, nutrition, and wellness. 
              Discover the best diets, effective workout practices, and tips to help you achieve your fitness goals. Stay informed and inspired with our 
              latest articles and updates.
            </p>
          </div>
        </div>

        <p className='text-xl justify-start w-full h-fit pt-10 px-4 md:px-0'>Recent Blog Posts</p>
        <div className='flex flex-col lg:flex-row gap-6 w-full md:w-5/6 h-fit items-center'>  
          <div className='w-full lg:w-1/2 h-fit flex flex-col gap-3 p-3'>
            <div className='w-full rounded-lg h-auto'>
              <img src={home} alt="thumbnail" className='w-full h-auto rounded-lg overflow-hidden' />
            </div>
            <div className='w-full h-fit flex flex-col justify-start'>
              <p className='text-sm text-[#815cd6] font-vazirmatn'>Roshan Kumar : 1 Jan 2025</p>
              <div className='justify-between flex'>
                <p className='text-lg font-aclonica'>GYM Diet Plans</p>
                <button><MdOpenInNew /></button>
              </div>
              <p className='text-sm font-vazirmatn line-clamp-3 md:line-clamp-none'>Discover the best ways to prepare for your workouts and maintain a healthy diet. Discover the best ways to prepare for your workouts and maintain a healthy diet. Discover the best ways to prepare for your workouts and maintain a healthy diet.</p>
              <div className='font-vazirmatn text-[#f7e736] flex gap-x-16 mt-2'>
                <p>Nutrition</p>
                <p>Diet</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full lg:w-1/2 h-full gap-6 md:gap-20'>
            {[1, 2].map((_, index) => (
              <div key={index} className='w-full h-fit flex flex-col md:flex-row rounded-lg overflow-hidden'>
                <div className='w-full md:w-1/2 h-48 md:h-auto'>
                  <img src={home} alt="thumbnail" className='w-full h-full object-cover rounded-lg md:rounded-none overflow-hidden' />
                </div>
                <div className='flex flex-col w-full md:w-1/2 h-full p-3 md:px-3'>
                  <p className='text-sm text-[#815cd6] font-vazirmatn'>Roshan Kumar : 1 Jan 2025</p>
                  <div className='justify-between flex'>
                    <p className='text-lg font-aclonica'>GYM Diet Plans</p>
                    <button><MdOpenInNew /></button>
                  </div>
                  <p className='text-sm font-vazirmatn line-clamp-3'>Discover the best ways to prepare for your workouts and maintain a healthy diet. Discover the best ways to prepare for your workouts and maintain a healthy diet.</p>
                  <div className='font-vazirmatn text-[#f7e736] flex pt-2 gap-x-16'>
                    <p>Nutrition</p>
                    <p>Diet</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className='text-xl justify-start w-full h-fit pt-10 px-4 md:px-0'>All Blog Posts</p>
        <div className='w-full h-fit flex flex-col justify-center items-center p-4 md:p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
            {currentBlogs.map(blog => (
              <div key={blog.id} className='w-full flex flex-col md:flex-row gap-4 md:gap-6'>
                <div className='w-full md:w-1/2'>
                  <img src={home} alt="thumbnail" className='w-full h-48 md:h-40 object-cover rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 h-full flex flex-col'>
                  <p className='text-sm text-[#815cd6] font-vazirmatn'>Roshan Kumar : 1 Jan 2025</p>
                  <div className='justify-between flex'>
                    <p className='text-lg font-aclonica'>{blog.title}</p>
                    <button><MdOpenInNew /></button>
                  </div>
                  <p className='text-sm font-vazirmatn line-clamp-3'>{blog.description}</p>
                  <div className='font-vazirmatn text-[#f7e736] flex gap-x-16 mt-2'>
                    <p>Nutrition</p>
                    <p>Diet</p>
                  </div>                          
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between mt-6 w-full md:w-auto'>
            <button onClick={prevPage} disabled={currentPage === 1} className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14] mr-4 md:mr-6'>
              <IoIosArrowDropleft className='text-[#D90A14] text-2xl hover:text-white'/>
            </button>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)} className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14]'>
              <IoIosArrowDropright className='text-[#D90A14] text-2xl hover:text-white'/>
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ShowBlogs;

