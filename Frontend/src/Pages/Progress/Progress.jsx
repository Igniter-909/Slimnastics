import React, { useState } from 'react'
import gymBody from "../../assets/gymBody.png"
import { useDispatch } from "react-redux";
import { addProgress } from '../../Redux/Slices/ProgressSlice';

function Progress() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
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
    <div className='flex flex-col md:flex-row gap-6 p-4'>
      <div className='w-full md:w-1/3 p-6 flex flex-col rounded-xl border-2 border-white/40'>
        <h2 className='font-aclonica font-bold text-[#D90A14] text-2xl md:text-3xl mb-6'>Add Progress</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <InputField label="Weight" id="weight" name="weight" value={formData.weight} onChange={handleChange} />
          <InputField label="Height" id="height" name="height" value={formData.height} onChange={handleChange} />
          <InputField label="Target Weight" id="targetWeight" name="targetWeight" value={formData.targetWeight} onChange={handleChange} />
          <InputField label="Fat Percentage" id="fatPercent" name="fatPercent" value={formData.fatPercent} onChange={handleChange} />
          <InputField label="Date" id="date" name="date" value={formData.date} onChange={handleChange} type="date" />
          <button type="submit" className='w-full bg-transparent text-[#d90a14] border-2 border-[#d90a14] p-2 rounded-md hover:bg-[#d90a14] hover:text-white transition-colors duration-300'>Add Progress</button>
        </form>
      </div>

      <div className='w-full md:w-2/3 p-6 relative'>
        <img src={gymBody} alt="gym body" className='w-full h-auto' />
        <p className='font-rubik text-[#D90A14] text-2xl md:text-3xl absolute top-0 left-1/4 text-center'>CONSISTENCY IS THE KEY</p>
      </div>
    </div>
  )
}

function InputField({ label, id, name, value, onChange, type = "number" }) {
  return (
    <div className='flex flex-col gap-1 text-[#D90A14]'>
      <label htmlFor={id} className='font-bold'>{label}</label>
      <input 
        type={type} 
        id={id} 
        name={name} 
        value={value} 
        onChange={onChange} 
        className='border-b-2 bg-[#1d1d1d] rounded-md p-1 text-white' 
      />
    </div>
  )
}

export default Progress;

