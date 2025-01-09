import React from 'react'
import ProfileLayout from "../../layout/ProfileLayout"
import Header from '../../components/Common/Header'
import BlogTable from '../../components/Blog/BlogTable';

function Blogs() {


  return (
    <ProfileLayout>
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title={"Products"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <BlogTable />

            </main>
        </div>
        

    </ProfileLayout>
  )
}

export default Blogs