import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
  }, [dispatch]);
  
  const user = useSelector(state => state.auth.data.data || {});

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
  };

  return (
    <div className='w-full h-full p-4 flex flex-col border-2 rounded-lg border-white/60'>
      <h1 className='w-full text-2xl md:text-3xl font-vazirmatn mb-4'>Profile</h1>
      <div className='w-full flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/4 flex justify-center'>
          <img src={user.avatar} alt="avatar" className='rounded-full w-40 h-40 md:w-56 md:h-56 object-cover' />
        </div>
        <div className='w-full md:w-3/4 flex flex-col gap-6'>
          <div className='w-full flex flex-col gap-2 border-2 border-white/20 rounded-lg p-4'>
            <h2 className='font-aclonica text-2xl md:text-3xl font-bold'>{user.name} <span className='text-base text-white/30'>({user.experience}+ years)</span></h2>
            <p className='font-vazirmatn text-sm text-gray-600'>@ {user.socialMedia}</p>
            <div className='flex flex-wrap gap-4 text-[#7738e3]'>
              <p className='font-vazirmatn font-light'>{user.gender}</p>
              <p className='font-vazirmatn font-light'>{new Date(user.joinDate).toLocaleDateString('en-US',{year:'numeric',month:'long'})}</p>
            </div>
            <div className='w-full flex flex-wrap gap-2 mt-2'>
              <span className='border-2 px-2 py-1 rounded-xl text-[#f1fb39] border-[#f1fb39]'>{user.expertise}</span>
            </div>
            <p className='text-sm font-vazirmatn text-gray-300 mt-2 overflow-hidden'>
              {user.bio}
            </p>
          </div>
          <div className='w-full flex flex-col gap-4 border-2 border-white/20 rounded-lg p-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2 h-64'>
                <Line data={data} options={options} />
              </div>
              <div className='w-full md:w-1/2 h-64'>
                <Line data={calories} options={options} />
              </div>
            </div>
            <div className='w-full pt-4'>
              <div className='flex flex-col md:flex-row justify-between items-center mb-2'>
                <h3 className='font-aclonica text-gray-400'>Attendance</h3>
                <p className='font-vazirmatn text-sm text-gray-600'>Active : 40 days</p>
              </div>
              <CalendarHeatmap
                startDate={new Date("2024-01-02")}
                endDate={new Date("2025-01-02")}
                values={[
                  {date: new Date("2024-01-02"), count: 10},
                  {date: new Date("2024-02-05"), count: 15},
                  {date: new Date("2024-03-15"), count: 20},
                  {date: new Date("2024-04-10"), count: 5},
                  {date: new Date("2024-05-20"), count: 12},
                  {date: new Date("2024-06-01"), count: 7},
                  {date: new Date("2024-07-15"), count: 25},
                  {date: new Date("2024-08-20"), count: 18},
                ]}
                classForValue={(value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${Math.min(4, Math.ceil(value.count / 5))}`;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
