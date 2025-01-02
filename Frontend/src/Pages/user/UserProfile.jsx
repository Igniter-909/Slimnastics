import React from 'react';
import HomeLayout from "../../layout/HomeLayout";
import ProfileComp from '../../components/ProfileComp';
import EditPage from './EditProfile2';

function UserProfile() {
  return (
    <HomeLayout>
        <div className='w-full h-fit flex py-6'>
            <div className='w-fit h-full flex flex-col justify-start p-4 rounded-lg shadow-md bg-[#2a2929]'>
                <button className='w-full py-2 px-4 mb-2  rounded-lg shadow-sm hover:bg-[#D90A14] hover:text-white '>Profile</button>
                <button className='w-full py-2 px-4 mb-2  rounded-lg shadow-sm hover:bg-[#D90A14] hover:text-white'>Settings</button>
                <button className='w-full py-2 px-4 mb-2  rounded-lg shadow-sm hover:bg-[#D90A14] hover:text-white '>Notifications</button>
                <button className='w-full py-2 px-4 mb-2  rounded-lg shadow-sm hover:bg-[#D90A14] hover:text-white'>Cart</button>
                <button className='w-full py-2 px-4 mb-2  rounded-lg shadow-sm hover:bg-[#D90A14] hover:text-white'>Logout</button>
            </div>
          <ProfileComp />
          {/* <EditPage /> */}
        </div>
    </HomeLayout>
  );
}

export default UserProfile;