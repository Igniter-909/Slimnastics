import React, { useState } from 'react';
import HomeLayout from "../../layout/HomeLayout";
import ProfileComp from '../../components/ProfileComp';
import EditPage from './EditProfile2';
import { useDispatch } from 'react-redux';
import { deleteProfile, logout } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import MyPlan from '../../components/MyPlan';
import Attendance from '../Attendance/Attendance';
import Progress from '../Progress/Progress';

function UserProfile() {
  const [display, setDisplay] = useState("profile");
  const [dialog, setDialog] = useState(false);
  const [passData, setPassData] = useState({
    password: ""
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePassChange = (e) => {
    setPassData({
      ...passData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirm = async () => {
    console.log("FormData", passData);
    const res = await dispatch(deleteProfile(passData));
    console.log("Confirm", res);
    if (res.meta.requestStatus === "fulfilled") {
      setDialog(false);
      navigate("/login");
    } else {
      console.error("Failed to delete account");
    }
  };

  const handleCancel = () => {
    setDialog(false);
  };

  const setDisplayAndCloseSidebar = (newDisplay) => {
    setDisplay(newDisplay);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <HomeLayout>
      <div className='w-full min-h-screen flex flex-col md:flex-row'>
        {/* Sidebar for mobile */}
        <div className='md:hidden'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='w-full py-2 px-4 bg-[#2a2929] text-white text-left'
          >
            Menu
          </button>
          {sidebarOpen && (
            <div className='w-full bg-[#2a2929] p-4'>
              <SidebarButton onClick={() => setDisplayAndCloseSidebar("profile")} active={display === "profile"}>Profile</SidebarButton>
              <SidebarButton onClick={() => setDisplayAndCloseSidebar("edit_profile")} active={display === "edit_profile"}>Edit Profile</SidebarButton>
              <SidebarButton onClick={() => setDisplayAndCloseSidebar("myPlan")} active={display === "myPlan"}>My Plans</SidebarButton>
              <SidebarButton onClick={() => setDisplayAndCloseSidebar("track_progress")} active={display === "track_progress"}>Progress</SidebarButton>
              <SidebarButton onClick={() => setDisplayAndCloseSidebar("track")} active={display === "track"}>Attendance</SidebarButton>
              <SidebarButton onClick={() => { setDisplayAndCloseSidebar("cart"); navigate("/myCart"); }}>My Cart</SidebarButton>
              <SidebarButton onClick={() => setDialog(true)}>Delete Account</SidebarButton>
              <SidebarButton onClick={handleLogout}>Logout</SidebarButton>
            </div>
          )}
        </div>

        {/* Sidebar for desktop */}
        <div className='hidden md:flex md:w-2/12 h-full flex-col justify-start p-4 rounded-lg shadow-md bg-[#2a2929]'>
          <SidebarButton onClick={() => setDisplay("profile")} active={display === "profile"}>Profile</SidebarButton>
          <SidebarButton onClick={() => setDisplay("edit_profile")} active={display === "edit_profile"}>Edit Profile</SidebarButton>
          <SidebarButton onClick={() => setDisplay("myPlan")} active={display === "myPlan"}>My Plans</SidebarButton>
          <SidebarButton onClick={() => setDisplay("track_progress")} active={display === "track_progress"}>Progress</SidebarButton>
          <SidebarButton onClick={() => setDisplay("track")} active={display === "track"}>Attendance</SidebarButton>
          <SidebarButton onClick={() => { setDisplay("cart"); navigate("/myCart"); }}>My Cart</SidebarButton>
          <SidebarButton onClick={() => setDialog(true)}>Delete Account</SidebarButton>
          <SidebarButton onClick={handleLogout}>Logout</SidebarButton>
        </div>

        <div className='w-full md:w-10/12 p-4'>
          {display === "profile" && <ProfileComp />}
          {display === "edit_profile" && <EditPage />}
          {display === "myPlan" && <MyPlan />}
          {display === "track_progress" && <Progress />}
          {display === "track" && <Attendance />}
        </div>

        {dialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90 z-50">
            <div className="bg-black rounded-lg shadow-xl p-6 w-11/12 max-w-md">
              <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14] mb-4">
                Are you sure you want to delete account?
              </h2>
              <p className='mb-4 text-white'>Please enter your password to confirm:</p>
              <input
                type="password"
                name="password"
                value={passData.password}
                onChange={handlePassChange}
                className='w-full px-4 py-2 mb-4 border bg-[#1d1d1d] border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white'
                placeholder="Enter your password"
              />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-[#D90A14] text-white rounded hover:bg-[#a22c32] transition-colors duration-300"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

function SidebarButton({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-4 mb-2 text-left rounded-lg shadow-sm transition-colors duration-300 ${
        active ? "bg-[#D90A14] text-white" : "bg-transparent text-white hover:bg-[#D90A14]/50"
      }`}
    >
      {children}
    </button>
  );
}

export default UserProfile;
