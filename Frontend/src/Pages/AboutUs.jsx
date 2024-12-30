// import {Aboutt} from "../constants/Aboutt.js";
import banner from "../assets/banner.png";
import HomeLayout from "../layout/HomeLayout.jsx";

function AboutUs () {
    return (
        <HomeLayout>
             <div className="h-screen flex justify-center items-center bg-center bg-cover bg-custom-radial" 
                style={{backgroundImage: `url(${banner})` }}
             >
                <div className="my-10 mx-60 flex flex-col justify-center items-center ">
                    <h1 className="text-6xl font-sans font-bold mb-8 text-white">More About Us</h1>
                    <p className="text-xs sm:text-lg text-white">
                    Welcome to Slimantics, where fitness meets lifestyle! At Slimantics, we believe that achieving your health goals should be a rewarding and enjoyable journey. Our state-of-the-art gym combines cutting-edge equipment, expert trainers, and a vibrant community to inspire and support you every step of the way. Whether you're looking to lose weight, build strength, or simply lead a healthier life, Slimantics provides personalized workout plans, group classes, and wellness programs tailored to your needs. Join us today and transform your fitness journey into a powerful statement of self-care and vitality. Your goals are our mission!
                    </p>
                </div>
             </div>
        </HomeLayout>
    )
}

export default AboutUs;