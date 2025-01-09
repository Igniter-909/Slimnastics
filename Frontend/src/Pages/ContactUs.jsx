import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs"
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { sendFeedback } from '../Redux/Slices/AuthSlice';

function ContactUs() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    type: "Feedback"
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendFeedback({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      message: formData.message,
      type: formData.type
    }));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      type: "Feedback"
    });
  }

  return (
    <HomeLayout>
      <div className='w-full min-h-screen flex flex-col gap-5 p-4 sm:p-6 md:p-10'>
        <div className='w-full flex flex-col gap-4 justify-center items-center mb-8'>
          <h1 className='text-2xl sm:text-3xl font-rubik text-[#D90A14]'>Contact <span className='text-white'>Us</span></h1>
          <p className='font-vazirmatn text-sm sm:text-base text-center'>Any Questions or Remarks? <span className='text-[#D90A14]'>Just Write us a message!</span></p>
        </div>
        <div className='w-full flex flex-col lg:flex-row gap-6 justify-center items-start'>
          <div className='w-full lg:w-1/3 p-6 rounded-2xl bg-[#5B0408]/30 flex flex-col gap-2'>
            <p className='font-vazirmatn text-lg font-bold'>Contact Information</p>
            <p className='font-vazirmatn text-xs font-semibold'>Reach to us!!</p>
            <div className='w-full py-6 sm:py-10 flex flex-col gap-5'>
              <p className="flex gap-3 items-center"><IoLocationOutline />Ranchi, India</p>
              <p className="flex gap-3 items-center"><FaPhoneAlt />+91 81020 xxxxx</p>
              <p className="flex gap-3 items-center"><CiMail />igniterofficial@gmail.com</p>
            </div>
            <div className='flex gap-4 items-center'>
              <SocialIcon Icon={BsFacebook} />
              <SocialIcon Icon={BsInstagram} />
              <SocialIcon Icon={BsTwitter} />
              <SocialIcon Icon={BsLinkedin} />
            </div>
          </div>
          <div className='w-full lg:w-1/2 p-6 rounded-2xl flex flex-col gap-2'>
            <form onSubmit={handleSubmit}>
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <InputField label="First Name" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
                <InputField label="Last Name" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField label="Phone Number" name="phoneNumber" type="number" value={formData.phoneNumber} onChange={handleChange} />
              </div>

              <div className='font-vazirmatn my-5 text-sm flex flex-wrap gap-5 h-fit'>
                <RadioButton name="type" id="Help" label="Help" checked={formData.type === "Help"} onChange={handleChange} />
                <RadioButton name="type" id="Suggestion" label="Suggestion" checked={formData.type === "Suggestion"} onChange={handleChange} />
                <RadioButton name="type" id="Feedback" label="Feedback" checked={formData.type === "Feedback"} onChange={handleChange} />
                <RadioButton name="type" id="Complaint" label="Complaint" checked={formData.type === "Complaint"} onChange={handleChange} />
              </div>
              
              <div className='mb-4'>
                <label htmlFor="message" className='block text-red-500 mb-2'>Message</label>
                <textarea 
                  name="message" 
                  id="message"
                  value={formData.message}
                  onChange={handleChange} 
                  className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-b-2 bg-transparent outline-none'
                ></textarea>
              </div>
              
              <div className='w-full flex justify-end'>
                <button className='border-2 border-[#D90A14] text-[#D90A14] my-2 px-8 sm:px-16 py-2 rounded-lg hover:bg-[#ea4152] hover:text-white transition-colors duration-300' type='submit'>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

function SocialIcon({ Icon }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#D90A14]/20 transition-colors duration-300">
      <Icon className="text-white text-xl" />
    </div>
  );
}

function InputField({ label, name, type, value, onChange }) {
  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-red-400 mb-2'>{label}</label>
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value}
        onChange={onChange}
        className='w-full py-2 border-b-2 border-gray-300 bg-transparent outline-none' 
      />
    </div>
  );
}

function RadioButton({ name, id, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input 
        type="radio" 
        name={name} 
        id={id} 
        value={id} 
        checked={checked}
        onChange={onChange}
        className="mr-2" 
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default ContactUs;

