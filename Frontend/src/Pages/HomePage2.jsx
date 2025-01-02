import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout'
import homeimg from '../assets/homeimg.png'
import { Services } from '../constants/Services.js';
import { Trainers } from '../constants/trainers.js';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Strength from "../assets/services/Strength.png"
import {FAQs} from '../constants/Faqs.js';

function HomePage2() {

    const [activeIndex,setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    }

    const Fas = FAQs.slice(5);


  return (
    <HomeLayout>
        <div className='w-full h-fit flex gap-20 justify-center items-center'>
            <div className='w-1/2 h-fit p-9 flex flex-col gap-5 justify-center items-center'>
                <div className='w-full h-1/2 flex justify-center items-center px-3'>
                    <span className='font-vazirmatn font-bold text-3xl'>Achieve Your <span className='font-aclonica text-4xl font-extrabold bg-gradient-to-r from-[#D20C13] to-[#CC4E17] bg-clip-text text-transparent'>FITNESS GOALS</span> with Slimnastics</span>
                </div>
                <div className='w-full h-1/2 flex flex-col gap-4'>
                    <p className='font-vazirmatn text-justify'>
                        Slimnastics offers a comprehensive fitness program that includes workouts, nutrition, and recovery sessions. Our team of certified trainers will guide you through each step to achieve your fitness goals.
                    </p>
                    <div className='w-full h-fit  flex gap-5 justify-center items-center'>
                        <button className='w-1/2 h-12 bg-[#D20C13] text-white font-vazirmatn rounded-full hover:bg-[#fc5258f2]'>
                            Start Your Journey
                        </button>
                        <button className='w-1/2 h-12  text-[#CC4E17] font-vazirmatn rounded-full border-2 border-[#CC4E17] hover:bg-[#fa5d29f2] hover:text-white'>
                            Explore Our Programs
                        </button>
                    </div>
                </div>

            </div>
            <div className='w-1/2 h-fit flex justify-center relative'>
                <div className='w-fit h-fit flex flex-col justify-center items-center gap-1 bg-[#1D1D1D] px-4 py-2 text-white font-aclonica rounded-3xl absolute top-10 left-10 border-2 border-[#CC4E17] shadow-lg shadow-[#CC4E17]'>
                    <p>+20</p>
                    <p>Coaches</p>
                </div>
                <div className='w-fit h-fit flex flex-col justify-center items-center gap-1 bg-[#1D1D1D] px-4 py-2 text-white font-aclonica rounded-3xl absolute bottom-10 left-24 border-2 border-[#CC4E17] shadow-lg shadow-[#CC4E17]'>
                    <p>24 * 7</p>
                    <p>Available</p>
                </div>
                <div className='w-fit h-fit flex flex-col justify-center items-center gap-1 bg-[#1D1D1D] px-4 py-2 text-white  rounded-3xl absolute bottom-36 right-24 font-aclonica border-2 border-[#CC4E17] shadow-lg shadow-[#CC4E17]'>
                    <p>50 + </p>
                    <p>Trainers</p>
                </div>
                <div className='w-3/5 h-full rounded-full bg-radial from-[#D20C13] via-[#CC4E17] to-transparent flex justify-center items-center '>
                <img src={homeimg} alt="Fitness" />
                </div>
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
                    <p className='font-aclonica text-xl text-[#D90A14] '>300+ <span className='text-base text-white'>Active Members</span></p>
                </div>
                <p className='h-1/3 items-center text-sm'>Join Our Thrieving Community</p>
            </div>
            <div className='w-1/4 h-full flex flex-col gap-0 items-center justify-center'>
                <div className='h-2/3 flex justify-center items-center'>
                    <p className='font-aclonica text-xl text-[#D90A14] '>24/7 <span className='text-base text-white'>Support Available</span></p>
                </div>
                <p className='h-1/3 items-center text-sm'>No Delay In Assistance You Need</p>
            </div>
            
        </div>

        <div className='w-full h-fit flex flex-col gap-5 justify-center items-center py-10'>
            <div>
                <p className='font-vazirmatn text-3xl text-center font-extrabold '>Our <span className=' bg-gradient-to-r from-[#D20C13] to-[#CC4E17] bg-clip-text text-transparent'>Services</span></p>
            </div>
            <div>
                <p className='font-vazirmatn text-center'>We offer a wide range of fitness services to cater to your specific needs and goals.</p>
            </div>
            <div>
                <div className='w-full h-fit grid grid-cols-4 gap-6 justify-center items-center px-10 text-white font-bold' >
                {Services.map((Service,index) => (
                    
                    <div key={index} className='relative p-4 w-full h-full flex bg-cover rounded-3xl shadow-lg shadow-[#CC4E17]' style={{ backgroundImage: `url(${Service.image})` }}
>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#D20C13]/60 via-[#CC4E17]/40 to-transparent rounded-3xl'>
                    </div>
                    <div className='relative z-10 w-2/3 h-full flex flex-col gap-3 justify-start items-start'>
                        <p className='text-xl font-bold font-aclonica text-[#D90A14]'>{Service.title}</p>
                        <p className='text-sm font-medium pb-6'>{Service.callToAction}</p>
                        <p className='text-xs font-light text-justify'>{Service.description}</p>
                    </div>
                    
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className='w-full h-fit flex flex-col gap-6 py-10 px-6'>
            <p className='text-2xl font-bold font-vazirmatn'>Meet Our <span className='text-[#D90A14]'>Trainers</span></p>
            <p className='py-4 text-lg flex justify-center font-vazirmatn font-medium'>"Transform your fitness journey with our expert trainers who are dedicated to helping you achieve your goals."</p>
            <div className='w-full h-fit grid grid-cols-4 gap-6 justify-center items-center px-10 font-bold' >
                {Trainers.map((Trainer,index) => (
                    <div key={index} className='h-fit flex flex-col gap-5 justify-center items-center bg-[#1D1D1D]/80 rounded-2xl shadow-lg p-6'>
                    <div className='w-full h-fit bg-radial from-[#D20C13]/20 via-[#CC4E17]/10 to-transparent flex justify-center items-center '>
                        <img src={homeimg} alt="Fitness" className='h-48' />
                    </div>
                    <div className='w-full h-fit flex flex-col gap-2'>
                    <p className='font-vazirmatn font-extrabold text-xl text-white'>{Trainer.name}</p>
                    <p className='text-sm text-white/50'>{Trainer.expertise}</p>
                    </div>
                    
                </div>
                )
                )}
            </div>
            <div className='w-full h-fit flex gap-4 justify-center items-center'>
                <button className='px-3 py-1 border-2 border-[#D90A14] rounded-full text-[#D90A14] font-thin flex items-center gap-1'>View More <IoIosArrowDropright />
                </button>
            </div>
            
        </div>

        <div className='w-full h-fit flex flex-col gap-6 justify-center items-center py-10 px-6'>
            <div className='w-full h-fit flex flex-col gap-5 justify-center items-center'>
                <p className='font-vazirmatn font-extrabold text-3xl'>What Our <span className='text-[#D90A14]'>Customers Say</span></p>
                <p className='font-vazirmatn font-medium text-lg'>See what our members are saying about our amazing trainers!</p>
            </div>
           <div className='w-full h-fit flex gap-5 justify-between'>
                <div className='w-8/12 h-96 flex gap-6 justify-end relative' >
                    <div className='w-1/3 h-96'> 
                        <img src={Strength} alt="image" className='h-full object-cover rounded-lg shadow-md'/>
                    </div>
                    <div className='w-2/3 h-fit flex flex-col gap-2 rounded-3xl bg-[#D90A14]/80 shadow-lg px-6 pt-6 mt-48'>
                        <div className='w-full h-16 flex flex-col'>
                            <p className='font-vazirmatn text-2xl font-extrabold text-white'>John Doe</p>
                            <p className='font-vazirmatn text-sm font-medium text-white/60'>Strength Training</p>
                        </div>
                        <div className='w-full h-24 overflow-hidden pr-2 pb-2 text-white font-extralight'>
                            <p className='font-vazirmatn text-sm text-justify'>eJohn's strength training sessions have transformed my fitness level. His dedication and expertise are unmatchd!eJohn's strength training sessions have transformed my fitness level. His dedication and expertise are unmatchd!eJohn's strength training sessions have transformed my fitness level. His dedication and expertise are unmatchd!</p>
                        </div>
                    </div>
                </div>
                <div className='w-4/12 h-96 flex gap-6 justify-center items-center'>
                    <div className='w-full h-96 relative'>
                        <div className='absolute flex bottom-0 gap-4'>
                        <button className='w-12 h-12 border-[#D90A14] border-2  rounded-xl flex justify-center items-center hover:bg-[#D90A14]'>
                            <IoIosArrowDropleft className='text-[#D90A14] text-2xl hover:text-white'/>
                        </button>
                        <button className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14]'>
                            <IoIosArrowDropright className='text-[#D90A14] text-2xl hover:text-white'/>
                        </button>
                        </div>
                    </div>
                    <div className='w-full h-96 bg-[#D90A14]/80 ml-5 rounded-3xl overflow-hidden'>
                        <img src={Strength} alt="next" className='h-full object-cover rounded-lg shadow-md'/>
                    </div>
                    <div className='w-full h-96 ml-5 bg-[#D90A14]/80 rounded-3xl overflow-hidden'>
                        <img src={Strength} alt="next" className='h-full object-cover rounded-lg shadow-md'/>
                    </div>
                </div>
           </div>
        </div>

        <div className="w-9/12 mx-auto my-10">
            <h2 className="text-3xl font-extrabold text-center mb-6">FAQ</h2>
            <div className="space-y-4">
                {Fas.map((faq, index) => (
                <div
                    key={index}
                    className="border border-red-500 rounded-lg overflow-hidden shadow-md"
                >
                    {/* Question */}
                    <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                    >
                    <p className="font-semibold">{faq.question}</p>
                    <span
                        className={`transform transition-transform ${
                        activeIndex === index ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        ▼
                    </span>
                    </div>

                    {/* Answer */}
                    {activeIndex === index && (
                    <div className="p-4 text-white/50">
                        <p>{faq.answer}</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
        <div className='my-5 flex justify-center items-center'>
            <button className='border-2 border-[#D90A14] px-3 py-1 rounded-full text-[#D90A14] hover:bg-[#d90a14c6] hover:text-white font-extralight'>View More</button>
        </div>
    </div>

    </HomeLayout>
  )
}

export default HomePage2