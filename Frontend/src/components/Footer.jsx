import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin} from "react-icons/bs"
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function Footer() {
    return(
        <div className="w-full h-96 px-24 py-16 flex gap-4">
            <div className="w-5/12 h-64 flex flex-col gap-2">
                <div className="w-full h-10 flex flex-col">
                    <div className="w-full h-6 flex gap-2">
                        <div className="w-9 h-6 rounded-s bg-[#D90A14]"></div>
                        <div className="h-6 font-semibold text-lg font-vazirmatn">Slim<span className="text-[#D90A14]">nastics</span></div>
                    </div>
                    <div className="w-full font-vazirmatn h-4 tracking-widest text-[10px]">
                        Transform Your Body
                    </div>
                </div>
                <div className="w-full h-36 leading-6 font-vazirmatn">
                Transform your body with Slimnastics Gym! With over <span className="text-[#D90A14]">5 years</span>  of experience, our expert coaches provide top-notch training to help you achieve your fitness goals. <span className="text-[#D90A14]">Join our community</span> and start your journey to a healthier, fitter you today!
                </div>
                <div className="w-full h-10 flex gap-3 justify-around">
                    <div className="w-10 h-10 bg-[#D90A14] rounded-full flex items-center justify-center">
                        <BsFacebook className="text-white"/>
                    </div>
                    <div className="w-10 h-10 bg-[#D90A14] rounded-full flex items-center justify-center">
                        <BsInstagram className="text-white"/>
                    </div>
                    <div className="w-10 h-10 bg-[#D90A14] rounded-full flex items-center justify-center">
                        <BsTwitter className="text-white"/>
                    </div>
                    <div className="w-10 h-10 bg-[#D90A14] rounded-full flex items-center justify-center">
                        <BsLinkedin className="text-white"/>
                    </div>
                </div>
            </div>
            <div className="w-3/12 h-64">
            </div>
            <div className="w-6/12 h-64 flex gap-2">
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <span className="text-[#D90A14] font-vazirmatn font-bold text-lg">Company</span>
                    <div className="flex flex-col gap-3 mt-3 items-center font-vazirmatn">
                        <Link to={"/about"}>About Us</Link>
                        <Link to={"/careers"}>Our Services</Link>
                        <Link to={"/contact"}>Blog</Link>
                        <Link to={"/blog"}>Careers</Link>
                        <Link to={"/faq"}>Contact Us</Link>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <span className="text-[#D90A14] font-vazirmatn font-bold text-lg">Resources</span>
                    <div className="flex flex-col gap-3 mt-3 items-center font-vazirmatn">
                        <Link to={"/about"}>Success Stories</Link>
                        <Link to={"/careers"}>Gym Plans</Link>
                        <Link to={"/contact"}>Community</Link>
                        <Link to={"/blog"}>FAQs</Link>
                        <Link to={"/faq"}>Workouts</Link>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col ml-5 justify-center items-center">
                    <span className="text-[#D90A14] font-vazirmatn font-bold text-lg">Contact Us</span>
                    <div className="flex flex-col gap-3 mt-3 items-start font-vazirmatn">
                        <p className="flex gap-3"><IoLocationOutline />Ranchi, India</p>
                        <p className="flex  gap-3"><FaPhoneAlt />+91 81020 xxxxx</p>
                        <p className="flex gap-3"><CiMail />igniterofficial@gmail.com</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer;