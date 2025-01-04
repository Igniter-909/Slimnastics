import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../Redux/Slices/AuthSlice';
import { getAPlan } from '../Redux/Slices/PlanSlice';

function MyPlan() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.auth.data);

    useEffect(() =>{
        const fetchUser = async() => {
            await dispatch(getUser());
        }
        fetchUser();
    },[dispatch]);


    if(data === null) return(
        <div className='mx-10 p-6 w-full flex flex-col h-fit rounded-xl border-2 border-white/50'>
            <p className='text-3xl font-vazirmatn font-bold text-start py-6'>My Plans</p>
            <p className='text-sm font-medium text-white'>Please wait while we load your data...</p>
        </div>
    )

    const plans = data.data;

    console.log(plans);



  return (
    <div className='mx-10 p-6 w-full flex flex-col h-fit rounded-xl border-2 border-white/50'>
        <p className='text-3xl font-vazirmatn font-bold text-start py-6'>My Plans</p>
        <div className='w-full h-fit rounded-xl border-2 flex flex-col border-white/50 p-6'>
            <p className='text-xl font-rubik text-[#D90A14] '>{plans?.plan || ""} <span className='text-xs font-vazirmatn text-[#31d452]'>Active</span></p>
            <p className='text-sm font-nunito text-white/30 '> Valid from 12/12/2022 to 01/01/2025</p>
            <p className='text-sm font-medium mt-4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur labore cumque nam quos vitae eum ex voluptate dolorum molestias iusto reiciendis accusamus explicabo magnam porro animi tempora voluptas cupiditate excepturi reprehenderit, non distinctio nisi? Quasi, accusantium quibusdam at cupiditate blanditiis itaque ut iure, neque nostrum, amet nihil quod possimus iste?</p>  
            <p className='font-aclonica text-[#9c35f7] mt-3'>Benefits</p>    
        </div>
    </div>
  )
}

export default MyPlan