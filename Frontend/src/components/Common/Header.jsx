import React from 'react'

function Header({title}) {
  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow- border-b border-[#83262a]'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold text-[#D90A14] font-aclonica'>{title}</h1>

        </div>

    </header>
  )
}

export default Header