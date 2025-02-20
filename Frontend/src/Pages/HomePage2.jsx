import React, { useState, useEffect } from 'react'
import HomeLayout from '../layout/HomeLayout'
import homeimg from '../assets/homeimg.png'
import { Services } from '../constants/Services.js';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Strength from "../assets/services/Strength.png"
import {FAQs} from '../constants/Faqs.js';
import { useState as useState2, useEffect as useEffect2 } from 'react';
import { AnimatePresence } from 'framer-motion';
import {Feedback} from "../constants/Feedback.js";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allTrainers } from '../Redux/Slices/UserSlice.js';
import gym1 from "../assets/home/gym1.jpg";
import gym2 from "../assets/home/gym2.jpg";
import gym3 from "../assets/home/gym3.jpg";
import gym4 from "../assets/home/gym4.jpg";
import gym5 from "../assets/home/gym5.jpg";
import Carousel from '../components/Carousel.jsx';

function HomePage2() {

    const dispatch = useDispatch();
    const trainers = useSelector(state => state.user.allTrainersData)

    useEffect2(() => {
        const fetchAllTrainers = async() => {
            await dispatch(allTrainers())
        }
        fetchAllTrainers();
    },[])

    const images = [gym1,gym2,gym3,gym4,gym5];

    
    const Trainers = trainers?.slice(0,4) || [];

    const [activeIndex, setActiveIndex] = useState(null);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const {isLoggedIn} = useSelector(state => state.auth)
    const isDarkMode = useSelector(state => state.auth.darkmode);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    }

    const Fas = FAQs.slice(5);

    const nextTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) => 
            prevIndex === Feedback.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) => 
            prevIndex === 0 ? Feedback.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextTestimonial, 5000); // Auto-cycle every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <HomeLayout>
            {/* Hero Section */}
            <section className='w-full px-4 py-8 md:py-16 lg:py-20'>
                <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center'>
                    <div className='w-full lg:w-1/2 flex flex-col gap-5 justify-center items-center text-center lg:text-left'>
                        <h1 className='font-vazirmatn font-bold text-2xl sm:text-3xl lg:text-4xl'>
                            Achieve Your <span className='font-aclonica text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#D20C13] to-[#CC4E17] bg-clip-text text-transparent'>FITNESS GOALS</span> with Oxygen Gym
                        </h1>
                        <p className='font-vazirmatn text-sm sm:text-base'>
                            Oxygen Gym offers a comprehensive fitness program that includes workouts, nutrition, and recovery sessions. Our team of certified trainers will guide you through each step to achieve your fitness goals.
                        </p>
                        <div className='w-full flex flex-col sm:flex-row gap-4 justify-center items-center'>
                            <button className='w-full sm:w-auto px-6 py-3 bg-[#D20C13] text-white font-vazirmatn rounded-full hover:bg-[#fc5258f2] transition-colors duration-300'>
                            {isLoggedIn ? <Link to={"/profile"}> Visit Profile </Link> : <Link to={"/login"}>Start Your Journey</Link>}
                            </button>
                            <button className='w-full sm:w-auto px-6 py-3 text-[#CC4E17] font-vazirmatn rounded-full border-2 border-[#CC4E17] hover:bg-[#fa5d29f2] hover:text-white transition-colors duration-300'>
                                <Link to={"/plan"}>Explore Our Programs</Link>
                            </button>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 flex justify-center relative'>
                        <InfoBadge text={['+20', 'Coaches']} position="top-2 left-2 sm:top-10 sm:left-10" />
                        <InfoBadge text={['24 * 7', 'Available']} position="bottom-2 left-2 sm:bottom-10 sm:left-24" />
                        <InfoBadge text={['50 +', 'Trainers']} position="bottom-20 right-2 sm:bottom-36 sm:right-24" />
                        <div className='w-4/5 sm:w-3/5 aspect-square rounded-full bg-gradient-radial from-[#D20C13] via-[#CC4E17] to-transparent flex justify-center items-center'>
                            <img src={homeimg} alt="Fitness" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Carousal ELement  */}
            <section className='w-full px-4 pb-10'>
                <div className='max-w-7xl mx-auto flex flex-col items-center'>
                <h2 className='font-vazirmatn font-extrabold text-3xl text-center mb-4'>Our <span className='text-[#D90A14]'>Gallery</span></h2>
                    <Carousel images={images} />
                </div>
            </section>

            {/* Statistics Section */}
            <section className='w-full px-4 py-10'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <StatItem title="98%" subtitle="Client Satisfaction" description="Our Members Love Their Results and Experience" />
                    <StatItem title="300+" subtitle="Active Members" description="Join Our Thriving Community" />
                    <StatItem title="24/7" subtitle="Support Available" description="No Delay In Assistance You Need" />
                </div>
            </section>

            {/* Services Section */}
            <section className='w-full px-4 py-10'>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='font-vazirmatn text-3xl text-center font-extrabold mb-4'>Our <span className='bg-gradient-to-r from-[#D20C13] to-[#CC4E17] bg-clip-text text-transparent'>Services</span></h2>
                    <p className='font-vazirmatn text-center mb-8'>We offer a wide range of fitness services to cater to your specific needs and goals.</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {Services.map((Service, index) => (
                            <ServiceCard key={index} service={Service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trainers Section */}
            <section className='w-full px-4 py-10'>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='text-2xl font-bold font-vazirmatn mb-4'>Meet Our <span className='text-[#D90A14]'>Trainers</span></h2>
                    <p className='text-lg text-center font-vazirmatn font-medium mb-8'>"Transform your fitness journey with our expert trainers who are dedicated to helping you achieve your goals."</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {Trainers && Trainers.map((Trainer, index) => (
                            <TrainerCard key={index} trainer={Trainer} />
                        ))}
                        {(!Trainers || Trainers.length === 0) && <span className='text-lg text-center font-vazirmatn'>No trainers found...</span> }
                    </div>
                    <div className='flex justify-center mt-8'>
                        <button className='px-4 py-2 border-2 border-[#D90A14] rounded-full text-[#D90A14] font-thin flex items-center gap-1 hover:bg-[#D90A14] hover:text-white transition-colors duration-300'>
                            <Link to={"/trainers"} className='flex items-center gap-2'>View More <IoIosArrowDropright /></Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='w-full px-4 py-10'>
                <div className='max-w-7xl mx-auto'>
                    <h2 className='font-vazirmatn font-extrabold text-3xl text-center mb-4'>What Our <span className='text-[#D90A14]'>Customers Say</span></h2>
                    <p className='font-vazirmatn font-medium text-lg text-center mb-8'>See what our members are saying about our amazing trainers!</p>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        <div className='w-full lg:w-8/12'>
                            <AnimatePresence mode="wait">
                                <FeedbackCard key={currentTestimonialIndex} feedback={Feedback[currentTestimonialIndex]} />
                            </AnimatePresence>
                        </div>
                        <div className='w-full lg:w-4/12 flex flex-col gap-4'>
                            <TestimonialNavigation onPrev={prevTestimonial} onNext={nextTestimonial} />
                            <div className='hidden lg:flex gap-4'>
                                <TestimonialPreview testimonial={Feedback[(currentTestimonialIndex + 1) % Feedback.length]} />
                                <TestimonialPreview testimonial={Feedback[(currentTestimonialIndex + 2) % Feedback.length]} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className='w-full px-4 py-10'>
                <div className='max-w-3xl mx-auto'>
                    <h2 className="text-3xl font-extrabold text-center mb-6">FAQ</h2>
                    <div className="space-y-4">
                        {Fas.map((faq, index) => (
                            <FAQItem key={index} faq={faq} index={index} activeIndex={activeIndex} toggleFAQ={toggleFAQ} />
                        ))}
                    </div>
                    <div className='mt-8 flex justify-center'>
                        <button className='px-4 py-2 border-2 border-[#D90A14] rounded-full text-[#D90A14] hover:bg-[#d90a14c6] hover:text-white font-extralight transition-colors duration-300'>
                            <Link to={"/faqs"} className='flex items-center gap-2'>View More <IoIosArrowDropright /></Link>
                        </button>
                    </div>
                </div>
            </section>
        </HomeLayout>
    )
}

function InfoBadge({ text, position }) {
    return (
        <div className={`w-fit h-fit flex flex-col justify-center items-center gap-1 bg-transparent px-4 py-2 font-aclonica rounded-3xl absolute ${position} border-2 border-[#CC4E17] shadow-lg shadow-[#CC4E17]`}>
            <p>{text[0]}</p>
            <p>{text[1]}</p>
        </div>
    );
}

function StatItem({ title, subtitle, description }) {
    return (
        <div className='flex flex-col items-center text-center p-4 border-b-2 sm:border-b-0 sm:border-r-2 border-[#D90A14] last:border-0'>
            <p className='font-aclonica text-xl text-[#D90A14]'>{title} <span className='text-base text-white'>{subtitle}</span></p>
            <p className='text-sm mt-2'>{description}</p>
        </div>
    );
}

function ServiceCard({ service }) {
    return (
        <div className='relative p-4 w-full h-full flex bg-cover rounded-3xl shadow-lg shadow-[#CC4E17] transition-all hover:scale-110 duration-100 transform' style={{ backgroundImage: `url(${service.image})` }}>
            <div className='absolute inset-0 bg-gradient-to-t from-[#D20C13]/60 via-[#CC4E17]/40 to-transparent rounded-3xl'></div>
            <div className='relative z-10 w-full h-full flex flex-col gap-3 justify-start items-start'>
                <p className='text-xl font-bold font-aclonica text-[#D90A14]'>{service.title}</p>
                <p className='text-sm font-medium pb-6 text-white'>{service.callToAction}</p>
                <p className='text-xs font-light text-justify text-white'>{service.description}</p>
            </div>
        </div>
    );
}

function TrainerCard({ trainer }) {
    return (
        <div className='h-fit flex flex-col gap-5 justify-center items-center bg-gradient-to-tr from-[#D20C13] via-[#CC4E17] to-transparent rounded-2xl shadow-custom-shadow border-2 border-[#D90A14] transition-all hover:scale-105 duration-100 transform'>
            <div className='w-full h-48  flex justify-center items-center'>
                <img src={trainer.avatar} alt="Fitness" className='h-full object-cover' />
            </div>
            <div className='w-full h-fit flex flex-col gap-2 p-2'>
                <p className='font-vazirmatn font-extrabold text-xl text-white'>{trainer.name}</p>
                <p className='text-sm text-white'>{trainer.experience}+years</p>
                <p className='text-sm text-white/50'>{trainer.expertise}</p>

            </div>
        </div>
    );
}

function FeedbackCard({ feedback }) {
    return (
        <div className='flex flex-col md:flex-row gap-6'>
            <div className='w-full md:w-1/3 h-64 md:h-auto'>
                <img src={Strength} alt={feedback.name} className='w-full h-full object-cover rounded-lg shadow-md' />
            </div>
            <div className='w-full md:w-2/3 flex flex-col gap-2 rounded-3xl bg-[#D90A14]/80 shadow-lg p-6'>
                <div className='flex flex-col'>
                    <p className='font-vazirmatn text-2xl font-extrabold text-white'>{feedback.name}</p>
                    <p className='font-vazirmatn text-sm font-medium text-white/60'>{feedback.expertise}</p>
                </div>
                <div className='overflow-hidden pr-2 pb-2 text-white font-extralight'>
                    <p className='font-vazirmatn text-sm text-justify'>{feedback.feedback}</p>
                </div>
            </div>
        </div>
    );
}

function TestimonialNavigation({ onPrev, onNext }) {
    return (
        <div className='flex justify-center gap-4'>
            <button 
                className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14] transition-colors duration-300'
                onClick={onPrev}
            >
                <IoIosArrowDropleft className='text-[#D90A14] text-2xl hover:text-white'/>
            </button>
            <button 
                className='w-12 h-12 border-[#D90A14] border-2 rounded-xl flex justify-center items-center hover:bg-[#D90A14] transition-colors duration-300'
                onClick={onNext}
            >
                <IoIosArrowDropright className='text-[#D90A14] text-2xl hover:text-white'/>
            </button>
        </div>
    );
}

function FAQItem({ faq, index, activeIndex, toggleFAQ }) {
    const isDarkMode = useSelector(state => state.auth.darkmode);
    
    return (
        <div className="border border-red-500 rounded-lg overflow-hidden shadow-md">
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
            {activeIndex === index && (
                <div className={`p-4 ${isDarkMode ? "text-white/50" : "text-black"}`}>
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
}

function TestimonialPreview({ testimonial }) {
    return (
        <div className='w-full h-48 bg-[#D90A14]/80 rounded-3xl overflow-hidden relative'>
            <img src={Strength} alt={testimonial.name} className='h-full w-full object-cover rounded-lg shadow-md'/>
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-end p-4'>
                <p className='text-white text-sm font-semibold'>{testimonial.name}</p>
            </div>
        </div>
    );
}

export default HomePage2;

