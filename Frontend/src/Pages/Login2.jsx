import React from 'react'
import HomeLayout from '../layout/HomeLayout'
import { Features } from '../constants/features.js'

function Login2() {
    const features = Features.slice(0,4);
  return (
    <HomeLayout>
        <div className='w-full h-fit flex flex-col p-6'>
        <div className='w-full h-fit flex flex-col'>
            <div className='w-full h-fit flex justify-center items-center'>
                <p className='font-aclonica font-bold text-3xl'>Join Our <span className='text-[#D90A14]'>Fitness Community</span></p>
            </div>
            <p className='font-vazirmatn text-sm leading-6 text-center mt-4'>
                Sign Up To Unlock Exclusive Access To Personalized Workouts, Nutrition Plans, And A Supportive Community Of Members That Will Help You AChieve Your Fitness Goals.
            </p>
            <div className='w-full h-fit grid grid-cols-2 gap-4 mt-6'>
                {features.map((feature, index) => (
                    <div key={index} className='w-full h-full flex flex-col justify-center items-center border-x-2 border-[#D90A14]  rounded-lg p-4 shadow-custom-shadow'>
                    <p className='font-aclonica font-bold'>{feature.title}</p>
                    <p className='font-vazirmatn text-sm leading-6 text-center'>{feature.description}</p>
                </div>
                ))}
            </div>
        </div>
        <div className='w-full h-fit flex justify-center items-center mt-6'>
                <div className='w-1/2 h-fit flex flex-col bg-[#5B0408] rounded-lg p-8 shadow-custom-shadow'>
                    <div className='flex mb-6 justify-center'>
                        <button className={`text-xl font-semibold px-4 text-white underline`} >Login</button>
                    </div>
                    <form >
                        
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-300 mb-2'>Email</label>
                            <input type="email" id='email' name='email' placeholder='Enter Your Email..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-300 mb-2'>Password</label>
                            <input type="password" id='password' name='password' placeholder='Enter Your Password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button className='bg-[#D90A14] text-white my-2 px-4 py-2 rounded-lg w-full hover:bg-[#ea4152]' type='submit'>Login</button>
                        </div>
                    </form>
                    <div className='w-full flex justify-center mt-4'>
                        <p className='text-sm'>Don't have an account? <span className='text-[#D90A14] underline cursor-pointer link link-hover'>Sign Up</span></p>
                    </div>
                </div>
        </div>
    </div>
    </HomeLayout>
  )
}

export default Login2