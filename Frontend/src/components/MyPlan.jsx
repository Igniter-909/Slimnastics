import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../Redux/Slices/AuthSlice';

function MyPlan() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth?.data?.data);
  const plans = userData?.membershipPlan;

  useEffect(() => {
    const fetchData = async() => {
      await dispatch(getUser());
    };
    fetchData();
  }, [dispatch])

  return (
    <div className='p-4 w-full flex flex-col h-full rounded-xl border-2 border-red-500/40'>
      <h1 className='text-2xl md:text-3xl font-vazirmatn font-bold text-start mb-6'>My Plans</h1>
      <div className='space-y-6'>
        {plans.map((plan) => (
          <div key={plan.planId?._id || plan._id} className='w-full rounded-xl border-2 border-red-500/40 p-4 md:p-6'>
            <h2 className='text-xl font-rubik text-[#D90A14] mb-2'>{plan.planId?.plan || "No Plan"} <span className={`text-xs font-vazirmatn ${plan.status === "active" ? "text-[#31d452]" : "text-[#d90a14]"}`}>{plan.status}</span></h2>
            <p className='text-sm font-nunito text-red-500/60 mb-4'>
              Valid from {new Date(plan.startDate).toLocaleDateString("en-US",{month:"short",year:"2-digit",day:"2-digit"})} to {new Date(plan.endDate).toLocaleDateString("en-US",{month:"short",year:"2-digit",day:"2-digit"})}
            </p>
            <p className='text-sm font-medium mb-4'>{plan.planId?.description || ""}</p>  
            <h3 className='font-aclonica text-[#9c35f7] mb-2'>Benefits</h3>
            <ul className='text-sm font-vazirmatn text-white/30 list-disc pl-5 space-y-1'>
              {plan.planId?.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>    
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPlan

