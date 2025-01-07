import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import HomeLayout from '../../layout/HomeLayout';
import { getAllUsers } from '../../Redux/Slices/UserSlice';

function TrainerCard({ trainer }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={trainer.avatar || 'https://via.placeholder.com/300x200'} 
        alt={trainer.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{trainer.name}</h3>
        <p className="text-gray-600 mb-4">Experience: {trainer.experience} years</p>
        <p className="text-gray-600">Expertise: {trainer.expertise}</p>
      </div>
    </motion.div>
  );
}

function AllTrainers() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const trainers = users.filter(user => user.role === "Trainer");
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

