import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { Features } from '../constants/features.js'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser } from '../Redux/Slices/AuthSlice.js';

function SignUp() {
    const features = Features.slice(0, 4);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',
        DOB: "",
        gender: '',
        joinDate: "",
        experience: "",
        expertise: "",
        socialMedia: '',
        bio: "",
        avatar: '',
        role: 'User'
    })

    const [previewImage, setPreviewImage] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function getImage(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            setFormData({
                ...formData,
                avatar: uploadedImage
            })
        };
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result)
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const Data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            Data.append(key, value);
        });
        
        // console.log(send data)
        for(let pair of Data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const res = await dispatch(signupUser(Data));
        if (res?.payload?.success) {
            setFormData({
                name: "",
                email: '',
                password: '',
                DOB: "",
                gender: '',
                joinDate: "",
                experience: "",
                expertise: "",
                socialMedia: '',
                bio: "",
                avatar: '',
                role: 'User'
            });
            navigate("/");
        };
        setPreviewImage("");
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
                    <div className='w-full max-w-2xl bg-[#5B0408] rounded-lg p-6 sm:p-8 shadow-custom-shadow'>
                        <div className='flex mb-6 justify-center'>
                            <h2 className='text-xl sm:text-2xl font-semibold text-white/80 underline'>Sign Up</h2>
                        </div>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='w-full flex justify-center mb-4'>
                                <label htmlFor="image_upload" className='cursor-pointer'>
                                    {previewImage ? (
                                        <img src={previewImage} alt="profile" className='w-24 h-24 rounded-full object-cover' />
                                    ) : (
                                        <CgProfile className='w-24 h-24 text-gray-300' />
                                    )}
                                </label>
                                <input type="file" onChange={getImage} id='image_upload' name='image_upload' className='hidden' accept="image/*" />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="name" className='block text-gray-300 mb-2'>Name</label>
                                    <input type="text" value={formData.name} onChange={handleInputChange} id='name' name='name' placeholder='Enter Your name..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                                <div>
                                    <label htmlFor="email" className='block text-gray-300 mb-2'>Email</label>
                                    <input type="email" value={formData.email} onChange={handleInputChange} id='email' name='email' placeholder='Enter Your Email..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                                <div>
                                    <label htmlFor="password" className='block text-gray-300 mb-2'>Password</label>
                                    <input type="password" value={formData.password} onChange={handleInputChange} id='password' name='password' placeholder='Enter Your Password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                                <div>
                                    <label htmlFor="DOB" className='block text-gray-300 mb-2'>Date of Birth</label>
                                    <input type="date" value={formData.DOB} onChange={handleInputChange} id='DOB' name='DOB' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                                <div>
                                    <label htmlFor="gender" className='block text-gray-300 mb-2'>Gender</label>
                                    <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange} className='w-full px-3 py-2 rounded-lg border-2 focus:bg-[#5B0408] border-gray-300 text-gray-200 bg-transparent'>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="joinDate" className='block text-gray-300 mb-2'>Join Date</label>
                                    <input type="date" id='joinDate' value={formData.joinDate} onChange={handleInputChange} name='joinDate' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                                <div>
                                    <label htmlFor="experience" className='block text-gray-300 mb-2'>Experience (years)</label>
                                    <input type="number" id='experience' value={formData.experience} onChange={handleInputChange} name='experience' placeholder='Enter Your Experience..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                                <div>
                                    <label htmlFor="expertise" className='block text-gray-300 mb-2'>Expertise</label>
                                    <input type="text" id='expertise' value={formData.expertise} onChange={handleInputChange} name='expertise' placeholder='Enter Your Expertise..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="socialMedia" className='block text-gray-300 mb-2'>Social Media</label>
                                <input type="text" id='socialMedia' value={formData.socialMedia} onChange={handleInputChange} name='socialMedia' placeholder='Enter social media..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                            </div>

                            <div>
                                <label htmlFor="bio" className='block text-gray-300 mb-2'>Bio</label>
                                <textarea name="bio" value={formData.bio} onChange={handleInputChange} id="bio" placeholder='Tell us about yourself...' className='w-full min-h-[100px] max-h-[200px] px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent resize-y'></textarea>
                            </div>

                            <div className='w-full flex justify-center'>
                                <button className='bg-[#D90A14] text-white my-2 px-4 py-2 rounded-lg w-full hover:bg-[#ea4152] transition-colors duration-300' type='submit'>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <div className='w-full flex justify-center mt-4'>
                            <p className='text-sm text-gray-300'>
                                Already Registered? <Link to="/login" className='text-[#D90A14] underline cursor-pointer hover:text-[#ea4152] transition-colors duration-300'>Login</Link>
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

export default SignUp;
