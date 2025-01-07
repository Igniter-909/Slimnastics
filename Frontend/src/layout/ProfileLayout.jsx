import React from 'react'

import HomeLayout from "./HomeLayout"
import SideBar from '../components/SideBar'

function ProfileLayout({children}) {
  return (
        <div className='bg-gray-900 text-gray-100 flex h-screen overflow-hidden font-nunito'>
        <div className='fixed inset-0 z-0'>
            <div className='absolute inset-0 bg-gradient-to-br from-gray-700 via-[#1d1d1d] to-gray-900 opacity-80'></div>
            <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
        <SideBar />
        {children}
    </div>
  )
}

export default ProfileLayout