import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { Features } from '../constants/features.js'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser } from '../Redux/Slices/AuthSlice.js';

function SignUp() {
    const features = Features.slice(0,4);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',
        DOB:"",
        gender: '',
        joinDate:"",
        experience:"",
        expertise:"",
        socialMedia:'',
        bio:"",
        avatar: '',
        role: 'User'
    })

    const [previewImage, setPreviewImage] = useState("");
    

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    
    function getImage(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setFormData({
                ...formData,
                avatar: uploadedImage
            })
        };
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function () {
            setPreviewImage(this.result)
        })
    }

    async function handleSubmit (e){
        e.preventDefault();
        const Data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            Data.append(key, value);
        });
        const res = await dispatch(signupUser(Data));
        if(res?.payload?.success){
            setFormData({
                name: "",
                email: '',
                password: '',
                DOB:"",
                gender: '',
                joinDate:"",
                experience:"",
                expertise:"",
                socialMedia:'',
                bio:"",
                avatar: '',
                role: 'user'
            });
            navigate("/");
        };
        setFormData("");
    }

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
        </div>
        <div className='w-full h-fit flex justify-center items-center mt-6'>
                <div className='w-1/2 h-fit flex flex-col bg-[#5B0408] rounded-lg p-8 shadow-custom-shadow'>
                    <div className='flex mb-6 justify-center items-center'>
                        <button className={`text-xl font-semibold px-4 text-white/80 underline`} >Sign Up</button>
                    </div>
                    <div className='w-full h-fit flex gap-6 '>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full h-fit mb-2 flex flex-col justify-center items-center'>
                            <label htmlFor="image_upload" className='cursor-pointer'>
                                {previewImage? (
                                    <img src={previewImage} alt="image" className='w-24 h-24 overflow-hidden rounded-full' />
                                ) : (
                                    <CgProfile className='w-24 h-24' />
                                )}
                            </label>
                            <input type="file" onChange={getImage} id='image_upload' name='image_upload' className='hidden' />
                     </div>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block text-gray-300 mb-2'>Name</label>
                            <input type="text" value={formData.name} onChange={handleInputChange} id='name' name='name' placeholder='Enter Your name..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='flex gap-5 w-full'>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor="email" className='block text-gray-300 mb-2'>Email</label>
                            <input type="email" value={formData.email} onChange={handleInputChange} id='email' name='email' placeholder='Enter Your Email..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor="password" className='block text-gray-300 mb-2'>Password</label>
                            <input type="password" value={formData.password} onChange={handleInputChange} id='password' name='password' placeholder='Enter Your Password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        </div>
                        
                        <div className='flex gap-5'>
                        <div className='w-full mb-4'>
                            <label htmlFor="DOB" className='block text-gray-300 mb-2'>DOB</label>
                            <input type="date" value={formData.DOB} onChange={handleInputChange} id='DOB' name='DOB' placeholder='Enter Your DOB..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="gender" className='block text-gray-300 mb-2'>Gender</label>
                            <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange} className='w-full px-3 py-2 rounded-lg border-2 focus:bg-[#5B0408] border-gray-300 text-gray-200 bg-transparent'>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        </div>
                        
                        <div className='flex gap-5'>
                        <div className='w-full mb-4'>
                            <label htmlFor="joinDate" className='block text-gray-300 mb-2'>JoinDate</label>
                            <input type="date" id='joinDate' value={formData.joinDate} onChange={handleInputChange} name='joinDate' placeholder='Enter Your JoinDate..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="experience" className='block text-gray-300 mb-2'>Experience</label>
                            <input type="number" id='experience' value={formData.experience} onChange={handleInputChange} name='experience' placeholder='Enter Your Experience..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="expertise" className='block text-gray-300 mb-2'>Expertise</label>
                            <input type="text" id='expertise' value={formData.expertise} onChange={handleInputChange} name='expertise' placeholder='Enter Your Expertise..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="socialMedia" className='block text-gray-300 mb-2'>Social Media</label>
                            <input type="text" id='socialMedia' value={formData.socialMedia} onChange={handleInputChange} name='socialMedia' placeholder='Enter social media..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>``
                        <div className="w-full mb-4">
                        <label htmlFor="bio" className='block text-gray-300/35'>Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleInputChange} id="bio" className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-2 rounded-lg bg-transparent outline-none'></textarea>
                
                        </div>
                        <div className='w-full flex justify-center'>
                            <button className='bg-[#D90A14] text-white my-2 px-4 py-2 rounded-lg w-full hover:bg-[#ea4152]' type='submit'>Sign Up</button>
                        </div>
                    </form>
                    </div>
                    <div className='w-full flex justify-center mt-4'>
                        <p className='text-sm'>Already Registered?  <span className='text-[#D90A14] underline cursor-pointer link link-hover'><Link to={"/login"}>Login</Link></span></p>
                    </div>
                </div>
        </div>
        <div>
        <div className='w-full h-fit grid grid-cols-2 gap-4 mt-6'>
                {features.map((feature, index) => (
                    <div key={index} className='w-full h-full flex flex-col justify-center items-center border-x-2 border-[#D90A14]  rounded-lg p-4 shadow-custom-shadow'>
                    <p className='font-aclonica font-bold'>{feature.title}</p>
                    <p className='font-vazirmatn text-sm leading-6 text-center'>{feature.description}</p>
                </div>
                ))}
            </div>
        </div>
    </div>
    </HomeLayout>
  )
}

export default SignUp