import React from "react"

import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function Footer() {
    return (
        <footer className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-4">
                <div className="w-full lg:w-5/12 flex flex-col gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-6 rounded-s bg-[#D90A14]"></div>
                            <div className="h-6 font-semibold text-lg font-vazirmatn">Oxygen<span className="text-[#D90A14]">Gym</span></div>
                        </div>
                        <div className="font-vazirmatn tracking-widest text-[10px]">
                            Transform Your Body
                        </div>
                    </div>
                    <div className="font-vazirmatn text-sm sm:text-base leading-6">
                        Transform your body with Oxygen Gym Gym! With over <span className="text-[#D90A14]">5 years</span> of experience, our expert coaches provide top-notch training to help you achieve your fitness goals. <span className="text-[#D90A14]">Join our community</span> and start your journey to a healthier, fitter you today!
                    </div>
                    <div className="flex gap-3 justify-start sm:justify-around">
                        <SocialIcon Icon={BsFacebook} />
                        <SocialIcon Icon={BsInstagram} />
                        <SocialIcon Icon={BsTwitter} />
                        <SocialIcon Icon={BsLinkedin} />
                    </div>
                </div>
                <div className="w-full lg:w-7/12 flex flex-wrap gap-8 sm:gap-4">
                    <FooterLinkSection title="Company" links={[
                        { to: "/about", text: "About Us" },
                        { to: "/showshop", text: "Shop" },
                        { to: "/showblogs", text: "Blog" },
                        { to: "/policy", text: "Policy" },
                        { to: "/faq", text: "Contact Us" },
                    ]} />
                    <FooterLinkSection title="Resources" links={[
                        { to: "/about", text: "Success Stories" },
                        { to: "/plan", text: "Gym Plans" },
                        { to: "/contactUs", text: "Community" },
                        { to: "/faqs", text: "FAQs" },
                        { to: "/addBlog", text: "Add Blog" },
                    ]} />
                    
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ Icon }) {
    return (
        <div className="w-10 h-10 bg-[#D90A14] rounded-full flex items-center justify-center">
            <Icon className="text-white" />
        </div>
    );
}

function FooterLinkSection({ title, links }) {
    return (
        <div className="w-full sm:w-1/3 flex flex-col items-start sm:items-center">
            <span className="text-[#D90A14] font-vazirmatn font-bold text-lg mb-3">{title}</span>
            <div className="flex flex-col gap-3 font-vazirmatn text-sm sm:text-base">
                {links.map((link, index) => (
                    <Link key={index} to={link.to} className="hover:text-[#D90A14]">
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Footer;

