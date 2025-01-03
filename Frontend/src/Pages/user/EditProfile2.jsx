import React from 'react'
import { CgProfile } from "react-icons/cg";
import cover2 from "../../assets/shop/cover2.jpg";

function EditPage() {
  return (
    <div className='w-full h-fit p-6 pb-0 flex flex-col border-2 rounded-lg border-white/60 mx-5'>
          <p className='w-full h-fit text-3xl font-vazirmatn'>Edit Profile</p>
          <div className='w-full h-fit flex gap-6 p-6 '>
            <form >
                <label htmlFor="image_upload">     
                    <img src={cover2} alt="avatar" className='overflow-hidden h-56 w-56 rounded-full' />
                </label>
                <input type="file" id='image_upload' name='image_upload' accept='.png .jpg .jpeg .svg' className='hidden' />
                <button type="submit" className='mt-6 px-3 py-1 font-extralight border-2 border-white/30 rounded-lg hover:bg-white hover:font-bold hover:text-black'>Upload</button>
  
            </form>
            <div className='w-3/4 h-fit flex flex-col gap-6 '>
              <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-2'>
                <form>
                    <div className='mb-4'>
                        <label htmlFor="name" className='block text-gray-300 mb-2'>Name</label>
                        <input type="text" id='name' name='name' placeholder='Enter Your name..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                    </div>
                    <div className='flex gap-5 w-full'>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor="oldPassword" className='block text-gray-300 mb-2'>Old Password</label>
                            <input type="password" id='oldPassword' name='oldPassword' placeholder='Enter old password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor="newpassword" className='block text-gray-300 mb-2'>New Password</label>
                            <input type="password" id='newpassword' name='newpassword' placeholder='Enter new password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                    </div>
  
                    <div className='flex gap-5'>
                        <div className='w-full mb-4'>
                            <label htmlFor="gender" className='block text-gray-300 mb-2'>Gender</label>
                            <select name="gender" id="gender" className='w-full px-3 py-2 rounded-lg border-2 focus:bg-[#5B0408] border-gray-300 text-gray-200 bg-transparent'>
                               <option value="">Select Gender</option>
                                 <option value="Male">Male</option>
                                 <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="Experience" className='block text-gray-300 mb-2'>Experience</label>
                            <input type="number" id='Experience' name='Experience' placeholder='Enter Your Experience..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                        <label htmlFor="Expertise" className='block text-gray-300 mb-2'>Expertise</label>
                             <input type="text" id='Expertise' name='Expertise' placeholder='Enter Your Expertise..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                    </div>
                    <div className='w-full mb-4'>
                        <label htmlFor="social" className='block text-gray-300 mb-2'>Social Media</label>
                             <input type="text" id='social' name='social' placeholder='Enter social media..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                        <label htmlFor="bio" className='block text-gray-300/35'>Bio</label>
                        <textarea name="bio" id="bio" className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-2 rounded-lg bg-transparent outline-none'></textarea>
                </div>
                        <div className='w-full flex justify-center'>
                            <button className='bg-[#D90A14] text-white my-2 px-4 py-2 rounded-lg w-full hover:bg-[#ea4152]' type='submit'>Update</button>
                    </div>
                </form>
            </div>
                

        </div>
    </div>
  </div>
  )
}

export default EditPage;