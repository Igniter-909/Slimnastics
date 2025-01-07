import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAttendance, markAttendance, getAttendance } from '../../Redux/Slices/AttendanceSlice';
import toast from 'react-hot-toast';

function Attendance() {
  const dispatch = useDispatch();

  const [markData, setMarkData] = useState({
    date: "",
    status: "Present"
  })

  const [deleteData, setDeleteData] = useState({
    date: ""
  });

  const handleMarkChange = (e) => {
    setMarkData({
      ...markData,
      [e.target.name]: e.target.value
    })
  }
 
  const MarkSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(markData.date).toISOString().split("T")[0];
    const formattedData = { ...markData, date: formattedDate };
    console.log(formattedData);
    await dispatch(markAttendance(formattedData));
    setMarkData({
      date: "",
      status: "Present",
    });
  };

  const handleDeleteChange = (e) => {
    setDeleteData({
      ...deleteData,
      [e.target.name]: e.target.value
    })
  }

  const DeleteAtt = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(deleteData.date).toISOString().split("T")[0];
    const formattedData = { date: formattedDate };
    console.log("Delete Data", formattedData);
    await dispatch(deleteAttendance(formattedData));
    setDeleteData({
      date: "",
    });
  };

  useEffect(() => {
    const getAttendanceAll = async() => {
      await dispatch(getAttendance());
    }
    getAttendanceAll();
  }, [dispatch])

  const allData = useSelector(state => state.attendance.allAttendance);
  console.log("Attendance", allData);

  return (
    <div className='w-full h-full border-2 border-white/50 rounded-lg p-4 md:p-6'>
      <h1 className='font-aclonica text-2xl md:text-3xl text-[#f85736] mb-6'>Track Attendance</h1>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/2 flex flex-col text-white/40 rounded-xl font-vazirmatn p-4 md:p-6 border-2 border-[#a12bc5]'>
          <h2 className='font-nunito text-[#a12bc5] text-lg font-bold mb-4'>Mark Attendance</h2>
          <form className='flex flex-col space-y-4' onSubmit={MarkSubmit}>
            <div>
              <label className='block mb-1' htmlFor='date'>Date</label>
              <input type='date' value={markData.date} onChange={handleMarkChange} name='date' id='date' className='w-full p-2 bg-[#1d1d1d] border-[#a12bc5] border-b-2 rounded' />
            </div>
            <div>
              <label className='block mb-1' htmlFor='status'>Status</label>
              <select name='status' value={markData.status} onChange={handleMarkChange} id='status' className='w-full p-2 bg-[#1d1d1d] border-[#a12bc5] border-2 rounded'>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <button className='w-full md:w-1/2 p-2 bg-[#a12bc5] hover:bg-[#793ff6] text-white rounded-lg font-bold transition-colors duration-300' type='submit'>Mark Attendance</button>
          </form>
        </div>
        <div className='w-full md:w-1/2 flex flex-col text-white/40 rounded-xl font-vazirmatn p-4 md:p-6 border-2 border-[#a12bc5]'>
          <h2 className='font-nunito text-[#a12bc5] text-lg font-bold mb-4'>Delete Attendance</h2>
          <form className='flex flex-col space-y-4' onSubmit={DeleteAtt}>
            <div>
              <label className='block mb-1' htmlFor='date'>Date</label>
              <input type='date' value={deleteData.date} onChange={handleDeleteChange} name='date' id='date' className='w-full p-2 bg-[#1d1d1d] border-[#a12bc5] border-b-2 rounded' />
            </div>
            <button className='w-full md:w-1/2 p-2 bg-[#a12bc5] hover:bg-[#793ff6] text-white rounded-lg font-bold transition-colors duration-300' type='submit'>Delete Attendance</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Attendance

