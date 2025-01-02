import React from 'react'
import HomeLayout from '../layout/HomeLayout'
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from "react-icons/bs"
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function ContactUs() {
  return (
    <HomeLayout>
        <div className='w-full h-fit flex flex-col gap-5 p-10'>
        <div className='w-full h-fit flex flex-col gap-4 justify-center items-center'>
            <h1 className='text-3xl font-rubik text-[#D90A14]'>Contact <span className='text-white'> Us</span></h1>
            <p className='font-vazirmatn text-sm'>Any Questions or Remarks?<span className='text-[#D90A14]'>Just Write us a message!</span> </p>
        </div>
        <div className='w-full h-fit flex gap-6 justify-center items-center'>
            <div className='w-1/3 h-full p-6 rounded-2xl bg-[#5B0408]/30 flex flex-col gap-2'>
                <p className='font-vazirmatn text-lg font-bold'>Contact Information</p>
                <p className='font-vazirmatn text-xs font-semibold'>Reach to us!!</p>
                <div className='w-full h-fit py-10 flex flex-col gap-5'>
                    <p className="flex gap-3"><IoLocationOutline />Ranchi, India</p>
                    <p className="flex  gap-3"><FaPhoneAlt />+91 81020 xxxxx</p>
                    <p className="flex gap-3"><CiMail />igniterofficial@gmail.com</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <BsFacebook className="text-white"/>
                    </div>
                    <div className="w-10 h-1 rounded-full flex items-center justify-center">
                        <BsInstagram className="text-white"/>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <BsTwitter className="text-white"/>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <BsLinkedin className="text-white"/>
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-full p-6 rounded-2xl flex flex-col gap-2'>
            <form >
                <div className='w-full h-fit grid grid-cols-2 gap-6'>
                <div className='mb-4 pr-6'>
                    <label htmlFor="first" className='block text-gray-300/35'>First Name</label>
                    <input type="text" id='first' name='first' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                </div>
                <div className='mb-4 pl-6'>
                    <label htmlFor="last" className='block text-gray-300/35'>Last Name</label>
                    <input type="text" id='last' name='last' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                </div>
                </div>
                <div className='w-full h-fit grid grid-cols-2 gap-6'>
                <div className='mb-4 pr-6'>
                    <label htmlFor="email" className='block text-gray-300/35'>Email</label>
                    <input type="email" id='email' name='email' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                </div>
                <div className='mb-4 pl-6'>
                    <label htmlFor="phone" className='block text-gray-300/35'>Phone Number</label>
                    <input type="number" id='phone' name='phone' className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-transparent outline-none' />
                </div>
                </div>

                <div className='font-vazirmatn my-5 text-sm flex gap-5 h-fit'>
                    <div>
                        <input type="radio" name="subject" id="help" value="help" />
                        <label htmlFor="help" className='ml-2'>Help</label>
                    </div>
                    
                    <div>
                        <input type="radio" name="subject" id="suggestion" value="suggestion" />
                        <label htmlFor="suggestion" className='ml-2'>Suggestion</label>

                    </div>
                    <div>
                        <input type="radio" name="subject" id="feedback" value="feedback" />
                        <label htmlFor="feedback" className='ml-2'>Feedback</label>
                    </div>

                    <div>
                        <input type="radio" name="subject" id="Complaint" value="complaint" />
                        <label htmlFor="Complaint" className='ml-2'>Complaint</label>
                    </div>
                </div>
                
                <label htmlFor="message" className='block text-gray-300/35'>Message</label>
                <textarea name="message" id="message" className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-b-2 bg-transparent outline-none'></textarea>
                
                <div className='w-full flex justify-end'>
                    <button className='border-2 border-[#D90A14]  text-[#D90A14] my-2 px-16 py-2 rounded-lg hover:bg-[#ea4152]' type='submit'>Send Message</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    </HomeLayout>
  )
}

export default ContactUs