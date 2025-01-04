import React,{useState} from 'react'
import gymBody from "../../assets/gymBody.png"
import {useDispatch} from "react-redux";
import { addProgress } from '../../Redux/Slices/ProgressSlice';

function Progress() {

    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        weight: "",
        height: "",
        targetWeight: "",
        fatPercent: "",
        date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formattedDate = new Date(formData.date).toISOString().split("T")[0];

        await dispatch(addProgress({
            weight: formData.weight,
            height: formData.height,
            targetWeight: formData.targetWeight,
            fatPercent: formData.fatPercent,
            date: formattedDate
        }));
        setFormData({
            weight: "",
            height: "",
            targetWeight: "",
            fatPercent: "",
            date: "",
        })

    }

  return (
    <>
    <div className='w-1/3 h-fit mx-6 p-6 flex flex-col rounded-xl border-2 border-white/40'>
        <p className='font-aclonica font-bold text-[#D90A14] text-3xl'>Add Progress</p>
        <div className='flex flex-col gao-0 text-[#D90A14]  my-3'>
            <label htmlFor='weight' className='font-bold'>Weight</label>
            <input type='number' id='weight' name='weight' value={formData.weight} onChange={handleChange} className='border-b-2 bg-[#1d1d1d] rounded-md p-1' />
        </div>
        <div className='flex flex-col gao-0 text-[#D90A14]  my-3'>
            <label htmlFor='height' className='font-bold'>Height</label>
            <input type='number' id='height' name='height' value={formData.height} onChange={handleChange} className='border-b-2 bg-[#1d1d1d] rounded-md p-1' />
        </div>
        <div className='flex flex-col gao-0 text-[#D90A14]  my-3'>
            <label htmlFor='targetWeight' className='font-bold'>Target Weight</label>
            <input type='number' id='targetWeight' name='targetWeight' value={formData.targetWeight} onChange={handleChange} className='border-b-2 bg-[#1d1d1d] rounded-md p-1' />
        </div>
        <div className='flex flex-col gao-0 text-[#D90A14]  my-3'>
            <label htmlFor='fatPercent' className='font-bold'>Fat Percentage</label>
            <input type='number' id='fatPercent' name='fatPercent' value={formData.fatPercent} onChange={handleChange} className='border-b-2 bg-[#1d1d1d] rounded-md p-1' />
        </div>
        <div className='flex flex-col gao-0 text-[#D90A14]  my-3'>
            <label htmlFor='date' className='font-bold'>Date</label>
            <input type='date' id='date' name='date' value={formData.date} onChange={handleChange} className='border-b-2 bg-[#1d1d1d] rounded-md p-1' />
        </div>
        <button onClick={handleSubmit} className='bg-transparent  text-[#d90a14] border-2 my-6 border-[#d90a14] p-2 rounded-md'>Add Progress</button>

    </div>

    <div className='w-2/3 h-fit mx-6 p-6 relative'>
        <img src={gymBody} alt="gym body" />
        <p className='font-rubik text-[#D90A14] text-3xl absolute top-0 left-1/4'>CONSISTENCY IS THE KEY</p>
    </div>
    </>
  )
}

export default Progress