import React, { useState } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { MonthlyPlans, YearlyPlans } from '../../constants/planss'

function ShowPlans2() {

    const [monthPlan,setMonthPlan] = useState(true);
    const showYearPlan = () => {
        setMonthPlan(false);
    }
    const showMonthPlan = () => {
        setMonthPlan(true);
    }

  return (
    <HomeLayout>
        <div className='w-full h-fit p-6'>
        <div className='w-full h-fit flex flex-col items-center justify-center gap-4'>
            <p className='font-aclonica text-xl font-bold'>Our <span className='text-[#D90A14]'>Plans</span></p>
            <div className='w-full h-fit flex justify-center gap-4'>
                <button className={`w-1/6 px-3 py-1 font-light font-vazirmatn text-sm  ${monthPlan ? "bg-[#D90A14] text-white" : "bg-[white] text-[#D90A14]"} rounded-lg`} onClick={showMonthPlan}>Monthly</button>
                <button className={`w-1/6 px-3 py-1 font-light font-vazirmatn text-sm  ${!monthPlan ? "bg-[#D90A14] text-white" : "bg-[white] text-[#D90A14]"} border-[#D90A14] border rounded-lg`} onClick={showYearPlan}>Yearly</button>
            </div>
            <p className='text-justify text-sm'>Select The Plan That Suits Your Fitness Goals And Let Our Expert Coaches Guide You Every Step Of The Way</p>
        </div>
        <div className='w-full h-fit grid grid-cols-4 items-center justify-center gap-6 my-12'>
            {(monthPlan ? MonthlyPlans : YearlyPlans).map((plan,index) => (
                <div key={index} className='w-full h-fit flex flex-col justify-center rounded-lg p-6 gap-2 border-2 border-[#CD4E17] even:border-[#D90A14]'>
                <p className='text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn'>Package</p>
                <p className='text-lg font-extrabold font-rubik text-center'>{plan.title}</p>
                <p className='text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn'>Description</p>
                <p className='text-sm text-justify'>{plan.description}</p>
                <p className='text-[#CD4E17] even:text-[#D90A14] text-xs text-center font-vazirmatn'>Benefits</p>
                <ul className='text-sm list-disc'>
                    {plan.benefits.map((item,i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
                <p className='font-vazirmatn text-center text-lg font-bold'>{plan.price}</p>
                <button className='w-full px-4 py-2 text-sm font-vazirmatn text-white bg-[#CD4E17] even:bg-[#D90A14] hover:bg-[#f78a5b] rounded-full'>Choose This Plan</button>
            </div>
            ))}
        </div>
    </div>
    </HomeLayout>
  )
}

export default ShowPlans2