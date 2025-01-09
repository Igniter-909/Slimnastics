import React from 'react';
import HomeLayout from "../layout/HomeLayout.jsx";
import Carousel from "../components/Carousal.jsx";

function AboutUs() {
    return (
        <HomeLayout>
            <div className="w-full px-4 py-8 md:py-16">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-center">
                    <div className="w-full lg:w-1/2 rounded-xl overflow-hidden">
                        <Carousel />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-aclonica font-extrabold text-center lg:text-left">
                            We Are Oxygen<span className="text-[#D90A14]">Gym</span>
                        </h1>
                        <p className="text-sm md:text-base py-6 lg:pr-10">
                            Welcome to Oxygen Gym Gym, where your fitness journey begins! At Oxygen Gym, we believe that fitness is not just about working out; it's about creating a healthier, happier lifestyle. Our state-of-the-art facility is designed to cater to all your fitness needs, whether you're a beginner or a seasoned athlete.

                            Our mission is to provide a supportive and motivating environment where you can achieve your fitness goals. We offer a wide range of services, including personalized workout plans, group classes, and nutrition guidance, all tailored to help you succeed. Our team of certified trainers is dedicated to providing expert guidance and support every step of the way.

                            At Oxygen Gym, we pride ourselves on our community-focused approach. We believe that fitness is more enjoyable and effective when done together. That's why we offer a variety of group classes, from yoga and pilates to high-intensity interval training and strength conditioning. Our classes are designed to challenge and inspire you, no matter your fitness level.

                            In addition to our fitness services, we provide top-notch amenities to enhance your experience. Enjoy our fully equipped locker rooms, sauna and steam rooms, and a relaxing lounge area where you can unwind after a workout. We also offer complimentary fitness gear and priority booking for our premium members.
                        </p>

                        <div className="w-full md:w-2/3 lg:w-1/2 py-6 flex flex-col sm:flex-row gap-4">
                            <button className="w-full sm:w-1/2 bg-[#D90A14] px-4 py-2 rounded-lg text-white hover:bg-[#ed444d] transition-colors duration-300">Join Us</button>
                            <button className="w-full sm:w-1/2 border-2 border-[#D90A14] px-4 py-2 text-[#D90A14] rounded-lg hover:bg-[#ed444d] hover:text-white transition-colors duration-300">Plans</button>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;

