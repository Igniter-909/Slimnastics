import React from 'react';
import { useParams } from 'react-router-dom';
import HomeLayout from "../../layout/HomeLayout";

function DisplayBlog({ blogs }) {
  const { id } = useParams();
  const blog = blogs.find(b => b._id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <HomeLayout>
      <div className='w-full h-fit flex flex-col justify-center items-center p-4 md:p-6'>
        <div className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2'>
          <img src={blog.thumbnail} alt={blog.title} className='w-full h-64 object-cover rounded-lg mb-6' />
          <h1 className='text-3xl font-aclonica mb-2'>{blog.title}</h1>
          <p className='text-sm text-[#815cd6] font-vazirmatn mb-4'>
            {blog.penName} : {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div className='font-vazirmatn text-[#89812a] flex gap-x-4 mb-6'>
            {String(blog.tags).split(',').map((tag, index) => (
              <span key={index} className='bg-[#948a1c] text-black px-2 py-1 rounded'>{tag.trim()}</span>
            ))}
          </div>
          <div className='font-vazirmatn text-lg' dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </HomeLayout>
  );
}

export default DisplayBlog;

