import React, { useState } from 'react';
import HomeLayout from "../../layout/HomeLayout";
import ProfileComp from '../../components/ProfileComp';
import EditPage from './EditProfile2';
import { useDispatch } from 'react-redux';
import { deleteProfile, logout } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import AdminPlans from '../plans/AdminPlans';
import MyPlan from '../../components/MyPlan';
import Attendance from '../Attendance/Attendance';
import Progress from '../Progress/Progress';

function UserProfile() {
  const [display,setDisplay] = useState("profile");
  const [dialog,setDialog] = useState(false);
  const [passData,setPassData] = useState({
    password:""
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePassChange = (e) => {
    setPassData({
      ...passData,
      [e.target.name]: e.target.value
  })
}
  const handleConfirm = async() => {
    console.log("FormData",passData);
    const res = await dispatch(deleteProfile(passData));
    console.log("Confirm",res)
    if(res.meta.requestStatus === "fulfilled") {
    setDialog(false);
    navigate("/login");
  }else{
    console.error("Failed to delete account")
  }
}

  const handleCancel = () => {
    setDialog(false);
  }

  const profleDisplay = () => {
    setDisplay("profile");
  }
  const EditDisplay = () => {
    setDisplay("edit_profile");
  }
  const deleteAccount = () => {
    setDialog(true);
  }
  const myPlanDisplay = () => {
    setDisplay("myPlan");
  }
  const settingsDisplay = () => {
    setDisplay("settings");
  }

  const trackDisplay = () => {
    setDisplay("track");
  }

  const trackProgress = () => {
    setDisplay("track_progress");
  }
  const handleLogout = async() => {
    await dispatch(logout());
    navigate("/login")
  }


  return (
    <HomeLayout>
        <div className='w-full h-fit flex py-6'>
            <div className='w-2/12 h-full flex flex-col justify-start p-4 rounded-lg shadow-md bg-[#2a2929]'>
                <button onClick={profleDisplay} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm ${display === "profile" ? "bg-[#D90A14]" : "bg-transparent" }`}>Profile</button>
                <button onClick={EditDisplay} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm ${display === "edit_profile" ? "bg-[#D90A14]" : "bg-transparent" }`}>Edit Profile</button>
                <button onClick={myPlanDisplay} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm ${display === "myPlan" ? "bg-[#D90A14]" : "bg-transparent" }`}>My Plans</button>
                <button onClick={deleteAccount} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm`}>Delete Account</button>
                <button onClick={trackProgress} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm ${display === "track_progress" ? "bg-[#D90A14]" : "bg-transparent"}`}>Track Progress</button>
                <button onClick={trackDisplay} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm ${display === "track" ? "bg-[#D90A14]" : "bg-transparent"}`}>Track Attendance</button>
                <button onClick={settingsDisplay} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm ${display === "settings" ? "bg-[#D90A14]" : "bg-transparent"}`}>Settings</button>
                <button onClick={handleLogout} className={`w-full py-2 px-4 mb-2  rounded-lg shadow-sm`}>Logout</button>
            </div>
            {dialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90">
                    <div className="bg-black rounded-lg shadow-xl p-6 w-fit">
                        <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14]">
                            Are you sure you want to delete account
                        </h2>
                        <p className='mb-4'>Please enter your password to confirm:</p>
                        <input
                          type="password"
                          name="password"
                          value={passData.password}
                          onChange={handlePassChange}
                          className='w-full px-4 py-2 border bg-[#1d1d1d]  border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                          placeholder="Enter your password"
                        />
                          <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-2 bg-[#D90A14] text-white rounded hover:bg-[#a22c32]"
                                    onClick={handleConfirm}
                            >
                                OK
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        
                    </div>
                </div>
              )}
          {display === "profile" ? <ProfileComp /> : ""}
          {display === "edit_profile" ? <EditPage /> : ""}
          {display === "myPlan" ? <MyPlan /> : ""}
          {display === "settings" ? <AdminPlans /> : "" }
          {display === "track_progress" ? <Progress /> : ""}
          {display === "track" ? <Attendance /> : ""}
        </div>
    </HomeLayout>
  );
}

export default UserProfile;