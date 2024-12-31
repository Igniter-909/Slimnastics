import React, { useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import Card from '../../components/Card';
import HomeLayout from '../../layout/HomeLayout';
import { getAllUsers } from '../../Redux/Slices/UserSlice';

function AllTrainer() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const trainers = users.filter(user => user.role === "Trainer");
    
    useEffect(() => {
        dispatch(getAllUsers());
    },[dispatch])

  return (
    <HomeLayout>
    <div className='m-5 p-0 flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center my-3 sm:my-10'>
        <h1 className='text-6xl font-bold font-serif text-center'>Our Trainers
        </h1>
        <p className='text-lg text-center mt-4 mx-0 sm:mx-32 font-sans'>
        Meet our team of professional trainers who are dedicated to helping you achieve your fitness goals. Our trainers come with years of experience and a passion for fitness. Whether you're looking to lose weight, build muscle, or improve your overall health, our trainers will provide you with personalized training plans and support every step of the way. Join us and transform your fitness journey with the guidance of our expert trainers!
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {trainers.map(trainer => (
          <Card 
            image={trainer.avatar}
            title={trainer.name}
            description={`Experience: ${trainer.experience} \n Expertise: ${trainer.expertise}`}
          />
        ))}
        
      </div>
    </div>
    </HomeLayout>
  )
}

export default AllTrainer