import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import Card2 from '../../components/Card2'
import { getAllPlans } from '../../Redux/Slices/PlanSlice';
import HomeLayout from '../../layout/HomeLayout';


const ShowPlan = () => {
  
  const dispatch = useDispatch();

  const role = useSelector(state => state.auth.role);

  const {plans, loading} = useSelector(state => state.membership );

  useEffect (() => {
    dispatch(getAllPlans());
  },[dispatch])

  if(loading) {
    return <div className='text-center mt-10'>Loading...</div>
  }
  if (!plans || plans.length === 0) {
    return <div className="text-center mt-10">No plans available.</div>;
  }

  return (
    <HomeLayout>
    <div className='m-5 p-0 flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center my-3 sm:my-10'>
        <h1 className='text-6xl font-bold font-serif text-center'>Membership Plans
        </h1>
        <p className='text-lg text-center mt-4 mx-0 sm:mx-32 font-sans'>
          Explore our range of membership plans designed to suit your needs. Whether you're looking for a short-term commitment or a long-term plan, we have options that offer great value and flexibility. Join us and start your journey towards a healthier lifestyle today!
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {plans.map(plan => (
          <Card2 
            plan={plan.plan}
            duration={plan.duration}
            description={plan.description}
            _id = {plan._id}
            key={plan._id}
          />
        ))}
        
      </div>
    </div>
    </HomeLayout>
  )
}

export default ShowPlan