import Card from "../components/Card";
import HomeLayout from "../layout/HomeLayout";

function HomePage () {
    return (
      <HomeLayout>
            <div>
            <div className="flex flex-col md:flex-row h-fit">
                <div className="flex-1 flex items-center justify-center p-6">
                    <div>
                    <h1 className="text-2xl md:text-8xl font-bold mb-4 text-[#001A6E] first-letter:text-[#074799]">
                        WE ARE SLIMNASTICS
                    </h1>
                    <p className="text-sm md:text-2xl font-medium text-[#009990]">
                        A fitness movement that is worth breaking a sweat for
                    </p>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-6">
                    <img
                        src="https://img.freepik.com/free-photo/young-sportsmen-couple-woman-man-studio-white-background-they-look-camera_639032-927.jpg?t=st=1735458794~exp=1735462394~hmac=1d439c45689af9a0af98791aed7841c1e9ca74a296fd240ce3ac47a43a0346cc&w=360"
                        alt="fit"
                        className="max-w-full h-auto rounded-lg"
                    />
                </div>
            </div>

            <div className="flex flex-col p-10 justify-center items-center">
                <h1 className="text-lg md:text-5xl font-bold mb-6 text-[#001A6E]">Personalise Your <span className="text-[#009990]">Fitness With The Slimnastics</span></h1>
                <div className="w-7/12">
                <p className="text-[#001A6E] text-md md:text-lg font-semibold">
                    Our personalised fitness journey is designed to suit your individual needs, goals, and preferences. Whether you're looking to improve your overall fitness, build muscle, or simply lose weight, Slimnastics can help you achieve your goals.
                </p>
                </div>
                
                <div className="flex gap-5 justify-between mx-10">
                    <Card 
                    image="https://images.pexels.com/photos/29965273/pexels-photo-29965273/free-photo-of-vibrant-basketball-with-bold-branding-in-low-light.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    title="Durability Guarantee" 
                    description="Premium-grade materials and a robust design ensure long-lasting performance even under intensive use"/>

                    <Card 
                    image="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    title="Versatile Workouts" 
                    description="Offers multiple exercise options to target various muscle groups effectively."/>

                    <Card 
                    image="https://images.pexels.com/photos/6339718/pexels-photo-6339718.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    title="Advanced Features" 
                    description="Features like digital tracking, heart rate monitors, and app integration for a smarter workout experience."/>
                </div>
                
            </div>

        </div>
    </HomeLayout>
    )
}

export default HomePage;