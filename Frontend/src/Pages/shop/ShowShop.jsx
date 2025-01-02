import React, { useState } from 'react'
import HomeLayout from "../../layout/HomeLayout"
import cover2 from "../../assets/shop/cover2.jpg"
import { GymProducts } from '../../constants/products.js'

function ShowShop() {

    const [pages,setPages] = useState(1);
    const final_length = pages * 8;
    const visiblePages = GymProducts.slice(0, final_length);

    const handleNextPage = () => {
        if(visiblePages.length < GymProducts.length) {
            setPages(pages+1);
        }
    }
  return (
    <HomeLayout>
        <div className='relative w-5/6 justify-self-center rounded-3xl overflow-hidden h-fit flex flex-col gap-2 justify-center items-center py-40 bg-cover bg-center'
            style={{ backgroundImage: `url(${cover2})` }}>
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            <div class="relative z-10 flex flex-col gap-5 items-center justify-center h-full text-white">
            <p className='font-aclonica text-5xl text-white'>SLIM<span className='text-[#D90A14]'>NASTICS</span></p>
            <p className='text-sm font-vazirmatn text-center text-white'>
                <br />
                Wide Range Of Trusted And Tested Products
                <br />
            </p>
            </div>
        </div>

        <div className='w-full h-fit flex gap-0 justify-center items-center px-6 py-10'>
            <div className='w-1/4 h-full flex flex-col gap-0 items-center justify-center border-r-2 border-[#D90A14]'>
                <div className='h-2/3 flex justify-center items-center'>
                    <p className='font-aclonica text-xl text-[#D90A14] '>98% <span className='text-base text-white'>Client Satisfaction</span></p>
                </div>
                <p className=' h-1/3 items-center text-sm'>Our Members Love Their Results and Experience</p>
            </div>
            <div className='w-1/4 h-full flex flex-col gap-0 items-center justify-center border-r-2 border-[#D90A14]'>
                <div className=' h-2/3 flex justify-center items-center'>
                    <p className='font-aclonica text-xl text-[#D90A14] '>10+ <span className='text-base text-white'>Brands</span></p>
                </div>
                <p className='h-1/3 items-center text-sm'>Choose From The Varied Options</p>
            </div>
            <div className='w-1/4 h-full flex flex-col gap-0 items-center justify-center'>
                <div className='h-2/3 flex justify-center items-center'>
                    <p className='font-aclonica text-xl text-[#D90A14] '>Safe <span className='text-base text-white'>Products</span></p>
                </div>
                <p className='h-1/3 items-center text-sm'>Tried And Tested Products Only</p>
            </div>
            
        </div>

        <h2 className='w-full text-xl font-aclonica text-center py-10'>Our Latest <span className='text-[#D90A14]'>Products</span></h2>
        <div className='w-full h-fit grid grid-cols-4 gap-6 p-10'>
        {visiblePages.map((product,index) => (
            <div key={index} className='w-full h-full flex flex-col p-10 pt-0 border-2 border-[#d90A14]/30 rounded-3xl'>
            <div className='w-full h-4/6'>
                <img src={cover2} alt="product" className='w-full h-full rounded-lg overflow-hidden' />
            </div>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <p className='font-rubik text-[#e3ec36] text-xl font-bold'>{product.name}</p>
                <p className='font-vazirmatn text-white/30'>{product.flavor}</p>
                <div className='text-sm flex gap-5 font-vazirmatn'>
                    <p className='font-semibold'>{product.newPrice}</p>
                    <p className='line-through text-white/60'>{product.originalPrice}</p>
                    <p className='text-green-400'>save {(product.originalPrice - product.newPrice).toFixed(2)}</p>
                </div>
                <div className='w-full px-6'>
                    <button className='w-full h-10 rounded-full bg-[#D90A14] text-white font-vazirmatn hover:bg-[#ee4851]'>Add To Cart</button>
                </div>

            </div>
        </div>
        ))}
        </div>
        <div className='wi-full h-fit flex justify-center'>
            <button className='px-3 py-1 text-sm font-vazirmatn text-white bg-[#d82ef2] hover:bg-[#635cf5] rounded-full' onClick={handleNextPage}>Load More</button>
        </div>
    </HomeLayout>
  )
}

export default ShowShop