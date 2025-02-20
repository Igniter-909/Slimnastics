import React, { useState, useEffect } from 'react'
import gymBody from "../../assets/gymBody.png"
import { useDispatch, useSelector } from "react-redux";
import { addProgress, getProgress } from '../../Redux/Slices/ProgressSlice';
import { toast } from 'react-hot-toast';
import moment from 'moment';

function Progress() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.auth.darkmode);
  const { progressData = [], loading, statistics, dateRange } = useSelector(state => state.progress || { progressData: [], loading: false });

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    targetWeight: "",
    fatPercent: "",
    date: "",
  });

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const result = await dispatch(getProgress()).unwrap();
      console.log('Progress Data:', result);
      if (!result || !Array.isArray(result)) {
        console.error('Invalid progress data format:', result);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      toast.error("Failed to fetch progress data");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (!formData.date) {
        toast.error("Please select a date");
        return;
      }
      if (!formData.weight || !formData.height || !formData.targetWeight || !formData.fatPercent) {
        toast.error("Please fill in all fields");
        return;
      }

      const formattedDate = new Date(formData.date).toISOString().split("T")[0];
      const progressData = {
        weight: Number(formData.weight),
        height: Number(formData.height),
        targetWeight: Number(formData.targetWeight),
        fatPercent: Number(formData.fatPercent),
        date: formattedDate
      };
      
      console.log('Sending progress data:', progressData);
      
      const response = await dispatch(addProgress(progressData)).unwrap();
      console.log('Server response:', response);
      
      if (response) {
        toast.success("Progress added successfully");
        // Reset form first
        setFormData({
          weight: "",
          height: "",
          targetWeight: "",
          fatPercent: "",
          date: "",
        });
        // Then fetch updated data
        await fetchProgress();
      }
    } catch (error) {
      console.error("Failed to add progress:", error);
      toast.error(error.message || "Failed to add progress");
    }
  }

  // Display latest progress entries
  const latestProgress = Array.isArray(progressData) 
    ? [...progressData].reverse().slice(0, 5)  // Create a copy before reversing
    : [];

  // For your charts
  const labels = progressData.map(entry => moment(entry.date).format('MMM YYYY'));
  const weights = progressData.map(entry => entry.weight);
  const fatPercents = progressData.map(entry => entry.fatPercent);

  // You can also display the statistics
  const Stats = () => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="p-4 border border-[#D90A14] rounded-lg">
        <h4 className="text-[#D90A14] font-bold">Weight Progress</h4>
        <p>Started: {statistics.startingWeight} kg</p>
        <p>Current: {statistics.currentWeight} kg</p>
        <p>Change: {statistics.weightChange > 0 ? '+' : ''}{statistics.weightChange} kg</p>
      </div>
      <div className="p-4 border border-[#D90A14] rounded-lg">
        <h4 className="text-[#D90A14] font-bold">Body Fat Progress</h4>
        <p>Started: {statistics.startingFatPercent}%</p>
        <p>Current: {statistics.currentFatPercent}%</p>
        <p>Change: {statistics.fatPercentChange > 0 ? '+' : ''}{statistics.fatPercentChange}%</p>
      </div>
    </div>
  );

  return (
    <div className='flex flex-col gap-6 p-4'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/3 p-6 flex flex-col rounded-xl border-2 border-red-500/40'>
          <h2 className='font-aclonica font-bold text-[#D90A14] text-2xl md:text-3xl mb-6'>Add Progress</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <InputField label="Weight" id="weight" name="weight" value={formData.weight} onChange={handleChange} />
            <InputField label="Height" id="height" name="height" value={formData.height} onChange={handleChange} />
            <InputField label="Target Weight" id="targetWeight" name="targetWeight" value={formData.targetWeight} onChange={handleChange} />
            <InputField label="Fat Percentage" id="fatPercent" name="fatPercent" value={formData.fatPercent} onChange={handleChange} />
            <InputField label="Date" id="date" name="date" value={formData.date} onChange={handleChange} type="date" />
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-transparent text-white border-2 border-[#d90a14] p-2 rounded-md ${
                isDarkMode ? "bg-[#d90a14] hover:bg-[#fe0fa7]" : "bg-[#fe0fa7] hover:bg-[#d90a14]"
              } transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding...' : 'Add Progress'}
            </button>
          </form>
        </div>

        <div className='w-full md:w-2/3 p-6 relative'>
          <img src={gymBody} alt="gym body" className='w-full h-auto' />
          <p className='font-rubik text-[#D90A14] text-2xl md:text-3xl absolute top-0 left-1/4 text-center'>
            CONSISTENCY IS THE KEY
          </p>
        </div>
      </div>

      {/* Progress History Section */}
      <div className='w-full p-6 rounded-xl border-2 border-red-500/40'>
        <h3 className='font-aclonica font-bold text-[#D90A14] text-xl mb-4'>Recent Progress</h3>
        {loading ? (
          <p>Loading progress data...</p>
        ) : latestProgress.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {latestProgress.map((entry, index) => (
              <div key={entry._id || index} className='p-4 border border-[#D90A14] rounded-lg'>
                <p className='text-[#D90A14] font-bold'>{new Date(entry.date).toLocaleDateString()}</p>
                <p>Weight: {entry.weight} kg</p>
                <p>Height: {entry.height} cm</p>
                <p>Target Weight: {entry.targetWeight} kg</p>
                <p>Fat Percentage: {entry.fatPercent}%</p>
                {entry.bmi && <p>BMI: {entry.bmi.toFixed(2)}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No progress data available</p>
        )}
      </div>

      <Stats />
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
        className='border-b-2 bg-transparent rounded-md p-1' 
      />
    </div>
  )
}

export default Progress;

