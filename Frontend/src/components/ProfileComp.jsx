import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Line } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getUser } from '../Redux/Slices/AuthSlice';
import { getAttendanceSummaryy } from '../Redux/Slices/AdminSlice';
import { getAttendanceData, getProgress } from "../Redux/Slices/UserSlice.js"
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfileComp = () => {
  const dispatch = useDispatch();
  const weightChartRef = useRef(null);
  const fatPercentChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async() => {
      await dispatch(getUser());
      await dispatch(getAttendanceData());
      await dispatch(getProgress());
    };
    fetchData();
  }, [dispatch]);

  const attendanceRecords = useSelector(state => state.user?.attendanceRecords)
  const user = useSelector(state => state.auth?.data?.data || {});
  const progressStat = useSelector(state => state.user?.progressStat)

  const currentUserAttendanceRecords = attendanceRecords?.data?.map(record => ({
    date: record?.date,
    count: record?.value
  })) || [];

  const labels = progressStat.map(record => new Date(record?.date).toISOString().split("T")[0]);
  const weights = progressStat.map(record => record?.weight);
  const fatPercents = progressStat.map(record => record?.fatPercent);

  const weightData = {
    labels: labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weights,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const fatPercentData = {
    labels: labels,
    datasets: [
      {
        label: 'Fat Percentage',
        data: fatPercents,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
    <div className='w-full h-full p-4 flex flex-col border-2 rounded-lg border-red-500/40'>
      <h1 className='w-full text-2xl md:text-3xl font-vazirmatn mb-4'>Profile</h1>
      <div className='w-full flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/4 flex justify-center'>
          <img src={user.avatar} alt="avatar" className='rounded-full w-40 h-40 md:w-56 md:h-56 object-cover ' />
        </div>
        <div className='w-full md:w-3/4 flex flex-col gap-6'>
          <div className='w-full flex flex-col gap-2 border-2 border-red-500/40 rounded-lg p-4'>
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
          <div className='w-full flex flex-col gap-4 border-2 border-red-500/40 rounded-lg p-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2 h-64'>
                <Line ref={weightChartRef} data={weightData} options={options} />
              </div>
              <div className='w-full md:w-1/2 h-64'>
                <Line ref={fatPercentChartRef} data={fatPercentData} options={options} />
              </div>
            </div>
            <div className='w-full pt-4'>
              <div className='flex flex-col md:flex-row justify-between items-center mb-2'>
                <h3 className='font-aclonica text-gray-400'>Attendance</h3>
                <p className='font-vazirmatn text-sm text-gray-600'>Active : {attendanceRecords?.presentCount || 0} days</p>
              </div>
              <CalendarHeatmap
                endDate={new Date(attendanceRecords?.endDate)}
                startDate={new Date(attendanceRecords?.startDate)}
                values={currentUserAttendanceRecords}
                classForValue={(value) => {
                  if (!value || value.count === 0) {
                    return 'color-empty';
                  }
                  return `color-scale-${value.count}`;
                }}
                titleForValue={(value) => {
                  if (!value) {
                    return 'No data';
                  }
                  return `Date: ${value.date}, Status: ${
                    value.count === 0 ? 'Absent' : value.count === 10 ? 'Present' : 'On Leave'
                  }`;
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

