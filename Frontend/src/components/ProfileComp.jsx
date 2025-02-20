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
  const { progressData = [] } = useSelector(state => state.user?.progressStat || { progressData: [] });

  // Filter out entries with null values and sort by date
  const validProgressData = progressData
    .filter(record => record.weight != null && record.fatPercent != null)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = validProgressData.map(record => moment(record.date).format('MMM DD, YYYY'));
  const weights = validProgressData.map(record => record.weight);
  const fatPercents = validProgressData.map(record => record.fatPercent);

  const weightData = {
    labels: labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weights,
        borderColor: '#D20C13',
        backgroundColor: 'rgba(210, 12, 19, 0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#D20C13',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#D20C13'
      },
    ],
  };

  const fatPercentData = {
    labels: labels,
    datasets: [
      {
        label: 'Fat Percentage',
        data: fatPercents,
        borderColor: '#CC4E17',
        backgroundColor: 'rgba(204, 78, 23, 0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#CC4E17',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#CC4E17'
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: 'Progress Over Time',
        color: '#fff'
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  const customStyles = `
    <style>
      .react-calendar-heatmap {
        width: 100%;
      }
      .react-calendar-heatmap .color-empty {
        fill: #2d2d2d;
      }
      .react-calendar-heatmap .color-scale-0 {
        fill: #1a1a1a;
      }
      .react-calendar-heatmap .color-scale-1 {
        fill: #D20C13;
      }
      .react-calendar-heatmap text {
        fill: #fff;
        font-size: 8px;
      }
      .react-calendar-heatmap rect {
        stroke: #111;
        stroke-width: 1px;
      }
    </style>
  `;

  return (
    <div className='w-full h-full p-4 flex flex-col border-2 rounded-lg border-red-500/40'>
      <div dangerouslySetInnerHTML={{ __html: customStyles }} />
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
              <div className='w-full md:w-1/2 h-64 p-4 bg-[#111]/50 rounded-lg'>
                <Line ref={weightChartRef} data={weightData} options={options} />
              </div>
              <div className='w-full md:w-1/2 h-64 p-4 bg-[#111]/50 rounded-lg'>
                <Line ref={fatPercentChartRef} data={fatPercentData} options={options} />
              </div>
            </div>
            <div className='w-full pt-4 bg-[#111]/50 rounded-lg p-4'>
              <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <h3 className='font-aclonica text-gray-400'>Attendance</h3>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-[#1a1a1a] border border-[#111]'></div>
                    <span className='text-sm text-gray-400'>Absent</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-[#D20C13] border border-[#111]'></div>
                    <span className='text-sm text-gray-400'>Present</span>
                  </div>
                </div>
                <p className='font-vazirmatn text-sm text-gray-400'>
                  Present: {attendanceRecords?.presentCount || 0} days
                </p>
              </div>
              <CalendarHeatmap
                endDate={new Date()}
                startDate={new Date(new Date().setDate(new Date().getDate() - 365))}
                values={attendanceRecords?.data?.map(record => ({
                  date: record.date,
                  count: record.value === 0 ? 0 : 1  // Convert any non-zero value to 1 for present
                })) || []}
                classForValue={(value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${value.count}`;
                }}
                titleForValue={(value) => {
                  if (!value) {
                    return 'No data';
                  }
                  return `Date: ${value.date}, Status: ${value.count === 0 ? 'Absent' : 'Present'}`;
                }}
                showWeekdayLabels={true}
                weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                gutterSize={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;

