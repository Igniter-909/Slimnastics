import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../Redux/Slices/AuthSlice';
import { getAPlan } from '../Redux/Slices/PlanSlice';

function MyPlan() {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data.data);
    const plans = userData.membershipPlan;


    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getUser());
        };
        fetchData();
    },[dispatch])
    

  return (
    <div className='mx-10 p-6 w-full flex flex-col h-fit rounded-xl border-2 border-white/50'>
        <p className='text-3xl font-vazirmatn font-bold text-start py-6'>My Plans</p>
        {plans.map((plan) => (
            <div key={plan.planId?._id || plan._id} className='mb-6 w-full h-fit rounded-xl border-2 flex flex-col border-white/50 p-6'>
            <p className='text-xl font-rubik text-[#D90A14] '>{plan.planId?.plan || "No Plan"} <span className={`text-xs font-vazirmatn ${plan.status === "active"? "text-[#31d452]" : "text-[#d90a14]"}`}>{plan.status}</span></p>
            <p className='text-sm font-nunito text-white/30 '> Valid from {new Date(plan.startDate).toLocaleDateString("en-US",{month:"short",year:"2-digit",day:"2-digit"})} to {new Date(plan.endDate).toLocaleDateString("en-US",{month:"short",year:"2-digit",day:"2-digit"})}</p>
            <p className='text-sm font-medium mt-4'> {plan.planId?.description || ""}</p>  
            <p className='font-aclonica text-[#9c35f7] mt-3'>Benefits</p>
            <ul className='text-sm font-vazirmatn text-white/30'>
                {plan.planId?.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                ))}
                </ul>    
        </div>
        ))}
    </div>
  )
}

export default MyPlan