import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { Features } from '../constants/features.js'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/Slices/AuthSlice.js';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const features = Features.slice(0, 4);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please enter required fields")
        };
        const res = await dispatch(loginUser(formData));
        if (res?.payload?.success) {
            navigate("/")
        } else {
            toast.error("Invalid credentials")
        }
    }

    return (
        <HomeLayout>
            <div className='w-full min-h-screen flex flex-col p-4 sm:p-6'>
                <div className='w-full flex flex-col mb-8'>
                    <h1 className='font-aclonica font-bold text-2xl sm:text-3xl text-center'>
                        Join Our <span className='text-[#D90A14]'>Fitness Community</span>
                    </h1>
                    <p className='font-vazirmatn text-sm sm:text-base leading-6 text-center mt-4'>
                        Sign Up To Unlock Exclusive Access To Personalized Workouts, Nutrition Plans, And A Supportive Community Of Members That Will Help You Achieve Your Fitness Goals.
                    </p>
                </div>

                <div className='w-full flex justify-center items-center mb-8'>
                    <div className='w-full max-w-md bg-[#5B0408] rounded-lg p-6 sm:p-8 shadow-custom-shadow'>
                        <div className='flex mb-6 justify-center'>
                            <h2 className='text-xl sm:text-2xl font-semibold text-white underline'>Login</h2>
                        </div>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor="email" className='block text-gray-300 mb-2'>Email</label>
                                <input 
                                    type="email" 
                                    id='email' 
                                    name='email' 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter Your Email..' 
                                    className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' 
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='block text-gray-300 mb-2'>Password</label>
                                <input 
                                    type="password" 
                                    id='password' 
                                    name='password' 
                                    value={formData.password} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter Your Password..' 
                                    className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' 
                                />
                            </div>
                            <div className='w-full flex justify-center'>
                                <button className='bg-[#D90A14] text-white my-2 px-4 py-2 rounded-lg w-full hover:bg-[#ea4152] transition-colors duration-300' type='submit'>
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className='w-full flex justify-center mt-4'>
                            <p className='text-sm text-gray-300'>
                                Don't have an account? <Link to="/signup" className='text-[#D90A14] underline cursor-pointer hover:text-[#ea4152] transition-colors duration-300'>Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {features.map((feature, index) => (
                        <div key={index} className='w-full flex flex-col justify-center items-center border-x-2 border-[#D90A14] rounded-lg p-4 shadow-custom-shadow'>
                            <h3 className='font-aclonica font-bold text-lg mb-2'>{feature.title}</h3>
                            <p className='font-vazirmatn text-sm leading-6 text-center'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    )
}

export default Login;
