// import {Aboutt} from "../constants/Aboutt.js";
import banner from "../assets/banner.png";
import HomeLayout from "../layout/HomeLayout.jsx";
import Carousel from "../components/Carousal.jsx";

function AboutUs () {

    return (
        <HomeLayout>
             <div className="w-full h-fit flex gap-6 items-center justify-center my-10">
                <div className="w-1/2 h-fit p-6 rounded-xl overflow-hidden">
                    <Carousel />
                </div>
                <div className="w-1/2 h-fit flex flex-col">
                    <p className="text-3xl font-aclonica font-extrabold">We Are SLIM<span className="text-[#D90A14]">Nastics</span></p>
                    <p className="text-sm py-8 pr-10">Welcome to Slimnastics Gym, where your fitness journey begins! At Slimnastics, we believe that fitness is not just about working out; it's about creating a healthier, happier lifestyle. Our state-of-the-art facility is designed to cater to all your fitness needs, whether you're a beginner or a seasoned athlete.

                    Our mission is to provide a supportive and motivating environment where you can achieve your fitness goals. We offer a wide range of services, including personalized workout plans, group classes, and nutrition guidance, all tailored to help you succeed. Our team of certified trainers is dedicated to providing expert guidance and support every step of the way.

                    At Slimnastics, we pride ourselves on our community-focused approach. We believe that fitness is more enjoyable and effective when done together. That's why we offer a variety of group classes, from yoga and pilates to high-intensity interval training and strength conditioning. Our classes are designed to challenge and inspire you, no matter your fitness level.

                    In addition to our fitness services, we provide top-notch amenities to enhance your experience. Enjoy our fully equipped locker rooms, sauna and steam rooms, and a relaxing lounge area where you can unwind after a workout. We also offer complimentary fitness gear and priority booking for our premium members.
                    </p>

                    <div className="w-1/2 py-10 flex gap-6">
                        <button className="w-1/2 bg-[#D90A14] px-3 py-1 rounded-lg hover:bg-[#ed444d]">Join Us</button>
                        <button className="w-1/2 border-2 border-[#D90A14] px-3 text-[#D90A14] py-1 rounded-lg hover:bg-[#ed444d] hover:text-white">Plans</button>
                    </div>
                </div>
             </div>
        </HomeLayout>
    )
}

export default AboutUs;