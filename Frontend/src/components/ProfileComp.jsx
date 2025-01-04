import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Line } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getUser } from '../Redux/Slices/AuthSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfileComp = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async() => {
      await dispatch(getUser());
    };
    fetchData();
  },[dispatch]);
  
  const user = useSelector(state => state.auth.data.data || {});
  console.log(user)

  const data = {
    labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [70, 68, 67, 66, 65, 64],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const calories = {
    labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'],
    datasets: [
      {
        label: 'Calories Burned [cal] ',
        data: [2500, 4500, 2623, 6600, 6005, 6400],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Progress Over Time',
      },
    },
  };

  return (
    <div className='w-full h-fit p-6 pb-0 flex flex-col border-2 rounded-lg border-white/60 mx-5'>
      <p className='w-full h-fit text-3xl font-vazirmatn'>Profile</p>
      <div className='w-full h-fit flex gap-6 p-6 '>
        <div className='w-1/4 h-full rounded-3xl overflow-hidden '>
          <img src={user.avatar} alt="avatar" className='rounded-full overflow-hidden h-64' />
        </div>
        <div className='w-3/4 h-fit flex flex-col gap-6 '>
          <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-2'>
            <p className='font-aclonica text-3xl font-bold'>{user.name} <span className='text-base text-white/30'>({user.experience}+ years)</span></p>
            <p className='font-vazirmatn text-sm text-gray-600'>@ {user.socialMedia}</p>
            <div className='flex gap-8 text-[#7738e3]'>
              <p className='font-vazirmatn font-light'>{user.gender}</p>
              <p className='font-vazirmatn font-light'>{new Date(user.joinDate).toLocaleDateString('en-US',{year:'numeric',month:'long'})}</p>
            </div>
            <div className='w-full h-1/3 flex gap-5'>
                <p className='border-2 px-2 py-1 rounded-xl text-[#f1fb39] border-[#f1fb39]'>{user.expertise}</p>
            </div>
            <p className='text-sm font-vazirmatn text-gray-300 overflow-hidden'>
              {user.bio}
            </p>
          </div>
          <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-2'>
            <div className='flex gap-4'>
            <div className='w-1/2'>
            <Line data={data} options={options} />
            </div>

            <div className='w-1/2'>
            <Line data={calories} options={options} />
            </div>
            </div>
            
            <div className='w-full h-fit pt-10 flex flex-col gap-6'>
              <div className='flex w-full h-fit justify-between'>
                <p className='font-aclonica text-gray-400'>Attendance</p>
                <p className='font-vazirmatn text-sm text-gray-600'>Active : 40 days</p>
              </div>
            <CalendarHeatmap 
            startDate={new Date("2024-01-02")}
            endDate={new Date("2025-01-02")}
            values = {[
              {date: new Date("2024-01-02"), count: 10},
              {date: new Date("2024-02-05"), count: 15},
              {date: new Date("2024-03-15"), count: 20},
              {date: new Date("2024-04-10"), count: 5},
              {date: new Date("2024-05-20"), count: 12},
              {date: new Date("2024-06-01"), count: 7},
              {date: new Date("2024-07-15"), count: 25},
              {date: new Date("2024-08-20"), count: 18},
            ]}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;