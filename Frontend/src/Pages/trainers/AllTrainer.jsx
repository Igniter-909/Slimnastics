import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import HomeLayout from '../../layout/HomeLayout';
import { allTrainers} from '../../Redux/Slices/UserSlice.js';


const TrainerCard = ({ trainer }) => {

  const isDarkMode = useSelector(state => state.auth?.darkmode);
  return (
    <motion.div 
      className={`rounded-xl shadow-custom-shadow shadow-[#4d3132] overflow-hidden border-2 border-black/50 bg-gradient-to-br ${isDarkMode ? "from-gray-900 to-gray-800 text-white" : "from-white via-[#b1a4b9] to-transparent text-black"} transform transition-all duration-300 hover:scale-110`}
      whileHover={{ y: -5,scale: 1.1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img 
          src={trainer?.avatar || 'https://via.placeholder.com/300x200'} 
          alt={trainer?.name} 
          className="w-full h-72 object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <h3 className="absolute bottom-4 left-6 text-2xl font-aclonica text-white shadow-text">{trainer.name}</h3>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-[#d9670a] flex items-center">
          <span className="text-[#D90A14] mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </span>
          Experience: <span className='font-creepster text-[#D90A14] ml-1'>{trainer.experience}+ years</span>
        </p>
        <p className="text-[#d9670a] flex items-center">
          <span className="text-[#d9670a] mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </span>
          Expertise: <span className='font-semibold text-[#D90A14] ml-1'>{trainer.expertise}</span>
        </p>
        <p className="text-gray-300 flex items-start">
          <span className="text-white mr-2 mt-1 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </span>
          <span className={`flex-grow font-nunito ${isDarkMode ? "" : "text-[#D90A14]"}`}>{trainer.bio}</span>
        </p>
      </div>
    </motion.div>
  );
};




function AllTrainers() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(allTrainers());
  }, [dispatch]);

  const trainers = useSelector(state => state.user.allTrainersData)

  return (
    <HomeLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#D20C13] to-[#CC4E17] bg-clip-text text-transparent font-rubik">Our Trainers</h1>
        <p className="text-lg text-center mb-12 text-gray-600 max-w-3xl mx-auto">
          Meet our team of professional trainers dedicated to helping you achieve your fitness goals. With years of experience and a passion for fitness, our trainers provide personalized plans and support every step of the way.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AllTrainers;

