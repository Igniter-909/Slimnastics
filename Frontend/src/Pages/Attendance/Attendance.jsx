import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAttendance, markAttendance, getAttendance } from '../../Redux/Slices/AttendanceSlice';
import toast from 'react-hot-toast';

function Attendance() {

    const dispatch = useDispatch();

    //Mark Attendance
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
    
        // Format date to YYYY-MM-DD
        const formattedDate = new Date(markData.date).toISOString().split("T")[0];
        const formattedData = { ...markData, date: formattedDate };
    
        console.log(formattedData);
        await dispatch(markAttendance(formattedData));
        setMarkData({
            date: "",
            status: "Present",
        });
    };
    //Delete Attendance
    const handleDeleteChange = (e) => {
        setDeleteData({
            ...deleteData,
            [e.target.name]: e.target.value
        })
    }

    const DeleteAtt = async (e) => {
        e.preventDefault();
    
        // Format date to YYYY-MM-DD
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
    },[dispatch])


    const allData = useSelector(state => state.attendance.allAttendance);
    console.log("Attendance",allData);


  return (
    <div className='w-full h-fit border-2 border-white/50 rounded-lg mx-6 p-6'>
        <p className='w-full h-fit font-aclonica text-2xl text-[#f85736]'>Track Attendance</p>
        <div className='w-full h-fit flex gap-6 items-center'>
        <div className='w-1/2 h-fit flex flex-col text-white/40 rounded-xl font-vazirmatn m-6 p-6 border-2 border-[#a12bc5]'>
            <p className='w-full h-fit font-nunito text-[#a12bc5] text-lg font-bold pb-6 '>Mark Attendance</p>
            <form className='flex flex-col ' onSubmit={MarkSubmit}>
                <div className='mb-4'>
                    <label className='mb-2' htmlFor='date'>Date</label>
                    <input type='date' value={markData.date} onChange={handleMarkChange} name='date' id='date' className='w-full p-2 bg-[#1d1d1d] border-[#a12bc5] border-b-2' />
                </div>
                <div className='mb-4'>
                    <label className='mb-2' htmlFor='status'>Status</label>
                    <select name='status' value={markData.status} onChange={handleMarkChange} id='status' className='w-full p-2 bg-[#1d1d1d] border-[#a12bc5]'>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="On Leave">On Leave</option>
                    </select>
                </div>
                <button className='w-1/2 p-2 bg-[#a12bc5] hover:text-white hover:bg-[#793ff6] rounded-lg font-bold' type='submit'>Mark Attendance</button>
            </form>
        </div>
        <div className='w-1/2 h-fit flex flex-col  text-white/40 rounded-xl font-vazirmatn m-6 p-6 border-2 border-[#a12bc5]'>
            <p className='w-full h-fit font-nunito text-[#a12bc5] text-lg font-bold pb-6 '>Delete Attendance</p>
            <form className='flex flex-col ' onSubmit={DeleteAtt}>
                <div className='mb-4'>
                    <label className='mb-2' htmlFor='date'>Date</label>
                    <input type='date' value={deleteData.date} onChange={handleDeleteChange} name='date' id='date' className='w-full p-2 bg-[#1d1d1d] border-[#a12bc5] border-b-2' />
                </div>
                <button className='w-1/2 p-2 bg-[#a12bc5] hover:text-white hover:bg-[#793ff6] rounded-lg font-bold' type='submit'>Delete Attendance</button>
            </form>
        </div>
        </div>
        
    </div>
  )
}

export default Attendance